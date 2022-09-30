<template>
  <v-app>
    <v-main>
      <CreateRoutinePanel2></CreateRoutinePanel2>

    </v-main>
  </v-app>
</template>
<script>

import CreateRoutinePanel2 from "@/components/CreateRoutinePanel2";
export default {
  name: "App",

  components: {
    CreateRoutinePanel2
  },
  data: () => ({
  }),
};
</script>

<style>
</style>
