<template>
  <div  class="cwidth row-start">

    <!-- Main Section -->
    <v-card id="create-routine" class="cwidth cheight rounded-xl" color="quaternary" raised>
      <div  class=" cheight space-between-col" >

        <div>
          <v-card  class="cwidth rounded-b-0 rounded-t-xl row-start" color="secondary">
            <v-tabs class="tab-size-width rounded-tl-xl" background-color="secondary" show-arrows>

              <v-tabs-slider color="tertiary"></v-tabs-slider>

              <v-tab v-for="(serie, index) in series" :key="index"
                     @click="updateSeries(index)">

                <div class="flex-row justify-space-between">
                  {{ serie.name}}
                  <v-btn text fab x-small color="dark-grey"
                         @click="removeSeries(index)"
                  ><v-icon>mdi-close</v-icon></v-btn>
                </div>

              </v-tab>

            </v-tabs>

            <v-tab class="add-tab-width rounded-tr-xl"
                   @click="addSeries"><v-icon>mdi-plus</v-icon></v-tab>
          </v-card>


        </div>

        <div  class=" row-center overflow-auto">
          <div class="general-area-width general-area-height">
            <v-card class="d-flex justify-space-between my-2 quaternary" v-for="(activity, index) in currentSeries.activities"
                    :key="index">
              <span class="pl-3 pt-1">{{activity}}</span>

              <v-btn text fab x-small color="dark-grey"
                     @click="removeActivity(index)"
              ><v-icon>mdi-close</v-icon></v-btn>

            </v-card>
          </div>
        </div>

        <div  class=" row-center">

          <div class="general-area-width">


            <v-divider></v-divider>

            <div class="row-start">
              <p class="pl-3 pt-2"> Repeat </p>
              <div class="repeat">
                <v-text-field class="text-field" hide-details
                              single-line v-model="currentSeries.repeat" :rules="reprules" ></v-text-field>
              </div>
              <p class="pt-2"> times</p>
            </div>

          </div>
        </div>


      </div>
    </v-card>
  </div>



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
  activities = [];
  repeat = "1";
  immortal = 0;
  constructor(name, immortal) {
    this.name = name;
    this.immortal = immortal;  // si una serie se puede remover o no. Warmup, serie 1 y cooldown son obligatorios
  }
  add_activity(activity){
      this.activities.push(activity);
  }
  remove_activiy(index){
    this.activities.splice(index,1);
  }
}


export default {
  name: "CreateRoutineDetails",
  components: { },
  data: () => ({

    series: [new Serie("Warmup", 1),new Serie("Series 1", 1), new Serie("Cooldown", 1)],
    index: 0,
    counter: 1,
    reprules: [
      value => !!value || 'Required',
      value => !(/[^0-9]/.test(value)) || 'Only numbers'
    ],
  }),
  methods: {
    updateSeries(index) {
      this.index = index;
    },
    addActivity(activity) {
      this.series[this.index].add_activity(activity);
    },
    addSeries() {
      this.counter += 1;
      this.series.splice(this.series.length -1,0,new Serie("Serie " + this.counter, 0));
    },
      removeSeries(index){
        if(!this.currentSeries.immortal && this.series.length > 1) {

          if(index === this.series.length - 1)
              this.updateSeries(index - 1);
          else
              this.updateSeries(index + 1);

          this.series.splice(index, 1);
        }
      },
      removeActivity(index){
          this.series[this.index].remove_activiy(index);
      },
  },
  computed: {
      currentSeries() {
        if(this.series.length > this.index)
          return this.series[this.index];
        return 0;
      }
  }

};
</script>

<style scoped>
.general-area-height {
  height: 90%;
}
.general-area-width {
  width: 90%;
}

.cwidth {
  width: 800px;
}
.cheight {
  height: 500px;
}

.row-start {
  display: flex;
  flex-direction: row;
}

.tab-size-width{
  width: 85%;
}
.add-tab-width {
  width: 5%;
}
.repeat{
  width: 7%;
}
.text-field {
  padding: 0;
  margin-left: 5px;
  margin-right: 3px;
}

</style>