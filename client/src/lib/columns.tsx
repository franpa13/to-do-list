import { type ColumnDef } from "@tanstack/react-table";
import {  type Task } from "@/types/task-types";
import { Ban, Calendar, SquareCheckBig } from "lucide-react";

import { CellPriority } from "@/components/cellPriority";

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
    cell: CellPriority
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
