<template>
  <v-app>
    <v-main>
      <CreateRoutinePanel></CreateRoutinePanel>

    </v-main>
  </v-app>
</template>
<script>

import CreateRoutinePanel from "@/components/CreateRoutinePanel";
export default {
  name: "App",

  components: {
    CreateRoutinePanel
  },
  data: () => ({
    //
  }),
};
</script>

<style>
</style>
