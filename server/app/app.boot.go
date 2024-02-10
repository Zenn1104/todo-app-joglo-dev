package app

import (
	"log"
	"os"

	"server/configs"
	"server/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func BootApp() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error Loading .env file ::", err)
	}

	if portEnv := os.Getenv("PORT"); portEnv != "" {
		configs.PORT = portEnv
	}

	configs.BootDB()
	configs.ConnectDB()
	configs.InitMigration()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		Next:             nil,
		AllowOrigins:     configs.AllowOrigins,
		AllowMethods:     configs.AllowMethods,
		AllowHeaders:     configs.AllowHeaders,
		AllowCredentials: configs.AllowCredentials,
		ExposeHeaders:    configs.ExposeHeaders,
		MaxAge:           configs.MaxAge,
	}))

	routes.Routes(app)

	app.Listen(configs.PORT)

}
