<template>
  <v-card id="create-routine" class="cwidth cheight rounded-lg" color="quaternary" raised>
    <div class="cwidth cheight ccol" >

      <div>
        <v-card class="rounded-b-0 rounded-t-lg cwidth crow" color="secondary">
          <v-tabs class="tab-size rounded-tl-lg" background-color="secondary" show-arrows>

            <v-tabs-slider color="tertiary"></v-tabs-slider>

            <v-tab v-for="(serie, index) in series" :key="serie.name"
                    @click="updateSeries(index)">
              <div class="flex-row justify-space-between">
                {{ serie.name}}
                <v-btn text fab x-small color="dark-grey"
                       @click="removeSeries(index)"
                ><v-icon>mdi-close</v-icon></v-btn>
              </div>

            </v-tab>

          </v-tabs>

          <v-tab class="add-tab rounded-tr-lg"
                 @click="addSeries"><v-icon>mdi-plus</v-icon></v-tab>
        </v-card>


      </div>

      <div class="general-area-width general-area overflow-auto">

        <div>
          <li  v-for="(activity, index) in currentSeries.activities"
               :key="index">
            {{activity}}
          </li>
        </div>


      </div>



      <div class="cwidth general-area">

        <div class="general-area-width">
          <div class="crow2">
            <div class="pb-5 pr-5">
              <v-btn color="primary" rounded @click="addActivity('New Activity')">add</v-btn>
            </div>
          </div>

          <v-divider></v-divider>

          <div>
            <p class="pl-3 pt-2"> Repeat 3 times</p>
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
    counter: 1,
  }),
  methods: {
      updateSeries(index){
          this.index = index;
      },
      addActivity(activity){
          this.series[this.index].add_activity(activity)
      },
      addSeries(){
          this.series.push(new Serie("Serie " + this.counter));
          this.counter += 1
      },
      removeSeries(index){
        if(this.series.length > 1)
            this.series.splice(index,1);
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
.general-area-width {
  width: 90%;
}

.general-area {
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

.ccol{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.crow2 {
  display: flex;
  justify-content: end;
  flex-direction: row;
}
.crow {
  display: flex;
  flex-direction: row;
}
.tab-size{
  width: 85%;
}
.add-tab {
  width: 5%;
}

</style>