import { create } from 'zustand';
import type { Priority, Task } from '@/types/task-types';
import { updateTask } from '@/service/updateTask';
import { deleteTask } from '@/service/deleteTask';
import { updatePriorityTask } from '@/service/updatePriority';

type TaskStore = {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  setTasks: (tasks: Task[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  optimisticUpdate: (taskId: string, updates: Partial<Task>) => Promise<void>;
  optimisticDelete: (taskId: string) => Promise<void>;
  optimisticUpdatePriority: (taskId: string, newPriority: Priority) => Promise<void>;
};


export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: true,
  error: null,

  setTasks: (tasks) => set({ tasks }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  optimisticUpdate: async (taskId, updates) => {
    const originalTasks = get().tasks;
    const originalTask = originalTasks.find(t => t.id === taskId);

    if (!originalTask) {
      throw new Error(`Task with id ${taskId} not found`);
    }

    const updatedTask = {
      ...originalTask,
      ...updates,
      id: taskId
    };

   
    set({
      tasks: originalTasks.map(task =>
        task.id === taskId ? updatedTask : task
      )
    });

    try {
      await updateTask(taskId, updatedTask);
    } catch (error) {
      set({ tasks: originalTasks });
      set({ error: 'Failed to update task' });
      throw error;
    }
  },

  optimisticDelete: async (taskId) => {
    const originalTasks = get().tasks;
    const taskToDelete = originalTasks.find(t => t.id === taskId);

    if (!taskToDelete) {
      throw new Error(`Task with id ${taskId} not found`);
    }


    set({
      tasks: originalTasks.filter(task => task.id !== taskId)
    });

    try {
   
      await deleteTask(taskId);
    } catch (error) {

      set({ tasks: originalTasks });
      set({ error: 'Failed to delete task' });
      throw error;
    }
  },

  optimisticUpdatePriority: async (taskId, newPriority) => {
    const originalTasks = get().tasks;
    const originalTask = originalTasks.find(t => t.id === taskId);

    if (!originalTask) {
      throw new Error(`Task with id ${taskId} not found`);
    }


    const updatedTask = {
      ...originalTask,
      priority: newPriority
    };

    set({
      tasks: originalTasks.map(task =>
        task.id === taskId ? updatedTask : task
      )
    });

    try {
      await updatePriorityTask(taskId, newPriority);
    } catch (error) {
      set({ tasks: originalTasks });
      set({ error: 'Failed to update priority' });
      throw error;
    }
  },

}));
