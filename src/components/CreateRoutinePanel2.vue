<template>
  <v-card id="create-routine" class="cwidth cheight rounded-lg" color="quaternary" raised>
    <div class="cwidth cheight space-between-col" >

      <div>
        <v-card class="rounded-b-0 rounded-t-lg cwidth row-start" color="secondary">
          <v-tabs class="tab-size-width rounded-tl-lg" background-color="secondary" show-arrows>

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

          <v-tab class="add-tab-width rounded-tr-lg"
                 @click="addSeries"><v-icon>mdi-plus</v-icon></v-tab>
        </v-card>


      </div>

      <div class="cwidth row-center overflow-auto">
        <div class="general-area-width general-area-height">
          <v-card color="d-flex justify-space-between my-2 quaternary" v-for="(activity, index) in currentSeries.activities"
               :key="index">
            <span class="pl-3 pt-1">{{activity}}</span>

            <v-btn text fab x-small color="dark-grey"
              @click="removeActivity(index)"
            ><v-icon>mdi-close</v-icon></v-btn>

          </v-card>
        </div>
      </div>

      <div class="cwidth row-center">

        <div class="general-area-width">
          <div class="end-row">
            <div class="pb-3 pr-3">
              <v-btn color="primary" rounded small @click="addActivity('New Activity', 0)">add exercise</v-btn>
            </div>
          </div>

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
  name: "CreateRoutinePanel",
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
    addActivity(activity, immortal) {
      this.series[this.index].add_activity(activity, immortal);
    },
    addSeries() {
      this.counter += 1;
      this.series.splice(this.series.length -1,0,new Serie("Serie " + this.counter));
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

.row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.cwidth {
  width: 600px;
}
.cheight {
  height: 400px;
}

.space-between-col{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.end-row {
  display: flex;
  justify-content: end;
  flex-direction: row;
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