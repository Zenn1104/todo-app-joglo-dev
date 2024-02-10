package routes

import (
	"github.com/gofiber/fiber/v2"
)

func Routes(route *fiber.App) {
	v1Route(route)
}
