import api from "@/lib/axios"


interface PropsCreate {
    title: string
    dueDate: Date | undefined
}

export const createTask = async ({ title, dueDate }: PropsCreate) => {
    try {
        const response = await api.post("/task", {
            title,
            dueDate,
        })
        return response.data
    } catch (error) {
        console.error("Error al crear la tarea:", error)
        throw error
    }
}
