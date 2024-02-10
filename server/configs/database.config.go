package configs

import (
	"fmt"
	"log"
	"os"
	"server/database"
	"server/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db_name = ""

var db_port = "3306"

var db_password = ""

var db_user = "root"

var db_host = "127.0.0.1"

func BootDB() {
	if dbNameEnv := os.Getenv("DB_NAME"); dbNameEnv != "" {
		db_name = dbNameEnv
	}
	if dbPort := os.Getenv("DB_PORT"); dbPort != "" {
		db_port = dbPort
	}
	if dbPassword := os.Getenv("DB_PASSWORD"); dbPassword != "" {
		db_password = dbPassword
	}
	if dbUserEnv := os.Getenv("DB_USER"); dbUserEnv != "" {
		db_user = dbUserEnv
	}
	if dbHostEnv := os.Getenv("DB_HOST"); dbHostEnv != "" {
		db_host = dbHostEnv
	}
}

func ConnectDB() {
	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", db_user, db_password, db_host, db_port, db_name)
	database.DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Println("something error in configuration ::", err, dsn)
	} else {
		log.Println("CONNECT TO DATABASE")
	}

}

func InitMigration() {
	err := database.DB.AutoMigrate(
		models.Todo{},
	)
	if err != nil {
		log.Println(err)
	} else {
		log.Println("shcemas succes migrated")
	}
}
