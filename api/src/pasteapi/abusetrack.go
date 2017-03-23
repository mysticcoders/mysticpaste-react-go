package main

import (
	"time"
	"github.com/nu7hatch/gouuid"
)

type Abuse struct {
	ID          string      `gorm:"primary_key" json:"id"`
	CreatedAt   time.Time   `json:"created_at"`
	UpdatedAt   time.Time   `json:"updated_at"`
	ClientIP    string      `json:"client_ip"`
	PostCount   int         `json:"post_count"`
}

func isIPAbusive(clientIP string) bool {
	var abuse Abuse
	return !DB.Where("client_ip = ?", clientIP ).Find(&abuse).RecordNotFound()
}

func saveAbuse(abuse Abuse) Abuse {

	var foundAbuse Abuse
	DB.Where("client_ip = ?", abuse.ClientIP).Find(&foundAbuse)

	if (Abuse{}) == foundAbuse {
		u, err := uuid.NewV4()
		if err != nil {
			panic(err)
		}
		abuse.ID = u.String()
		DB.Create(&abuse)
		return abuse
	}
	foundAbuse.PostCount = foundAbuse.PostCount + 1
	DB.Save(&foundAbuse)
	return foundAbuse
}

