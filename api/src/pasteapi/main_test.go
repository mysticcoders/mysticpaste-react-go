package main

import (
	"testing"
	"log"
	"os"
	"github.com/spf13/viper"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"fmt"
)

func setup() error {
	var err error

	viper.SetConfigName("config-test")
	viper.AddConfigPath(".")
	err = viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("fatal error config file: %s", err))
	}

	dbinfo := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s",
		viper.GetString("db.hostname"), viper.GetString("db.username"), viper.GetString("db.dbname"), viper.GetString("db.password"))
	DB, err = gorm.Open("postgres", dbinfo)

	AdminKey = viper.GetString("api.admin_key")

	//testDB.Exec("CREATE DATABASE mysticpaste-test;")
	if err != nil {
		log.Fatal(err)
	}

	DB.AutoMigrate(&Paste{})

	return err
}

func teardown() error {
	var err error

	DB.DropTable(&Paste{})

	return err
}

func TestMain(m *testing.M) {
	if err := setup(); err != nil {
		log.Fatalf("Test Setup failed: %v", err)
	}

	c := m.Run()

	if err := teardown(); err != nil {
		log.Fatalf("Test Teardown Failed: %v", err)
	}

	os.Exit(c)
}