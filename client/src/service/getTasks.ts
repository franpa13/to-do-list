import type { ApiResponse } from "@/types/task-types"
import axios from "axios"


export const getTasks = async () => {
    try {
        const response = await axios.get<ApiResponse>("http://localhost:3000/api/tasks")
        return response.data.data
    } catch (error) {
        console.error("Error al crear la tarea:", error)
        throw error
    }
}
