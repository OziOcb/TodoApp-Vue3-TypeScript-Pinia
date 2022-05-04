import { defineStore } from "pinia";
import type { Task } from "@/types/task-types";
import { v4 as uuidV4 } from "uuid";

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    loadTasks() {
      const tasksJSON = localStorage.getItem("tasks");
      if (!tasksJSON) return;
      this.tasks = JSON.parse(tasksJSON);
    },

    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    addTask(newTaskTitle: string) {
      if (newTaskTitle) {
        const newTask: Task = {
          id: uuidV4(),
          title: newTaskTitle,
          isCompleted: false,
          isEditing: false,
          createdAt: new Date(),
        };

        this.tasks.push(newTask);
      }
    },

    removeAllTasks() {
      this.tasks = [];
    },

    removeTask(taskId: string) {
      this.tasks = this.tasks.filter((task: Task) => task.id !== taskId);
    },

    editTask(task: Task, isEditing: boolean) {
      task.isEditing = isEditing;
    },
  },
});
