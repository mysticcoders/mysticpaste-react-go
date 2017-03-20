package main

import (
	"testing"
	"github.com/stretchr/testify/assert"
	"net/http/httptest"
	"net/http"
	"log"
	"encoding/json"
	"github.com/nu7hatch/gouuid"
	"bytes"
	"fmt"
	"io"
)

type Header struct {
	Key     string
	Value   string
}

type Headers []Header


func BaseHTTPTest(verb string, url string, jsonStr []byte, headers Headers) (*json.Decoder, *httptest.ResponseRecorder) {
	var err error

	var buffer io.Reader

	if jsonStr != nil {
		buffer = bytes.NewBuffer(jsonStr)
	} else {
		buffer = nil
	}

	r, err := http.NewRequest(verb, url, buffer)

	if err != nil {
		log.Fatal("Uh oh, something went wrong")
	}

	r.Header.Set("Content-Type", "application/json")
	r.RemoteAddr = "127.0.0.1"

	if headers != nil {
		for _, header := range headers {
			r.Header.Set(header.Key, header.Value)
		}
	}

	router := NewRouter()
	w := httptest.NewRecorder()
	router.ServeHTTP(w, r)

	decoder := json.NewDecoder(w.Body)


	// TODO rather than return a decoder, perhaps we can return a struct that can cover a JSON object case
	return decoder, w
}

func TestPasteCreateHandler(t *testing.T) {
	var jsonStr = []byte(`{"content":"Hello, World!", "language": "Java"}`)

	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	var paste Paste
	_ = decoder.Decode(&paste)
	assert.Equal(t, http.StatusCreated, resp.Code)
	//assert.Equal(t, "127.0.0.1", paste.ClientIP)
	assert.Equal(t, "application/json", resp.Header().Get("Content-Type"))
	assert.Equal(t, "Hello, World!", paste.Content)
}

func TestPasteCreateWithTokenHandler(t *testing.T) {
	var jsonStr = []byte(`{"content":"Hello, World!", "language": "Java"}`)
	u, err := uuid.NewV4()
	if err != nil {
		panic(err)
	}
	pastebinUserToken := u.String()

	var headers = Headers{
		Header{
			ApiTokenHeaderKey, pastebinUserToken,
		},
	}
	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, headers)

	var paste Paste
	_ = decoder.Decode(&paste)

	assert.Equal(t, http.StatusCreated, resp.Code)
	assert.Equal(t, "application/json", resp.Header().Get("Content-Type"))
	assert.Equal(t, "Hello, World!", paste.Content)
	assert.Equal(t, pastebinUserToken, resp.Header().Get(ApiTokenHeaderKey))
}

func TestPasteCreateWithBadTokenHandler(t *testing.T) {
	var jsonStr = []byte(`{"content":"Hello, World!", "language": "Java"}`)

	var headers = Headers{
		Header{
			ApiTokenHeaderKey, "ImABadTokenNotUuid",
		},
	}
	_, resp := BaseHTTPTest("POST", "/pastes", jsonStr, headers)

	assert.Equal(t, http.StatusBadRequest, resp.Code)
}

func TestPasteCreateWithNoData(t *testing.T) {
	var jsonStr = []byte("{}")
	_, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	assert.Equal(t, http.StatusBadRequest, resp.Code)
}

func TestPasteShowHandler(t *testing.T) {
	var jsonStr = []byte(`{"content":"Hello, World!", "language": "Java"}`)

	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	assert.Equal(t, http.StatusCreated, resp.Code)

	var paste Paste
	_ = decoder.Decode(&paste)

	decoder, resp = BaseHTTPTest("GET", fmt.Sprintf("/pastes/%s", paste.ID), nil, nil)

	var ret_paste Paste
	_ = decoder.Decode(&ret_paste)

	assert.Equal(t, http.StatusOK, resp.Code)
	assert.Equal(t, paste.ID, ret_paste.ID)
	assert.Equal(t, paste.Content, ret_paste.Content)
}

func TestPasteShowItemNotFound(t *testing.T) {
	_, resp := BaseHTTPTest("GET", fmt.Sprintf("/pastes/%s", "4abtW4saSf"), nil, nil)

	assert.Equal(t, http.StatusNotFound, resp.Code)
}

func TestPasteDeleteHandler(t *testing.T) {
	var jsonStr = []byte(`{"content":"Hello, World!", "language": "Java"}`)

	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	apiTokenKey := resp.Header().Get(ApiTokenHeaderKey)
	assert.Equal(t, http.StatusCreated, resp.Code)

	var paste Paste
	_ = decoder.Decode(&paste)

	var headers = Headers{
		Header{
			ApiTokenHeaderKey, apiTokenKey,
		},
	}
	_, resp = BaseHTTPTest("DELETE", fmt.Sprintf("/pastes/%s", paste.ID), nil, headers)

	assert.Equal(t, http.StatusAccepted, resp.Code)
}

func TestPasteDeleteWrongToken(t *testing.T) {
	var jsonStr = []byte(`{"content":"Hello, World!", "language": "Java"}`)

	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	//apiTokenKey := resp.Header().Get(ApiTokenHeaderKey)
	assert.Equal(t, http.StatusCreated, resp.Code)

	u, err := uuid.NewV4()
	if err != nil {
		panic(err)
	}
	badToken := u.String()

	var paste Paste
	_ = decoder.Decode(&paste)

	var headers = Headers{
		Header{
			ApiTokenHeaderKey, badToken,
		},
	}
	_, resp = BaseHTTPTest("DELETE", fmt.Sprintf("/pastes/%s", paste.ID), nil, headers)

	assert.Equal(t, http.StatusUnauthorized, resp.Code)
}

func TestPasteDeleteNotFound(t *testing.T) {
	_, resp := BaseHTTPTest("DELETE", fmt.Sprintf("/pastes/%s", "5a32bz159g"), nil, nil)

	assert.Equal(t, http.StatusNotFound, resp.Code)
}

func TestPasteDeleteAdminToken(t *testing.T) {
	var jsonStr = []byte(`{"content":"Hello, World!", "language": "Java"}`)

	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	assert.Equal(t, http.StatusCreated, resp.Code)

	var paste Paste
	_ = decoder.Decode(&paste)

	var headers = Headers{
		Header{
			ApiTokenHeaderKey, AdminKey,
		},
	}
	_, resp = BaseHTTPTest("DELETE", fmt.Sprintf("/pastes/%s", paste.ID), nil, headers)

	assert.Equal(t, http.StatusAccepted, resp.Code)
}

func TestPasteIndexHandler(t *testing.T) {
	var jsonStr = []byte(`{"content":"TestPasteIndexHandler", "language": "Java"}`)

	_, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	apiTokenKey := resp.Header().Get(ApiTokenHeaderKey)
	assert.Equal(t, http.StatusCreated, resp.Code)

	var headers = Headers{
		Header{
			ApiTokenHeaderKey, apiTokenKey,
		},
	}

	decoder, resp := BaseHTTPTest("GET", "/pastes", nil, headers)

	var pasteResult PasteResult
	_ = decoder.Decode(&pasteResult)

	assert.Equal(t, pasteResult.Results[0].Content, "TestPasteIndexHandler")
	assert.Equal(t, http.StatusOK, resp.Code)
}

func TestPasteIndexWithNoPastes(t *testing.T) {
	u, err := uuid.NewV4()
	if err != nil {
		panic(err)
	}
	randomToken := u.String()

	var headers = Headers{
		Header{
			ApiTokenHeaderKey, randomToken,
		},
	}

	decoder, resp := BaseHTTPTest("GET", "/pastes", nil, headers)

	var pasteResult PasteResult
	_ = decoder.Decode(&pasteResult)

	assert.Equal(t, http.StatusOK, resp.Code)
	assert.Equal(t, 0, pasteResult.Count)
	assert.Equal(t, 0, len(pasteResult.Results))
}

func TestPasteIndexWithNoKey(t *testing.T) {
	decoder, resp := BaseHTTPTest("GET", "/pastes", nil, nil)

	var pasteResult PasteResult
	_ = decoder.Decode(&pasteResult)

	assert.Equal(t, http.StatusOK, resp.Code)
	assert.Equal(t, 0, pasteResult.Count)
	assert.Equal(t, 0, len(pasteResult.Results))
}

func TestPasteUpdateNotAdmin(t *testing.T) {
	var jsonStr = []byte(`{"content":"TestPasteUpdateNotAdmin", "language": "Java"}`)

	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	var paste Paste
	_ = decoder.Decode(&paste)

	var abusedJsonStr = []byte(`{"abuse": true}`)

	_, resp = BaseHTTPTest("PATCH", fmt.Sprintf("/pastes/%s", paste.ID), abusedJsonStr, nil)

	assert.Equal(t, http.StatusUnauthorized, resp.Code)
}

func TestPasteUpdateAbuse(t *testing.T) {
	var jsonStr = []byte(`{"content":"TestPasteUpdateAbuse", "language": "Java"}`)

	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	var paste Paste
	_ = decoder.Decode(&paste)

	var abusedJsonStr = []byte(`{"abuse": true}`)

	var headers = Headers{
		Header{
			ApiTokenHeaderKey, AdminKey,
		},
	}

	_, resp = BaseHTTPTest("PATCH", fmt.Sprintf("/pastes/%s", paste.ID), abusedJsonStr, headers)

	assert.Equal(t, http.StatusAccepted, resp.Code)
}

func TestPasteAbuseShow(t *testing.T) {
	var jsonStr = []byte(`{"content":"TestPasteUpdateAbuse", "language": "Java"}`)

	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	var paste Paste
	_ = decoder.Decode(&paste)

	var abusedJsonStr = []byte(`{"abuse": true}`)

	var headers = Headers{
		Header{
			ApiTokenHeaderKey, AdminKey,
		},
	}

	_, resp = BaseHTTPTest("PATCH", fmt.Sprintf("/pastes/%s", paste.ID), abusedJsonStr, headers)

	assert.Equal(t, http.StatusAccepted, resp.Code)

	// Should send back 404 because the paste is abusive
	_, resp = BaseHTTPTest("GET", fmt.Sprintf("/pastes/%s", paste.ID), nil, nil)

	assert.Equal(t, http.StatusNotFound, resp.Code)
}

func TestPasteAbuseShowIfAdmin(t *testing.T) {
	var jsonStr = []byte(`{"content":"TestPasteUpdateAbuse", "language": "Java"}`)

	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	var paste Paste
	_ = decoder.Decode(&paste)

	var abusedJsonStr = []byte(`{"abuse": true}`)

	var headers = Headers{
		Header{
			ApiTokenHeaderKey, AdminKey,
		},
	}

	_, resp = BaseHTTPTest("PATCH", fmt.Sprintf("/pastes/%s", paste.ID), abusedJsonStr, headers)

	//log.Printf("%+v", resp)
	assert.Equal(t, http.StatusAccepted, resp.Code)

	// Should return the paste because we are an admin
	_, resp = BaseHTTPTest("GET", fmt.Sprintf("/pastes/%s", paste.ID), nil, headers)

	assert.Equal(t, http.StatusOK, resp.Code)
}

func TestPasteAbuseIndex(t *testing.T) {
	var jsonStr = []byte(`{"content":"TestPasteUpdateAbuse", "language": "Java"}`)

	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)

	apiTokenKey := resp.Header().Get(ApiTokenHeaderKey)

	var userHeaders = Headers{
		Header{
			ApiTokenHeaderKey, apiTokenKey,
		},
	}

	var paste Paste
	_ = decoder.Decode(&paste)

	var abusedJsonStr = []byte(`{"abuse": true}`)

	var headers = Headers{
		Header{
			ApiTokenHeaderKey, AdminKey,
		},
	}

	_, resp = BaseHTTPTest("PATCH", fmt.Sprintf("/pastes/%s", paste.ID), abusedJsonStr, headers)

	//log.Printf("%+v", resp)
	assert.Equal(t, http.StatusAccepted, resp.Code)

	decoder, resp = BaseHTTPTest("GET", "/pastes", nil, userHeaders)

	var pasteResult PasteResult
	_ = decoder.Decode(&pasteResult)

	assert.Equal(t, http.StatusOK, resp.Code)
	assert.Equal(t, 0, pasteResult.Count)
	assert.Equal(t, 0, len(pasteResult.Results))
}

// ADMIN doesn't show pastes unless they created it
//func TestPasteAbuseIndexAsAdmin(t *testing.T) {
//	var jsonStr = []byte(`{"content":"TestPasteUpdateAbuse", "language": "Java"}`)
//
//	decoder, resp := BaseHTTPTest("POST", "/pastes", jsonStr, nil)
//
//	var paste Paste
//	_ = decoder.Decode(&paste)
//
//	var abusedJsonStr = []byte(`{"abuse": true}`)
//
//	var headers = Headers{
//		Header{
//			ApiTokenHeaderKey, AdminKey,
//		},
//	}
//
//	_, resp = BaseHTTPTest("PATCH", fmt.Sprintf("/pastes/%s", paste.ID), abusedJsonStr, headers)
//
//	//log.Printf("%+v", resp)
//	assert.Equal(t, http.StatusAccepted, resp.Code)
//
//	_, resp = BaseHTTPTest("GET", "/pastes", nil, headers)
//
//	log.Printf("%+v", resp)
//}
