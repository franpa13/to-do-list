import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { Task } from "@/types/task-types"
import { format, startOfDay } from "date-fns"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { CalendarDaysIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { useTaskStore } from "@/store/task-store"
import { toast } from "sonner"

type ModalEditProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    task: Task
}

export const ModalEdit = ({ open, onOpenChange, task }: ModalEditProps) => {
    if (!task) {
        return null
    }
    const [form, setForm] = useState({
        title: task.title ?? "",
        description: task.description ?? "",
        completed: task.completed ?? true,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    })

    useEffect(() => {
        setForm({
            title: task.title ?? "",
            description: task.description ?? "",
            completed: task.completed ?? false,
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        })
    }, [task])


    const handleChange = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await useTaskStore.getState().optimisticUpdate(task.id, {
                title: form.title ?? "",
                description: form.description ?? "",
                completed: form.completed ?? true,
                dueDate: form.dueDate
            });

            onOpenChange(false);
            toast("Tarea editada correctamente!", {
                style: { backgroundColor: "blue", color: "white", border: "none" },
                closeButton: true,
                
            })
        } catch (error) {
            console.error("Error al actualizar tarea:", error);

        }
    };



    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Editar tarea</DialogTitle>
                        <DialogDescription>
                            Realiza los cambios y guarda para actualizar la tarea.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Título</Label>
                            <Input
                                id="title"
                                value={form.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Input
                                id="description"
                                value={form.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <Label>¿Completada?</Label>
                            <Switch
                                checked={form.completed}
                                onCheckedChange={(checked: boolean) => handleChange("completed", checked)}
                            />
                        </div>
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
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit">Guardar cambios</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
