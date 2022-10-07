<template>
  <v-text-field
    class="search-bar mt-6"
    label="Search"
    background-color="quaternary"
    color="black"
    append-icon="mdi-magnify"
    hide-no-data
    dense
    rounded
    filled
    solo-inverted
  ></v-text-field>
</template>

<script>
export default {
  name: "SearchBar",
};
</script>

<style scoped>
.search-bar {
  width: 35%;
  align-self: center;
}
</style>
