<template>
  <v-app class="app">
    <v-spacer></v-spacer>
      <div class="d-flex align-center justify-center">
        <IconUser></IconUser>
      </div>
      <v-spacer></v-spacer>
      <div>
        <p class="font-weight-bold">username</p>
      </div>
      <div>
        <InfoUser>
        </InfoUser>
      </div>
    <v-spacer></v-spacer>
  </v-app>
</template>

<script>

import IconUser from "@/components/IconUser";
import InfoUser from "@/components/InfoUser";

export default {
  name: "App",

  components: {
    IconUser,
    InfoUser
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.font-weight-bold {
  text-align: center;
}

.app {
  background: url('/src/images/Background.jpg') no-repeat center center fixed !important;
  background-size: cover;
}
</style>
