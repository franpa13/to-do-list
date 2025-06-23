import api from "@/lib/axios"



export const deleteTask = async (idTask: string) => {
    try {
        const response = await api.delete(`/tasks/${idTask}`)
        return response.data.data
    } catch (error) {
        console.error("Error al crear la tarea:", error)
        throw error
    }
}
