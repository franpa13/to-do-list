import * as React from "react"
import {
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Eye, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useTaskStore } from "@/store/task-store"
import { taskColumns } from "@/lib/columns"
import { MenuTable } from "./menu-table"
import { useNavigate } from "react-router"
import { ModalEdit } from './modal-edit';
import type { Task } from "@/types/task-types"
import { toast } from "sonner"



export const TableTask = () => {
    const tasks = useTaskStore(state => state.tasks)
    const [taskEdit, setTaskEdit] = React.useState<Task>(tasks[0])

    const navigate = useNavigate()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [openModal, setOpenModal] = React.useState(false)
    const table = useReactTable({
        data: tasks,
        columns: taskColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        autoResetPageIndex: false,
    })
    const redirecting = (type: string, id: string, task: Task) => {
       
        if (type == "navigate") {
            navigate(`/task/${id}`)
        } else {
            setTaskEdit(task)
            setOpenModal(true)
        }
    }


    const handleDelete = async (taskId: string) => {
        try {
            await useTaskStore.getState().optimisticDelete(taskId);

            toast("Tarea eliminada correctamente", {
                style: { backgroundColor: "red" , color: "white", border: "none" },
                closeButton: true,
                
            })
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
        }
    };


    return (
        <div className="w-full">
            <MenuTable table={table} />

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead className={`${header.column.columnDef.header == "Creada" ? "text-right" : "text-left"} text-gray-500`} key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.original.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => {

                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}

                                    <TableCell className="cursor-pointer flex justify-end" >
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>

                                                <span className="text-2xl text-gray-500">
                                                    ...
                                                </span>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <div className="flex flex-col justify-start items-start">
                                                    <Button onClick={() => redirecting("navigate", `${row.original.id}`, row.original)} className="flex cursor-pointer justify-center w-full" variant="ghost">
                                                        <Eye size={28} strokeWidth={1.25} />
                                                        <span>Ver detalles</span>
                                                    </Button>


                                                    <Button onClick={() => redirecting("openModal", "", row.original)} className="flex cursor-pointer justify-center w-full" variant="ghost">

                                                        <Pencil size={28} strokeWidth={1.25} />
                                                        <span>
                                                            Editar tarea
                                                        </span>
                                                    </Button>

                                                    <Button onClick={() => handleDelete(row.original.id)} className="flex text-red-500 cursor-pointer justify-center w-full" variant="ghost">
                                                        <Trash size={26} strokeWidth={1.25} />

                                                        <span>
                                                            Eliminar tarea
                                                        </span>
                                                    </Button>
                                                </div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={taskColumns.length} className="h-24 text-center">
                                    No hay tareas.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">

                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
            <ModalEdit onOpenChange={setOpenModal} open={openModal} task={taskEdit} />
        </div>
    )
}