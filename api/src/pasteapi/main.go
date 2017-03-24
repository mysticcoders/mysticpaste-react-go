package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/spf13/viper"
)

// DB object for use throughout project
var DB *gorm.DB

// AdminKey is used to have carte blanche authority over all pastes
var AdminKey string

var ApiTokenHeaderKey = string("X-Pastebin-User-Token")
//	log "github.com/sirupsen/logrus"

func main() {
	var err error

	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	err = viper.ReadInConfig()
	if err != nil { // Handle errors reading the config file
		panic(fmt.Errorf("fatal error config file: %s", err))
	}

	AdminKey = viper.GetString("api.admin_key")

	router := NewRouter()

	dbinfo := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s",
		viper.GetString("db.hostname"), viper.GetString("db.username"), viper.GetString("db.dbname"), viper.GetString("db.password"))
	DB, err = gorm.Open("postgres", dbinfo)
	// 	db.DB().SetMaxIdleConns(10)
	// 	db.DB().SetMaxOpenConns(100)

	if err != nil {
		log.Fatal(err)
	}
	DB.AutoMigrate(&Paste{})
	DB.AutoMigrate(&Abuse{})
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", ApiTokenHeaderKey})
	exposeOk := handlers.ExposedHeaders([]string{ApiTokenHeaderKey})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	// originsOk := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED")})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})
	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(originsOk, headersOk, exposeOk, methodsOk)(router)))
}
