package main

import (
	"errors"
	"log"
	"math/rand"
	"time"
)

// Paste represents a paste entry
type Paste struct {
	ID        string     `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"-"`
	Content   string     `json:"content"`
	Private   bool       `json:"private"`
	Abuse     bool       `json:"abuse"`
	Language  string     `json:"language"`
	ClientIP  string     `json:"-"`
	UserToken string     `json:"-"`
	ViewCount int        `json:"view_count"`
}

// type Pastes []Paste

func init() {
	rand.Seed(time.Now().UnixNano())
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

// RandStringRunes returns a random key
func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

var ErrPasteNotFound = errors.New("Paste not found")

func getPaste(id string) (*Paste, error) {
	paste := &Paste{}

	if DB.Where("id = ?", id).First(paste).RecordNotFound() {
		log.Print("paste record not found")
		return nil, ErrPasteNotFound
	}

	return paste, nil
}

func getPasteCountByUserToken(userToken string, abuse bool) int {
	var count int
	DB.Model(&Paste{}).Where("user_token = ? AND abuse = ?", userToken, abuse).Count(&count)

	return count
}

func getPasteCount() int {
	var count int
	//// SELECT count(*) FROM deleted_users;
	DB.Model(&Paste{}).Count(&count)

	return count
}

func getPastesByUserToken(userToken string, abuse bool, offset int) []Paste {
	var pastes []Paste

	DB.Limit(ItemsPerPage).Offset(offset).Where("user_token = ? AND abuse = ?", userToken, abuse).Order("created_at desc").Find(&pastes)

	return pastes
}

func getPastes(abuse bool, offset int) []Paste {
	var pastes []Paste

	if(abuse) {
		DB.Limit(ItemsPerPage).Offset(offset).Order("created_at desc" ).Find(&pastes)
	} else {
		DB.Limit(ItemsPerPage).Offset(offset).Where("abuse = ?", abuse).Order("created_at desc" ).Find(&pastes)
	}

	return pastes
}

func deletePaste(paste Paste) {
	DB.Delete(&paste)
}

func updateViewCount(paste Paste) {
	paste.ViewCount = paste.ViewCount + 1
	DB.Save(&paste)
}

func savePaste(paste Paste) Paste {
	token := RandStringRunes(10)

	paste.ID = token
	DB.Create(&paste)

	return paste
}

func updatePaste(paste *Paste) {
	DB.Model(paste).Update("abuse", paste.Abuse)

	if paste.Abuse == true {
		var abuseEntry Abuse
		abuseEntry.ClientIP = paste.ClientIP
		saveAbuse(abuseEntry)
	}

}
