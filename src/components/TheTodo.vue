<template>
  <ul class="list"></ul>

  <form class="newTaskForm">
    <input type="text" class="newTaskForm__input" />
    <button type="submit" class="newTaskForm__button">Add</button>
  </form>
</template>

<script setup lang="ts"></script>

<style scoped>
.list {
  list-style: none;
  padding: 0;
}
</style>
