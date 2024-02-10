package controllers

import (
	"fmt"
	"server/database"
	"server/models"
	"server/models/request"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func CreateTodo(ctx *fiber.Ctx) error {
	todoReq := request.TodoCreateRequest{}

	err := ctx.BodyParser(&todoReq)
	if err != nil {
		ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"code":        fiber.StatusBadRequest,
			"status_code": "BAD REQUEST",
		})
	}

	validate := validator.New()
	if err = validate.Struct(&todoReq); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"code":        fiber.StatusBadRequest,
			"status_code": "BAD REQUEST",
		})
	}

	todo := models.Todo{
		Name:       todoReq.Name,
		IsComplete: todoReq.IsComplete,
	}
	if todoReq.Note != "" {
		todo.Note = &todoReq.Note
	}

	err = database.DB.Create(&todo).Error
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":        fiber.StatusInternalServerError,
			"status_code": "INTERNAL SERVER ERROR",
		})
	}

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"code":        fiber.StatusCreated,
		"status_code": "OK",
		"payload":     todo,
	})
}

func GetTodoById(ctx *fiber.Ctx) error {
	todoId := ctx.Params("id")
	todo := models.Todo{}

	err := database.DB.First(&todo, "id = ?", todoId).Error
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"code":        fiber.StatusNotFound,
			"status_code": "NOT FOUND",
		})
	}

	fmt.Println(todo)

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"code":        fiber.StatusOK,
		"status_code": "OK",
		"payload":     todo,
	})
}

func GetAllTodo(ctx *fiber.Ctx) error {
	todos := []models.Todo{}

	err := database.DB.Find(&todos)
	if err != nil {
		ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":        fiber.StatusInternalServerError,
			"status_code": "INTERNAL SERVER ERROR",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"code":        fiber.StatusOK,
		"status_code": "OK",
		"payload":     todos,
	})
}

func UpdateTodoById(ctx *fiber.Ctx) error {
	todoReq := request.TodoUpdateRequest{}

	err := ctx.BodyParser(&todoReq)
	if err != nil {
		ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"code":        fiber.StatusBadRequest,
			"status_code": "BAD REQUEST",
		})
	}

	validate := validator.New()
	if err = validate.Struct(&todoReq); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"code":        fiber.StatusBadRequest,
			"status_code": "BAD REQUEST",
		})
	}

	todoId := ctx.Params("id")
	todo := models.Todo{}

	if err = database.DB.First(&todo, "id = ?", todoId).Error; err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"code":        fiber.StatusNotFound,
			"status_code": "NOT FOUND",
		})
	}

	todo.Name = todoReq.Name
	todo.Note = &todoReq.Note
	todo.IsComplete = todoReq.IsComplete

	err = database.DB.Save(&todo).Error
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":        fiber.StatusInternalServerError,
			"status_code": "INTERNAL SERVER ERROR",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"code":        fiber.StatusOK,
		"status_code": "OK",
		"payload":     todo,
	})
}

func DeleteTodoById(ctx *fiber.Ctx) error {
	todoId := ctx.Params("id")
	todo := models.Todo{}

	err := database.DB.First(&todo, "id = ?", todoId).Error
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"code":        fiber.StatusNotFound,
			"status_code": "NOT FOUND",
		})
	}

	err = database.DB.Delete(&todo).Error
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":        fiber.StatusInternalServerError,
			"status_code": "INTERNAL SERVER ERROR",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"code":        fiber.StatusOK,
		"status_code": "OK",
	})
}
