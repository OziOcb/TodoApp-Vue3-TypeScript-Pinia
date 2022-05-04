<template>
  <form class="newTaskForm container" @submit.prevent="handleAddTask()">
    <input
      ref="newTaskInput"
      type="text"
      class="newTaskForm__input"
      v-model="newTaskTitle"
    />
    <button type="submit" class="newTaskForm__button">Add</button>
  </form>

  <button class="buttonRemoveAll" @click="handleRemoveAllTasks()">
    Remove all tasks
  </button>

  <div class="container">
    <ul class="list">
      <li class="list__item" v-for="task in tasks" :key="task.id">
        <template v-if="!task.isEditing">
          <input
            type="checkbox"
            :name="task.id"
            :id="task.id"
            v-model="task.isCompleted"
          />
          <label :for="task.id"> {{ task.title }} </label>
        </template>

        <template v-else>
          <form @submit.prevent="handleSaveEditedTask(task)">
            <input ref="editTaskInputs" type="text" v-model="task.title" />

            <button type="submit" class="newTaskForm__button">Save</button>
          </form>
        </template>

        <div>
          <button @click="handleRemoveSingleTask(task.id)">X</button>
          <button @click="handleEditTask(task)">Edit</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { v4 as uuidV4 } from "uuid";
import type { Task } from "@/types/task-types";

const newTaskTitle = ref("");
const newTaskInput = ref<HTMLInputElement | null>(null);
const editTaskInputs = ref<HTMLInputElement[]>([]);
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

watch(
  () => tasks.value,
  () => saveTasks(),
  { deep: true }
);

const handleAddTask = () => {
  if (newTaskTitle.value) {
    const newTask: Task = {
      id: uuidV4(),
      title: newTaskTitle.value,
      isCompleted: false,
      isEditing: false,
      createdAt: new Date(),
    };

    tasks.value.push(newTask);
    newTaskTitle.value = "";
  }
};

const handleRemoveAllTasks = () => (tasks.value = []);

const handleRemoveSingleTask = (taskId: string) => {
  tasks.value = tasks.value.filter((task: Task) => task.id !== taskId);
};

const handleEditTask = async (task: Task) => {
  task.isEditing = true;
  await nextTick();
  editTaskInputs?.value[editTaskInputs?.value.length - 1]?.focus();
};

const handleSaveEditedTask = (task: Task) => (task.isEditing = false);
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
