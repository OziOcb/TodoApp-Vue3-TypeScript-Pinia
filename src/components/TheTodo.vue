<template>
  <form class="newTaskForm" @submit.prevent="handleSubmit()">
    <input
      type="text"
      class="newTaskForm__input"
      v-model="newTaskTitle"
      ref="inputElo"
    />
    <button type="submit" class="newTaskForm__button">Add</button>
  </form>

  <ul class="list">
    <li v-for="task in tasks" :key="task.id">
      <input
        type="checkbox"
        :name="task.id"
        :id="task.id"
        v-model="task.completed"
        @change="saveTasks()"
      />
      <label :for="task.id"> {{ task.title }} </label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const newTaskTitle = ref("");
const inputElo = ref<HTMLInputElement | null>(null);
const tasks = ref<Task[]>([]);
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

onMounted(() => {
  const tasksJSON = localStorage.getItem("tasks");
  if (!tasksJSON) return [];
  tasks.value = JSON.parse(tasksJSON);

  inputElo.value?.focus();
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
</script>

<style scoped>
.list {
  list-style: none;
  padding: 0;
}
</style>
