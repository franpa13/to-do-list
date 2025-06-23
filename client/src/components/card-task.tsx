import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { useTaskStore } from "@/store/task-store"
import { type Task } from "@/types/task-types"
import { Calendar, Flag, SquareCheckBig, Ban, Trash } from "lucide-react"
import { useNavigate } from "react-router"

interface PropsCard {
    task?: Task,

}

export const CardTask = ({ task }: PropsCard) => {
    const navigate = useNavigate()

    if (!task) {
        return null
    }

    const getPriorityBadge = (label: string, priority: Task["priority"]) => {
        const base =
            "flex items-center gap-2   px-3 py-1 rounded-full border text-xs font-semibold w-fit"

        if (priority === "HIGH")
            return (
                <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground">{label}</span>

                    <div className={`${base} text-red-500 border-red-700 bg-red-900/10`}>
                        <Flag size={15} strokeWidth={1.25} />
                        <span>ALTA</span>
                    </div>
                </div>

            )
        if (priority === "MEDIUM")
            return (
                <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground">{label}</span>

                    <div className={`${base} text-yellow-500 border-yellow-500 bg-yellow-900/10`}>
                        <Flag size={15} strokeWidth={1.25} />
                        <span>MEDIA</span>
                    </div>

                </div>

            )
        return (
            <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">{label}:</span>
                <div className={`${base} text-green-500 border-green-500 bg-green-900/10`}>
                    <Flag size={15} strokeWidth={1.25} />
                    <span>BAJA</span>
                </div>

            </div>

        )
    }

    const getStatusBadge = (label: string, completed: boolean) => {
        const base =
            "flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold w-fit"
        return completed ? (
            <div className={`${base} border-green-500 bg-green-900/10 text-green-400`}>
                <SquareCheckBig size={15} strokeWidth={2} />
                <span>COMPLETADA</span>
            </div>
        ) : (
            <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">{label}</span>

                <div className={`${base} border-red-500 bg-red-900/10 text-red-500`}>
                    <Ban size={15} strokeWidth={2} />
                    <span>PENDIENTE</span>
                </div>
            </div>

        )
    }

    const getDateBadge = (label: string, date: string | null | undefined) => {
        const base =
            "flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold w-fit text-gray-500 border-gray-700 bg-gray-900/10"
        return (
            <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">{label}</span>
                <div className={base}>
                    <Calendar size={15} strokeWidth={1.25} />
                    <span>
                        {date
                            ? new Date(date).toLocaleDateString("es-AR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })
                            : "-"}
                    </span>
                </div>
            </div>
        )
    }

    const handleDelete = async (taskId: string) => {
        try {
            await useTaskStore.getState().optimisticDelete(taskId);
            navigate("/")

        } catch (error) {

            console.error("Error al eliminar tarea:", error);
        }
    };

    return (
        <Card className="w-full  max-w-md p-2 space-y-2 shadow-md border-gray-700 bg-background">

            <CardHeader>
                {/* <div className="flex w-full  justify-end">
                    <Button variant="ghost" size="sm">
                        ...
                    </Button>
                </div> */}
                <CardTitle className="text-xl font-semibold">{task.title}</CardTitle>
                <CardDescription>{task.description || "Sin descripción"}</CardDescription>
            </CardHeader>
            <CardContent className=" flex justify-between items-start">
                <section className="space-y-2">
                    <div>{getPriorityBadge("Prioridad:", task.priority)}</div>
                    <div>{getStatusBadge("Status:", task.completed)}</div>
                </section>

                <div className="flex flex-col gap-2">
                    {getDateBadge("Fecha límite:", task.dueDate?.toString())}
                    {getDateBadge("Fecha de creación:", task?.createdAt.toString())}
                    {getDateBadge("Ultima actualización:", task?.updatedAt?.toString())}
                </div>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
                <Button onClick={() => handleDelete(task.id)} className="flex text-red-500 cursor-pointer justify-center w-full" variant="ghost">
                    <Trash size={26} strokeWidth={1.25} />

                    <span>
                        Eliminar tarea
                    </span>
                </Button>
            </CardFooter>
        </Card>
    )
}
