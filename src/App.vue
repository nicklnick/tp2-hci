<template>
  <v-app>
    <v-main>
      <v-card id="create-routine" class="create-routine" color="quaternary" raised>
        <v-flex class="d-flex centered-input">
          <v-card class="flex-grow-1" color="secondary" outlined>Warmup</v-card>

          <!-- TODO: vincular el for a la cantidad de Add Series que haya tocado la persona -->
          <v-card v-for="n in 3" :key="n" class="flex-grow-1" color="secondary" outlined>Series {{n}}</v-card>

          <v-card width="23%" color="secondary" outlined>Cooldown</v-card>
        </v-flex>

        <v-btn color="black--text primary" rounded>+ Add Routine</v-btn>

      </v-card>

    </v-main>
  </v-app>
</template>
<script>

export default {
  name: "App",

  components: {
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.create-routine {
  height: 46%;
  width: 37%;
}

.centered-input {
  text-align: center;
}
</style>
