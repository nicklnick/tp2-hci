<template>
  <div  class="total-height">
    <div class="top-height">
      <TopBar></TopBar>
    </div>


    <div class="bottom-height d-flex  width">
      <div class="w2" >
        <SideMenu></SideMenu>
      </div>
      <div class="general-area width ">
        <!-- General -->
        <div class="space-between-col total-height py-10 width">
          <div class="space-between-row width px-10">
            <router-link class="button-link" to="/routines">
              <v-btn fab color="tertiary">
                <v-icon>chevron-left</v-icon>
              </v-btn>

            </router-link>
              <h1>Create Routine</h1>
            <v-card></v-card>

          </div>


          <!-- ROUTINE DETAILS -->
          <div v-if="mode===1" class="row-center width">
            <div  class="pr-7 cwidth row-start">
              <v-card id="create-routine" class="cwidth cheight rounded-xl" color="quaternary" raised>
                <div  class=" cheight space-between-col" >

                  <div>
                    <v-card  class="cwidth rounded-b-0 rounded-t-xl row-start" color="secondary">
                      <v-tabs class="tab-size-width rounded-tl-xl" background-color="secondary" show-arrows
                      v-model="index">

                        <v-tabs-slider color="tertiary"></v-tabs-slider>

                        <v-tab v-for="(serie, index) in series" :key="index">

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
                      <v-card class="d-flex justify-space-between my-2 quaternary" v-for="(exercise, index) in currentSeries.sports"
                              :key="index">
                        <div class="text-width">
                          <h5 class="card_text pl-3 pt-1">Name: {{exercise.name}}</h5>
                          <h5 class="card_text pl-3 pt-1">{{exercise.detail}}</h5>
                        </div>

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

                        <v-spacer></v-spacer>
                        <span class=" pt-2 error-msg">{{this.errorMsg}}</span>
                      </div>

                    </div>
                  </div>
                </div>
              </v-card>
            </div>

              <!-- SELECT EXERCISE -->
              <CustomCard card-width="400" card-height="550" card-title="Select Exercise">

                <div class="general-height overflow-auto px-4">

                  <v-card class="d-flex justify-space-between my-2 quaternary" v-for="(exercise, index) in $items"
                          :key="index">
                    <div class="text-width">
                      <h5 class="card_text pl-3 pt-1">Name: {{exercise.name}}</h5>
                    </div>

                    <v-btn text fab x-small color="dark-grey" @click="addActivity(exercise.id)">
                      <v-icon>mdi-check</v-icon></v-btn>
                  </v-card>
                </div>

              </CustomCard>

          </div>


          <div v-if="mode===1" class="space-between-row width px-10">
            <v-btn @click="previousStep" fab color="primary">
              <v-icon>chevron-left</v-icon>
            </v-btn>

            <v-alert class="error-tag ma-0" :value="error" dismissible type="error">{{errorMsg}}</v-alert>

            <v-btn  class="align-self-center" color=" primary"
                    @click="finish">finish</v-btn>
          </div>


          <!-- ROUTINE OVERVIEW -->
          <div v-if="mode===0" class="row-evenly width">
            <CustomCard  card-title="Overview" card-width="1000" card-height="550">

              <div class="bottom-area">
                <div class="overview">
                  <div>
                    <v-form v-model="validTitle">
                      <v-text-field rounded outlined color="secondary" :rules="titleRules"
                                    background-color="tertiary" label="Title"
                                    class="py-2" v-model="title"></v-text-field>
                    </v-form>

                    <v-form v-model="validDetails">
                    <v-textarea rounded outlined color="secondary" :rules="detailRules"
                                background-color="tertiary" label="Description" no-resize
                                class="py-2" v-model="details"></v-textarea>
                    </v-form>
                  </div>


                  <v-divider></v-divider>


                  <div class="space-between-row">
                    <h4>Tags</h4>
                    <v-btn rounded color="primary">+ Add Tags</v-btn>
                  </div>

                  <v-divider></v-divider>


                  <div class="space-between-row">
                    <h4>Difficulty level: </h4>
                    <div>
                      <v-card-actions class="py-0 my-0 justify-center">
                        <v-select :items="dificulties" dense rounded hide-details single-line
                                  color="secondary" item-color="secondary"
                                  background-color="tertiary" class="select_it" v-model="difficulty"></v-select>
                        <h4> / 5</h4>
                      </v-card-actions>
                    </div>
                  </div>


                  <div class="space-between-row">
                    <h4>Public: </h4>
                    <v-switch v-model="isPublic" class="pa-0 ma-0" hide-details></v-switch>
                  </div>
                </div>

              </div>
            </CustomCard>
          </div>

          <div v-if="mode===0" class="row-end px-10">

            <v-alert class="error-tag ma-0" :value="error" dismissible type="error">{{errorMsg}}</v-alert>

            <v-btn @click="addRoutine" fab color="primary">
              <v-icon>chevron-right</v-icon>
            </v-btn>
          </div>

        </div>


      </div>
    </div>


  </div>
</template>

<script>


import TopBar from "@/components/Navigation/TopBar";
import SideMenu from "@/components/Navigation/SideMenu";
import CustomCard from "@/components/CommonComponents/CustomCard";
import { Exercise } from "@/api/exercise";
import { useExerciseStore } from "@/stores/ExerciseStore";
import { useSecurityStore } from "@/stores/SecurityStore";
import { mapActions, mapState } from "pinia";

import { Routine,RoutineApi } from "@/api/routine";

class Serie {
  name;
  sports = [];
  repeat = "1";
  immortal = 0;
  constructor(name, immortal) {
    this.name = name;
    this.immortal = immortal;  // si una serie se puede remover o no. Warmup, serie 1 y cooldown son obligatorios
  }
  add_activity(activity){
    this.sports.push(activity);
  }
  remove_activiy(index){
    this.sports.splice(index,1);
  }
}

export default {
  name: "CreateRoutineView",
  components: {
    CustomCard,
    //CreateRoutineOverview,
    SideMenu,
    TopBar
  },
  data: () => ({
    mode: 0,

    // routine detials
    series: [new Serie("Warmup", 1),new Serie("Series 1", 1), new Serie("Cooldown", 1)],
    index: 0,
    counter: 1,
    reprules: [
      value => !!value || 'Required',
      value => !(/[^0-9]/.test(value)) || 'Only numbers'
    ],

    errorMsg: null,
    error: false,



    //routine overview
    titleRules: [
      value => !!value || 'Required',
      value => value.length < 100 || 'Must be 100 characters or less',
    ],
    detailRules: [
      value => !!value || 'Required',
      value => value.length < 200 || 'Must be 200 characters or less',
    ],
    dificulties: ["Rookie", "Beginner", "Intermediate", "Advanced", "Expert"],

    validTitle: false,
    validDetails: false,
    validCategory: false,


    isPublic: true,
    difficulty: "Rookie",
    title: "",
    details: "",



  }),
  methods: {
    handleError(msg){
      this.errorMsg = msg
      this.error = true;
      setTimeout(()=>{
        this.error=false;
        this.errorMsg = "";
      },5000)

    },
    checkValidDetails(){
      for(const serie in this.series){
        if(this.series[serie].sports.length === 0){
          this.handleError("All series must have sports")
          return false;
        }
      }
      return true;
    },
    checkValidOverview(){
      return this.validDetails && this.validTitle;
    },

    async addRoutine(){
        if(this.checkValidOverview()){
          try{
            await RoutineApi.add(new Routine(null, this.title, this.details,this.isPublic,this.difficulty.toLowerCase()))
            this.mode = 1
          }
          catch (e) {
            console.log(e)
          }
        }
        else{
          this.handleError("Missing title or details");
        }
    },
    finish() {
      if(this.checkValidDetails())
        this.mode = 1;

      // await this.$router.push({ name: "My Routines" })
    },

    previousStep(){
        this.mode = 0;
    },

    // routine details
    updateSeries(index) {
      this.index = index;
    },
    async addActivity(id) {
      const exercise = await this.exerciseStore.get(new Exercise(id))
      this.series[this.index].add_activity(exercise);
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
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn',
      $online: 'online'
    }),
    ...mapActions(useSecurityStore, {
      $checkApiOnline: 'checkApiOnline',
    }),
    ...mapState(useExerciseStore,{
      $items: 'items',
    }),

    // routine detials
    currentSeries() {
      if(this.series.length > this.index)
        return this.series[this.index];
      return 0;
    },

    // routine overview
    time_val() {
      return this.time;
    },
  },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();

    await this.$checkApiOnline;

    if (!this.$online) {
      await this.$router.push({ name: "Error" });
    }
    if (this.$isLoggedIn === false) {   // TODO: !!!! check !!!!
      await this.$router.push({ name: "Login" });
    }
    this.exerciseStore = useExerciseStore();
    await this.exerciseStore.updateCache();
  }
};



</script>

<style scoped>
.total-height{
  height: 100%;
}
.top-height{
  height: 10%;
}
.bottom-height{
  height: 90%;
}
.width{
  width: 100%;
}
.w2{
  width: 15%;
}

.general-area{               /* !!!! COMMON !!!! */
  display: flex;
  justify-content: center;
  align-items: center;
  zoom: 85%;
}

.text-width{
  width: 85%;
}
.general-height {
  height: 500px
}

.card_text {
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

/*routine details*/

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
  height: 550px;
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

/* routine overview */
.top-area{
  height: 8%;
}
.bottom-area{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
}
.overview{               /* !!!! COMMON !!!! */
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.error-tag{
  position: fixed;
  bottom: 50px;
  right: 33%;
  width: 400px;
}


</style>