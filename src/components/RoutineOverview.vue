<template>
  <v-card color="quaternary" class="rounded-xl main_card">

    <div class="px-4 main_col main_card">

      <div class="py-3 man_col">

        <h2 >Overview</h2>
        <v-text-field rounded outlined color="secondary"  hide-details
          background-color="tertiary" label="Title"
        class="py-2"></v-text-field>

        <v-textarea rounded outlined color="secondary" hide-details
          background-color="tertiary" label="Description" no-resize
        class="py-2"></v-textarea>
        <h4>Tags</h4>
        <v-btn rounded color="primary">+ Add Tags</v-btn>

      </div>
      <div>
        <v-divider></v-divider>
      </div>
      <div class="pb-3 man_col">

        <h4>Estimated Time</h4>
        <h4 class="text-center">{{time_val}} minutes</h4>

        <h4>Level of Difficulty</h4>
        <div>
          <v-card-actions class="py-0 my-0 justify-center">
            <v-select :items="dificulty" dense rounded hide-details  single-line
                      color="secondary" item-color="secondary"
                background-color="tertiary" class="select_it" v-model="dif"></v-select>
            <h4> / 5</h4>
          </v-card-actions>
        </div>



      </div>

    </div>
  </v-card>
</template>

<script>
export default {
  name: "RoutineOverview",
  data: () => ({
    time: "45",
    dificulty: [1,2,3,4,5],
    dif: ""
  }),

  computed: {
    time_val() {
      return this.time;
    },
  },
};
</script>

<style scoped>
.main_card {
  width: 300px;
  height: 500px;
}
.main_col {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.select_it {
  max-width: 6em;
}



</style>