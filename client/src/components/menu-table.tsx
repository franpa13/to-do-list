// components/MenuTable.tsx
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { type Table } from "@tanstack/react-table";
import { useTaskFilter } from "@/hooks/useTaskFilter";
import type { FilterOption, Task } from "@/types/task-types";

type MenuTableProps = {
    table: Table<Task>;
};

export const MenuTable = ({ table }: MenuTableProps) => {
    const { filterValue, setFilter, getFilterLabel } = useTaskFilter(table);

    return (
        <div className="flex justify-between gap-3 items-center py-4">
            <Input
                placeholder="Filtrar por título..."
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                }
       
                className="w-1/2 lg:w-1/4 text-xs lg:text-base"
            />
            <div className="flex flex-row gap-2">
                {/* Dropdown para filtrar por state */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="text-xs" size="sm" variant="outline">
                           {getFilterLabel()}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filtrar por estado</DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                            value={filterValue}
                            onValueChange={(value) => setFilter(value as FilterOption)}
                        >
                            <DropdownMenuRadioItem className="text-blue-500 font-semibold cursor-pointer" value="all">Todos</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className="text-green-500 font-semibold cursor-pointer" value="completed">Completadas</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className="text-red-500 font-semibold cursor-pointer" value="pending">Pendientes</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* visibilidad de columns */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button  size="sm" variant="outline" className="ml-auto text-xs" >
                            Columnas <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Visibilidad</DropdownMenuLabel>
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
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
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </div>
    );
};