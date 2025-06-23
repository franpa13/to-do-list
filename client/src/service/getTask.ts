import api from "@/lib/axios"
import type {  ApiResponseUniqueTask } from "@/types/task-types"



export const getTask = async (idTask: string) => {
    try {
        const response = await api.get<ApiResponseUniqueTask>(`/tasks/${idTask}`)
        
        return response.data.data
    } catch (error) {
        console.error("Error al crear la tarea:", error)
        throw error
    }
}
