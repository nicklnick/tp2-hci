<template>
  <v-text-field
      dense
      solo
      rounded
      hide-details
      background-color="tertiary"
      color="secondary"
      append-icon="edit"
      :label="label_text"
  >
  </v-text-field>
</template>

<script>
export default {
  name: "InfoBar",
  props: {
    label_text:String
  }
};
</script>

<style scoped>
</style>