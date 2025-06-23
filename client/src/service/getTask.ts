import type {  ApiResponseUniqueTask } from "@/types/task-types"
import axios from "axios"


export const getTask = async (idTask: string) => {
    try {
        const response = await axios.get<ApiResponseUniqueTask>(`http://localhost:3000/api/tasks/${idTask}`)
        console.log(response , "repsonse tashhhh");
        
        return response.data.data
    } catch (error) {
        console.error("Error al crear la tarea:", error)
        throw error
    }
}
