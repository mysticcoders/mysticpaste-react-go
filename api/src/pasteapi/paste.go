package main

import (
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

func getPaste(id string) Paste {
	var paste Paste

	if DB.Where("id = ?", id).First(&paste).RecordNotFound() {
		log.Print("record not found")
		return Paste{}
	}
	return paste
}

func getPastesByUserToken(userToken string, abuse bool) []Paste {
	var pastes []Paste
	DB.Where("user_token = ? AND abuse = ?", userToken, abuse).Find(&pastes)

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

func updatePaste(paste Paste) Paste {
	DB.Model(&paste).Update("abuse", paste.Abuse)

	return paste
}