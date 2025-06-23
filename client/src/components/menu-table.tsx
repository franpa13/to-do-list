
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu" 
import {  type Table } from "@tanstack/react-table"

import type { Task } from "@/types/task-types"

type MenuTableProps = {
    table: Table<Task>
}

export const MenuTable = ({ table }: MenuTableProps) => {
    return (
        <div className="flex items-center py-4">
            <Input
                placeholder="Filtrar por título..."
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Columnas <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Visibilidad</DropdownMenuLabel>
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {


                            return (
                                (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {typeof column.columnDef.header === "string"
                                            ? column.columnDef.header
                                            : column.id}
                                    </DropdownMenuCheckboxItem>

                                )
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
