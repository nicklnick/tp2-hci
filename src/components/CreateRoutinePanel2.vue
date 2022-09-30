<template>
  <v-card id="create-routine" class="create-routine overflow-y-auto" color="quaternary" raised
              max-height="400px">

    <v-flex class="flex-column">
      <v-card >

        <v-tabs
          class="rounded-t-lg"
          background-color="secondary"
          show-arrows
        >
          <v-tabs-slider color="tertiary"></v-tabs-slider>

          <v-tab
            v-for="(serie, index) in series"
            :key="serie.name"
            @click="updateSeries(index)"
          >
            {{ serie.name}}
          </v-tab>
        </v-tabs>
      </v-card>

      <v-card v-for="(activity, index) in currentSeries.activities"
      :key="index">
        {{activity}}
      </v-card>

    </v-flex>

    <div class="floating-buttons">
      <v-btn @click="addActivity('New Activity')">add</v-btn>
    </div>
  </v-card>
</template>

<script>

// eslint-disable-next-line no-unused-vars
class Activity {
  name;
  details;
  constructor(name) {
    this.name = name;
  }
}

class Serie {
  name;
  activities = ['Stretch', 'Rest','Jumping Jacks'];
  constructor(name) {
    this.name = name;
  }
  add_activity(activity){
      this.activities.push(activity);
  }
}


export default {
  name: "CreateRoutinePanel",
  data: () => ({
    series: [new Serie("Warmup"), new Serie("Serie 1")],
    index: 0,
  }),
  methods: {
      updateSeries(index){
          this.index = index;
      },
      addActivity(activity){
          this.series[this.index].add_activity(activity)
      }
  },
  computed: {
      currentSeries() {
        return this.series[this.index];
      },
  },

};
</script>

<style scoped>
.create-routine {
  height: 46%;
  width: 37%;
}

.routine-text {
  width: 85%;
}

.centered-input {
  text-align: center;
}

.floating-buttons {
  flex-direction: row;
  display: flex;
  justify-content: end;
}
</style>