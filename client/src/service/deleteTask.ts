import axios from "axios"


export const deleteTask = async (idTask: string) => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/tasks/${idTask}`)
        return response.data.data
    } catch (error) {
        console.error("Error al crear la tarea:", error)
        throw error
    }
}
