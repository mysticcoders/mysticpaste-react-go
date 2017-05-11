package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/spf13/viper"
	multibayes "github.com/lytics/multibayes"
	"regexp"
)

// DB object for use throughout project
var DB *gorm.DB

// AdminKey is used to have carte blanche authority over all pastes
var AdminKey string

var ItemsPerPage int

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
	ItemsPerPage = viper.GetInt("db.items_per_page")

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
	//DB.LogMode(true)

	log.Println("Grabbing all pastes...")
	var abusePastes []Paste
	var goodPastes []Paste
	DB.Where("abuse = ?", true).Find(&abusePastes)
	DB.Where("abuse = ?", false).Find(&goodPastes)

	classifier := multibayes.NewClassifier()
	classifier.MinClassSize = 0

	reg, err := regexp.Compile("[^a-zA-Z0-9]+")
	for _, goodPaste := range goodPastes {
		processedString := reg.ReplaceAllString(goodPaste.Content, " ")
		//log.Print(processedString)
		classifier.Add(processedString, []string{"Good"})
	}

	for _, badPaste := range abusePastes {
		processedString := reg.ReplaceAllString(badPaste.Content, " ")
		//log.Print(processedString)
		classifier.Add(processedString, []string{"Bad"})
	}

	good_text := "Fetch feed for each group since a given time but only get 1 feed item"
	good_probs := classifier.Posterior(good_text)
	fmt.Printf("Posterior Probabilities for Good: %+v\n", good_probs)


	//bad_text := "A proxy-server is just a host that works to a different being an intermediary in one community. Whenever a client from another host is requesting a document, the proxy functions like a filter for that document subsequently examines the document based on the protection filter before providing the required document towards the customer of the primary server. About the hand you may still find unblocked games in college and these generally include other press activities, along with motion, journey, game, problem, firing, activities, technique, that are academic and all enjoyable. They may be performed on unblockgamesatschool.com. Additionally they concentrate on the gamers' abilities. Be advised although that proxy-server differs to a different in one college."
	//bad_text := "Buy Hacked PayPal Bank wire logins Wu transfer cc topup cvv smtp rdp inbox mailer email leads dumps warez with proofs of transactions and accounts Hello There Im a Russian American certified carder and hacker with years of experience i am selling hacked Wu transfer Hacked PayPal accounts Bank wire logins Money Booker skrill account cc topup all transactions are secured and with zero theft and no charge back"
	bad_text := "Beaute Lift Anti Aging Serum I m for natural skin care But don t take my word because Try some out yourself read customer reviews and produce a decision after the idea The best companies will have a no risk guarantee if when you are around 100 satisfied you can send full or used bottles back and get the actual full refund Trial http yoursantiagingserum com beaute lift anti aging serum"

	probs := classifier.Posterior(bad_text)
	fmt.Printf("Posterior Probabilities for Bad: %+v\n", probs)


	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", ApiTokenHeaderKey})
	exposeOk := handlers.ExposedHeaders([]string{ApiTokenHeaderKey})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	// originsOk := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED")})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "PATCH", "OPTIONS"})
	log.Println("Ready.")
	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(originsOk, headersOk, exposeOk, methodsOk)(router)))

}
