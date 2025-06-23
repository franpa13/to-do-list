// hooks/useTaskFilter.ts
import { type Table } from "@tanstack/react-table";
import type { FilterOption, Task } from "@/types/task-types";



export const useTaskFilter = (table: Table<Task>) => {
    const currentFilter = table.getColumn("completed")?.getFilterValue();

    const filterValue: FilterOption =
        currentFilter === true ? "completed" :
            currentFilter === false ? "pending" :
                "all";

    const setFilter = (value: FilterOption) => {
        table.getColumn("completed")?.setFilterValue(
            value === "all" ? undefined :
                value === "completed" ? true :
                    false
        );
    };

    const getFilterLabel = () => {
        return filterValue === "completed" ? "Completadas" :
            filterValue === "pending" ? "Pendientes" : "Todos";
    };

    return {
        filterValue,
        setFilter,
        getFilterLabel
    };
};