package routes

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func v1Route(route *fiber.App) {
	v1 := route.Group("/api/v1/")

	todo := v1.Group("/todos/")
	todo.Get("/", controllers.GetAllTodo)
	todo.Post("/", controllers.CreateTodo)
	todo.Get("/:id", controllers.GetTodoById)
	todo.Patch("/:id", controllers.UpdateTodoById)
	todo.Delete("/:id", controllers.DeleteTodoById)
}
