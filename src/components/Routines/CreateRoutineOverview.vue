<template>
  <v-card class="cwidth cheight rounded-xl" color="quaternary">
    <v-card class="rounded-b-0 rounded-t-xl cwidth top-area row-center" color="secondary">
      <h2 class="mt-2">Overview</h2>
    </v-card>
    <div class="bottom-area">
      <div class="general-area">
          <div>
            <v-text-field rounded outlined color="secondary"  hide-details
                          background-color="tertiary" label="Title"
                          class="py-2"></v-text-field>

            <v-textarea rounded outlined color="secondary" hide-details
                        background-color="tertiary" label="Description" no-resize
                        class="py-2"></v-textarea>
          </div>


            <v-divider></v-divider>


          <div class="separated-row">
            <h4>Tags</h4>
            <v-btn rounded color="primary">+ Add Tags</v-btn>
          </div>

          <v-divider></v-divider>


        <div class="separated-row">
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


        <div class="separated-row">
          <h4>Estimated Time</h4>
          <h4 class="text-center">{{time_val}} minutes</h4>
        </div>
      </div>

    </div>

  </v-card>
</template>

<script>
export default {
  name: "RoutineOverview2",
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
.cwidth {
  width: 800px;
}
.cheight {
  height: 600px;
}
.space-between-col{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.top-area{
  height: 8%;
}
.bottom-area{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 92%;
  width: 100%;
}
.general-area{               /* !!!! COMMON !!!! */
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.separated-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.row-center {                 /* !!!! COMMON !!!! */
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>