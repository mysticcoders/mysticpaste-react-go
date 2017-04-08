package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	uuid "github.com/nu7hatch/gouuid"
	"strconv"
)

// PasteResult represents a return object for pastes
type PasteResult struct {
	Results    []Paste `json:"results"`
	Count      int     `json:"count"`
	TotalCount int     `json:"total_count"`
	Next       int     `json:"next"`
	Previous   int     `json:"previous"`
}

// PasteIndex processes a GET /pastes
// TODO should allow for paging with PasteIndex
func PasteIndex(w http.ResponseWriter, r *http.Request) {
	UserToken := r.Header.Get(ApiTokenHeaderKey)

	var offset int
	offset_param := r.URL.Query().Get("offset")

	if offset_param == "" {
		offset = 0
	} else {
		var err error
		offset, err = strconv.Atoi(offset_param)
		if err != nil {
			offset = 0
		}
	}
	//log.Printf("PasteIndex called with: %s", UserToken)

	var pastes []Paste
	if UserToken == AdminKey {
		var abuse bool
		abuse_param := r.URL.Query().Get("abuse")

		if abuse_param == "true" {
			abuse = true
		} else {
			abuse = false
		}
		pastes = getPastes(abuse, offset)
	} else {
		pastes = getPastesByUserToken(UserToken, false, offset)
	}

	TotalCount := getPasteCount()
	Count := len(pastes)

	Previous := offset - ItemsPerPage
	Next := offset + ItemsPerPage

	if(Previous <= 0) {
		Previous = 0
	}

	if(Next >= TotalCount) {
		Next = TotalCount - ItemsPerPage        // this is probably dumb, think this through more, maybe pass nil
	}

	//log.Printf("%+v", pastes)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(&PasteResult{
		Results:    pastes,
		Count:      Count,
		TotalCount: TotalCount,
		Next:       Next,
		Previous:   Previous,
	})
}

// PasteCreate processes a PUT /pastes
func PasteCreate(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	UserToken := r.Header.Get(ApiTokenHeaderKey)

	//log.Printf("%+v", r.Body)
	var paste Paste
	err := decoder.Decode(&paste)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	if (Paste{}) == paste {
		// Paste is empty
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("No paste content found"))
		return
	} else {
		paste.ClientIP = getIPAddress(r)

		if UserToken != "" {
			u, _ := uuid.ParseHex(UserToken)
			if u == nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte("Bad token"))
				return
			}

			paste.UserToken = UserToken
		} else {
			u, err := uuid.NewV4()
			if err != nil {
				panic(err)
			}
			paste.UserToken = u.String()
		}
		w.Header().Set(ApiTokenHeaderKey, paste.UserToken)

		if isIPAbusive(paste.ClientIP) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusCreated)
			json.NewEncoder(w).Encode(paste)
			return
		}

		var savedPaste Paste
		savedPaste = savePaste(paste)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(savedPaste)
	}
}

// PasteDelete processes a DELETE /pastes/pasteID
func PasteDelete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	pasteID := vars["pasteId"]

	paste, err := getPaste(pasteID)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Not Found"))
		return
	}

	UserToken := r.Header.Get(ApiTokenHeaderKey)

	if paste.UserToken == UserToken || UserToken == AdminKey {
		deletePaste(*paste)
		w.WriteHeader(http.StatusAccepted)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Unauthorized"))
	}

}

// PasteShow processes a GET /pastes/pasteID
func PasteShow(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	pasteID := vars["pasteId"]
	UserToken := r.Header.Get(ApiTokenHeaderKey)

	// log.Print(pasteID)
	paste, err := getPaste(pasteID)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Not Found"))
		return
	}

	if paste.Abuse && UserToken != AdminKey {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Paste Not Found"))
	} else {
		updateViewCount(*paste)
		w.Header().Set( "Content-Type", "application/json")
		json.NewEncoder(w).Encode(paste)
	}
}

func PasteUpdate(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	pasteID := vars["pasteId"]

	//log.Printf("pasteID: %+s", pasteID)
	UserToken := r.Header.Get(ApiTokenHeaderKey)

	if UserToken != AdminKey {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Unauthorized"))
		return
	}

	paste, err := getPaste(pasteID)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Not Found"))
		return
	}

	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	//log.Print(r.Body)

	abuseUpdate := &Paste{}
	err = decoder.Decode(abuseUpdate)
	if err != nil {
		log.Print("Error: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Something went wrong"))
		return
	}

	paste.Abuse = abuseUpdate.Abuse

	//log.Print(paste)

	updatePaste(paste)

	// decode the JSON body, and compare the json struct with original paste?
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(paste)
}

func PasteAdmin(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	var admin_key string
	if len(r.Form["admin_key"]) == 1 {
		admin_key = r.Form["admin_key"][0]
	}

	var admin bool
	admin = false
	if admin_key == AdminKey {
		admin = true
	}

	resp := map[string]interface{}{
		"admin": admin,
	}

	w.Header().Set( "Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}