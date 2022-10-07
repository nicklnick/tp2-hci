<template>
  <v-card
    id="home-button"
    class="logo-top-bar"
    color="tertiary"
    cols="auto"
    raised
  >
    <v-img :src="require('@/assets/FF_logo_small.png')" contains></v-img>
  </v-card>
</template>

<script>
export default {
  name: "HomeButton",
};
</script>

<style scoped>
.logo-top-bar {
  width: 7%;
}
</style>
