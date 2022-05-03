<template>
  <form class="newTaskForm container" @submit.prevent="handleSubmit()">
    <input
      ref="newTaskInput"
      type="text"
      class="newTaskForm__input"
      v-model="newTaskTitle"
    />
    <button type="submit" class="newTaskForm__button">Add</button>
  </form>

  <button class="buttonRemoveAll" @click="handleRemoveAll()">
    Remove all tasks
  </button>

  <div class="container">
    <ul class="list">
      <li class="list__item" v-for="task in tasks" :key="task.id">
        <input
          type="checkbox"
          :name="task.id"
          :id="task.id"
          v-model="task.completed"
          @change="saveTasks()"
        />

        <label :for="task.id"> {{ task.title }} </label>

        <button @click="handleRemoveTask(task.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { v4 as uuidV4 } from "uuid";
import type { Task } from "@/types/task-types";

const newTaskTitle = ref("");
const newTaskInput = ref<HTMLInputElement | null>(null);
const tasks = ref<Task[]>([]);
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

onMounted(() => {
  const tasksJSON = localStorage.getItem("tasks");
  if (!tasksJSON) return [];
  tasks.value = JSON.parse(tasksJSON);

  newTaskInput.value?.focus();
});

const handleSubmit = () => {
  if (newTaskTitle.value) {
    const newTask: Task = {
      id: uuidV4(),
      title: newTaskTitle.value,
      completed: false,
      createdAt: new Date(),
    };

    tasks.value.push(newTask);
    newTaskTitle.value = "";

    saveTasks();
  }
};

const handleRemoveTask = (taskId: string) => {
  tasks.value = tasks.value.filter((task: Task) => task.id !== taskId);
  saveTasks();
};

const handleRemoveAll = () => {
  tasks.value = [];
  saveTasks();
};
</script>

<style lang="scss" scoped>
$border: 1px solid #333;

.container {
  display: flex;
  justify-content: center;
}

.newTaskForm {
  padding-bottom: 6px;
  border-bottom: $border;
}

.buttonRemoveAll {
  display: block;
  margin: 16px auto;
}

.list {
  list-style: none;
  padding: 0;

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    border-bottom: $border;
    margin-bottom: 8px;
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
</style>
