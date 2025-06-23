import api from "@/lib/axios"
import type { ApiResponse } from "@/types/task-types"


export const getTasks = async () => {
    try {
        const response = await api.get<ApiResponse>("/tasks")
        return response.data.data
    } catch (error) {
        console.error("Error al crear la tarea:", error)
        throw error
    }
}
