export type Priority = "LOW" | "MEDIUM" | "HIGH"

export type ApiResponse = {
  status: string;
  message: string;
  data: Task[];
};

export type ApiResponseUniqueTask = {
  status: string;
  message: string;
  data: Task;
};
export type ApiResponseDeleteTask = {
  status: string;
  message: string;
  data: Task;
};
export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  dueDate?: Date;
  priority: Priority;
};

export type FilterOption = "all" | "completed" | "pending";
