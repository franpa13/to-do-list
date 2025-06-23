import { useTaskStore } from "@/store/task-store";
import type { Priority, Task } from "@/types/task-types";
import { toast } from "sonner";
import { Select, SelectContent, SelectTrigger, SelectItem } from "./ui/select";
import { Flag } from "lucide-react";
import {type Row } from "@tanstack/react-table";

interface PriorityCellProps {
  row: Row<Task>;
}

export const CellPriority = ({ row }: PriorityCellProps) => {
  const { optimisticUpdatePriority } = useTaskStore();
  const taskId = row.original.id;

  const value = row.getValue<Priority>("priority");

  const colorMap: Record<Priority, string> = {
    HIGH: "text-red-500 border-red-700 dark:bg-red-900/10",
    MEDIUM: "text-yellow-500 border-yellow-500 dark:bg-yellow-900/10",
    LOW: "text-green-500 border-green-500 dark:bg-green-900/10",
  };

  const labelMap: Record<Priority, string> = {
    HIGH: "ALTA",
    MEDIUM: "MEDIA",
    LOW: "BAJA",
  };

  const handleChange = async (newPriority: Priority) => {
    try {
      await optimisticUpdatePriority(taskId, newPriority);
    } catch (e) {
      toast.error("Ha ocurrido un error, inténtelo nuevamente!");
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
};