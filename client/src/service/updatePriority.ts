import api from "@/lib/axios"
import type { Priority } from "@/types/task-types"


export const updatePriorityTask = async (id: string, priority: Priority) => {

    
    try {
        const response = await api.patch(`/tasks/${id}/priority`, {priority : priority})
        return response
    } catch (error) {
        console.error("Error al actualizar la tarea:", error)
        throw error
    }
}