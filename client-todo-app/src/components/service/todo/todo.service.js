import { axiosInstance } from "../axios.service"

export const updateTodo = async (data, id) => {
    const res = axiosInstance.patch(`/todos/${id}`, data)
    return res?.data
}

export const addTodo = async (data) => {
    const res = axiosInstance.post(`/todos`, data)
    return res?.data
}

export const deleteTodo = async (id) => {
    const res = axiosInstance.delete(`/todos/${id}`)
    return res?.data
}