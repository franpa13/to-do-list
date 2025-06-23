import api from "@/lib/axios"
import type { Task } from "@/types/task-types"


export const updateTask = async (id: string, newTask: Task) => {
    const taskUpdated = {
        title: newTask.title,
        description: newTask.description,
        completed: newTask.completed,
        dueDate: newTask.dueDate instanceof Date ? newTask.dueDate.toISOString() : newTask.dueDate,
    }

    try {
        const response = await api.put(`/tasks/${id}`, taskUpdated)
        return response
    } catch (error) {
        console.error("Error al actualizar la tarea:", error)
        throw error
    }
}