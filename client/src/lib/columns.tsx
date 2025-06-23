import { type ColumnDef } from "@tanstack/react-table";
import { type Priority, type Task } from "@/types/task-types";
import { Ban, Calendar, Flag, SquareCheckBig } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useTaskStore } from "@/store/task-store";
import { toast } from "sonner";

export const taskColumns: ColumnDef<Task>[] = [
  {
    enableHiding: false,
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("title")}</span>
    ),
  },
  {
    enableHiding: false,
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => row.getValue("description") || "-",
  },
  {
    accessorKey: "priority",
    header: "Prioridad",
    cell: ({ row }) => {
      const { optimisticUpdatePriority } = useTaskStore();
      const taskId = row.original.id;

      const value: Priority = row.getValue("priority");

      const colorMap = {
        HIGH: "text-red-500 border-red-700 dark:bg-red-900/10",
        MEDIUM: "text-yellow-500 border-yellow-500 darK:bg-yellow-900/10",
        LOW: "text-green-500 border-green-500 darK:bg-green-900/10",
      };

      const labelMap = {
        HIGH: "ALTA",
        MEDIUM: "MEDIA",
        LOW: "BAJA",
      };

      const handleChange = async (newPriority: Priority) => {
        try {
          await optimisticUpdatePriority(taskId, newPriority);
        } catch (e) {
          toast("Ha ocurrido un error, intentelo nuevamente!")
          console.error("Error actualizando prioridad:", e);
        }
      };

      return (
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger
            className={`flex items-center gap-2 px-3 py-1 rounded-full border ${colorMap[value]} text-xs font-semibold w-fit`}

          >
            <Flag size={14} className={`${colorMap[value]}`} strokeWidth={1.25} />
            <span>{labelMap[value]}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HIGH">
              <div className="flex items-center gap-2">
                <Flag size={14} className="text-red-500" />
                <span className="text-red-500 font-semibold text-sm">Alta</span>
              </div>
            </SelectItem>
            <SelectItem value="MEDIUM">
              <div className="flex items-center gap-2">
                <Flag size={14} className="text-yellow-500" />
                <span className="text-yellow-500 font-semibold text-sm">Media</span>
              </div>
            </SelectItem>
            <SelectItem value="LOW">
              <div className="flex items-center gap-2">
                <Flag size={14} className="text-green-500" />
                <span className="text-green-500 font-semibold text-sm">Baja</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },


  {
    accessorKey: "completed",
    header: "Status",
    cell: ({ row }) => {
      const completed: boolean = row.getValue("completed");

      const baseClasses = "flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold w-fit";

      if (completed) {
        return (
          <div className={`${baseClasses} border-green-500 dark:bg-green-900/10 text-green-400`}>
            <SquareCheckBig size={15} strokeWidth={2} />
            <span>COMPLETADO</span>
          </div>
        );
      } else {
        return (
          <div className={`${baseClasses} border-red-500 dark:bg-red-900/10 text-red-500`}>
            <Ban size={15} strokeWidth={2} />
            <span>PENDIENTE</span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "dueDate",
    header: "Vence",
    cell: ({ row }) => {
      const baseClasses =
        "flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold w-fit";
      const date = formatDate(row.getValue("dueDate"))
      return (
        <div className={`${baseClasses} border-gray-700 dark:bg-gray-900/10 text-gray-500`}>
          <Calendar size={16} strokeWidth={1.25} />
          <span>{date}</span>
        </div>
      )

    }
  },
  {
    accessorKey: "createdAt",
    header: "Creada",
    cell: ({ row }) => {
      const baseClasses =
        "flex justify-end items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold w-fit";
      const date = formatDate(row.getValue("createdAt"))
      return (
        <section className="flex justify-end ">
          <div className={`${baseClasses} border-gray-700 dark:bg-gray-900/10 text-gray-500 `}>
            <span>{date}</span>
          </div>
        </section>

      )
    },
  },

];

const formatDate = (date?: string | Date) =>
  date ? new Date(date).toLocaleDateString("es-AR") : "-";
