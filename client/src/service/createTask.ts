import axios from "axios"

interface PropsCreate {
    title: string
    dueDate: Date | undefined
}

export const createTask = async ({ title, dueDate }: PropsCreate) => {
    try {
        const response = await axios.post("http://localhost:3000/api/task", {
            title,
            dueDate,
        })
        return response.data
    } catch (error) {
        console.error("Error al crear la tarea:", error)
        throw error
    }
}
