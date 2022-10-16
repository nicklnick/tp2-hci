<template>
    <v-btn fab bottom right small rounded width="fit-content" color="black--text primary" class="px-6 ma-2">{{ content }}</v-btn>
  </template>

<script>
export default {
  props: ['content'],
  name: "AddButton"
};
  </script>

<style scoped>
</style>