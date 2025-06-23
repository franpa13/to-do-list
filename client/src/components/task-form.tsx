import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format, startOfDay } from "date-fns"
import type { SVGProps } from "react"
import type { Priority } from "@/types/task-types"
import { createTask } from "@/service/createTask"
import { Loader } from "./loader"
import { useTaskStore } from "@/store/task-store"
import { getTasks } from "@/service/getTasks"

import { toast } from "sonner"


type TaskFormState = {
    task: string
    dueDate: Date | undefined
    priority: Priority
}

export const TaskForm = () => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState<TaskFormState>({
        task: "",
        dueDate: undefined,
        priority: "LOW",
    })
    const { setTasks } = useTaskStore();
    const handleChange = <K extends keyof TaskFormState>(key: K, value: TaskFormState[K]) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        try {
            const res = await createTask({
                title: form.task,
                dueDate: form.dueDate,
            })

            await new Promise(resolve => setTimeout(resolve, 1500))
            if (res) {
                const updateTasks = await getTasks()
                setTasks(updateTasks)

                toast("Tarea agregada correctamente!", {
                    closeButton: true,
                    richColors: true,
                    position: "bottom-right",
                    style: { backgroundColor: "#2b7fff", border: "none", color: "white" },
                    actionButtonStyle : {backgroundColor:"black" , color:"wheat"}
                    
                })

                setForm({ task: "", dueDate: undefined, priority: "LOW" })
            }

        } catch (error) {
            toast("Ha ocurrido un error, intentalo nuevamente !", {
                    closeButton: true,
                    richColors: true,
                    position: "bottom-right",
                    style: { backgroundColor: "red", border: "none", color: "white" },
                    actionButtonStyle : {backgroundColor:"black" , color:"wheat"}
                    
                })
            console.error("Error al crear tarea:", error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <form onSubmit={handleSubmit} className="md:mx-auto mx-4 max-w-md mt-0 space-y-6">
            <div className="space-y-2 text-center">
                <div className="flex justify-center gap-2 items-center">
                <h1 className="text-3xl font-bold">Empieza ahora</h1>
                <img src="./logo.png" className="w-[50px]" alt="" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    Por favor, rellene el formulario para añadir una nueva tarea.
                </p>
            </div>

            <div className="space-y-4">
                {/* TAREA */}
                <div className="space-y-2">
                    <Label htmlFor="task">Tarea</Label>
                    <Input
                        id="task"
                        placeholder="Ingrese su tarea"
                        value={form.task}
                        onChange={(e) => handleChange("task", e.target.value)}
                        required
                    />
                </div>

                {/* FECHA */}
                <div className="space-y-2">
                    <Label htmlFor="due-date">Fecha de vencimiento</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                                {form.dueDate ? format(form.dueDate, "dd/MM/yyyy") : "Seleccionar fecha"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={form.dueDate}
                                onSelect={(date) => handleChange("dueDate", date)}
                                disabled={(date) => date < startOfDay(new Date())}
                            />
                        </PopoverContent>
                    </Popover>
                </div>



                {/* BOTÓN */}
                <Button type="submit" disabled={loading} variant="default" className="w-full cursor-pointer">
                    {loading ? (
                        <Loader />
                    ) : (
                        "Agregar tarea"
                    )}
                </Button>
            </div>
        </form>
    )
}

export default function CalendarDaysIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
        </svg>
    )
}
