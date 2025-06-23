import type { Priority } from "@/types/task-types"
import axios from "axios"

export const updatePriorityTask = async (id: string, priority: Priority) => {
    console.log(priority , "priority");
    
    try {
        const response = await axios.patch(`http://localhost:3000/api/tasks/${id}/priority`, {priority : priority})
        return response
    } catch (error) {
        console.error("Error al actualizar la tarea:", error)
        throw error
    }
}