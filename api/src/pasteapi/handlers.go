package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	uuid "github.com/nu7hatch/gouuid"
)

// PasteResult represents a return object for pastes
type PasteResult struct {
	Results    []Paste `json:"results"`
	Count      int     `json:"count"`
	TotalCount int     `json:"total_count"`
}

// PasteIndex processes a GET /pastes
// TODO should allow for paging with PasteIndex
func PasteIndex(w http.ResponseWriter, r *http.Request) {
	UserToken := r.Header.Get(ApiTokenHeaderKey)

	//log.Printf("PasteIndex called with: %s", UserToken)
	pastes := getPastesByUserToken(UserToken, false)

	//log.Printf("%+v", pastes)
	json.NewEncoder(w).Encode(&PasteResult{
		Results:    pastes,
		Count:      len(pastes),
		TotalCount: getPasteCount(),
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
		w.Header().Set("Content-Type", "application/json")
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
