<template>
  <CustomCard card-title="Exercises" card-height="600" card-width="1000" >
    <div class="cwidth row-center overflow-auto">
      <div class="general-area-width">


        <!-- Create new exercise -->
        <v-card elevation="20" class="general-area new-activity" v-if="mode === 1" color="quaternary" >
          <div class="space-between-col general-area-width general-area-height">

            <h2>New exercise</h2>
            <v-spacer></v-spacer>
            <v-divider></v-divider>

            <v-text-field rounded outlined color="secondary"
                          background-color="tertiary" label="Exercise name"
                          class="py-2" :rules="titleRules" v-model="newActivityTitle"
            ></v-text-field>
            <div class="row-center">
              <v-text-field rounded outlined color="secondary"
                            background-color="tertiary" label="Exercise length (s)"
                            class="py-2" :rules="numberRules" v-model="newActivityTime"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field rounded outlined color="secondary"
                            background-color="tertiary" label="Number of series"
                            class="py-2" :rules="numberRules" v-model="newActivitySeries"
              ></v-text-field>
            </div>

            <div class="end-row">
              <v-btn class="mb-2 mr-3"  color="secondary"
                     @click="checkAndDismiss">
                <v-icon>check</v-icon>
              </v-btn>
              <v-btn class="mb-2"  color="secondary"
                     @click="stopCreationMode">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>

        </v-card>

        <!-- View existing exercises -->
        <v-card color="d-flex justify-space-between my-2 quaternary" v-for="(activity, index) in activities"
                :key="index">

          <div class="pl-3 pt-1">
            <p class="pa-0 ma-0">Name: {{activity.name}}</p>
            <p class="pa-0 ma-0">Time: {{activity.time}}</p>
            <p class="pa-0 ma-0">Series: {{activity.series}}</p>
          </div>

          <v-btn text fab x-small color="dark-grey"
                 @click="removeActivity(index)"
          ><v-icon>mdi-close</v-icon></v-btn>
        </v-card>

      </div>
    </div>


    <v-btn class="mb-10" fab absolute right bottom color="secondary"
           @click="setCreationMode">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </CustomCard>
</template>

<script>
class Activity {
  name;
  time;
  series;
  constructor(name, time, series) {
    this.name = name;
    this.time = time;
    this.series = series;
  }
}
import CustomCard from "@/components/CommonComponents/CustomCard";
export default {
  name: "ManageExercises",
  components: { CustomCard},


  data: () => ({
    mode: 0,
    activities: [ ],
    newActivityTitle: "",
    newActivityTime: "0",
    newActivitySeries: "0",

    numberRules: [
      value => !(/[^0-9]/.test(value)) || 'Only numbers',
      value => (/^[1-9][0-9]*/.test(value)) || 'Only numbers > 0'
    ],
    titleRules: [
      value => !!value || 'Required',
    ],
  }),
  methods: {
    removeActivity(index){
      this.activities.splice(index,1);
    },
    addActivity(name, time, series) {
      this.activities.push(new Activity(name, time, series));
    },
    setCreationMode() {
      this.mode =  1;
    },
    stopCreationMode(){
      this.resetNewActivity();
      this.mode = 0;
    },
    resetNewActivity(){
      this.newActivityTitle  = "";
      this.newActivityTime = this.newActivitySeries = 0;
    },
    checkNewActivity(){
      if(this.newActivityTitle === "")
        return false;
      if ( (/[^0-9]/.test(this.newActivitySeries)) || (/[^0-9]/.test(this.newActivityTime)) )
        return false;
      if (!(/^[1-9][0-9]*/.test(this.newActivitySeries)) && !(/^[1-9][0-9]*/.test(this.newActivityTime)) )
        return false;

      // TODO: check if title already exists

      return true;
    },
    checkAndDismiss(){
        if(this.checkNewActivity()){

          this.addActivity(this.newActivityTitle, this.newActivityTime, this.newActivitySeries)

          this.stopCreationMode()
        }
    }
  },
};
</script>

<style scoped>


.cwidth {
  width: 1000px;
}
.cheight {
  height: 600px;
}
.row-center {                 /* !!!! COMMON !!!! */
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.general-area-height {                /* !!!! COMMON !!!! */
  height: 90%;
}
.space-start-col{
  display: flex;
  justify-content: start;
  flex-direction: column;
}
.space-between-col{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.new-activity{
  margin-bottom: 20px;
  margin-top: 20px;
}

.general-area-width {                /* !!!! COMMON !!!! */
  width: 90%;
}
.general-area {
  display: flex;
  justify-content: center;
  align-items: center;
}
.end-row {                /* !!!! COMMON !!!! */
   display: flex;
   justify-content: end;
   flex-direction: row;
 }


</style>