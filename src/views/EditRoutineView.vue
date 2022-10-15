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
                <img width="30" height="30" src="../assets/icons/chevron-left.svg" alt="left">
              </v-btn>

            </router-link>
            <h1>Edit Routine</h1>
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

                        <v-tab v-for="(cycle, index) in routine.cycles" :key="index">

                          <div class="flex-row justify-space-between">
                            {{ cycle.cycle_name}}
                            <v-btn v-if="!immortalCycles(cycle.cycle_name)" text fab x-small color="dark-grey"
                                   @click="removeCycle(index)"
                            ><v-icon>mdi-close</v-icon></v-btn>
                          </div>

                        </v-tab>

                      </v-tabs>

                      <v-tab class="add-tab-width rounded-tr-xl"
                             @click="addCycle"><v-icon>mdi-plus</v-icon></v-tab>
                    </v-card>
                  </div>

                  <div  class=" row-center overflow-auto">
                    <div class="general-area-width general-area-height">
                      <ExerciseCard2 class="my-2 quaternary" v-for="(exercise, index) in currentSeries.exercises"
                                     :exer_name="exercise.exercise_name" :exer_detail="exercise.exercise_detail" :key="index"
                                     :exer_type="exercise.exercise_type" editable="false"
                                     @removeExercise="removeExercise(index)">


                        <!-- exercise time and series -->
                        <div class="pt-2 space-evenly-col">
                          <v-form v-model="exercise.validDuration">
                            <v-text-field v-model="exercise.exericse_duration" :rules="reprules" label="Time (s)"></v-text-field>
                          </v-form>
                          <v-form v-model="exercise.validRepetitions">
                            <v-text-field v-model="exercise.exercise_repetitions" :rules="reprules" label="Repetitions"></v-text-field>
                          </v-form>
                        </div>



                        <!-- card editing/navigation -->
                        <div class="space-evenly-col">
                          <v-btn text fab x-small color="dark-grey"
                                 @click="removeExercise"
                          ><v-icon>mdi-close</v-icon></v-btn>
                          <v-btn text fab x-small color="dark-grey" @click="moveExercise(index,-1)">
                            <img width="20" height="20" src="../assets/icons/chevron-up.svg" alt="up">
                          </v-btn>
                          <v-btn text fab x-small color="dark-grey" @click="moveExercise(index,1)">
                            <img width="20" height="20" src="../assets/icons/chevron-down.svg" alt="down">
                          </v-btn>

                        </div>
                      </ExerciseCard2>
                    </div>
                  </div>

                  <div  class=" row-center">
                    <div class="general-area-width">
                      <v-divider></v-divider>

                      <div class="row-start">
                        <p class="pl-3 pt-2">Repeat</p>
                        <div class="repeat">
                          <v-form v-model="currentSeries.validRepetitions">
                            <v-text-field class="text-field" single-line v-model="currentSeries.cycle_repetitions" :rules="reprules" ></v-text-field>
                          </v-form>
                        </div>
                        <p class="pt-2"> times</p>

                        <v-spacer></v-spacer>
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
                    <h4 class="card_text pl-3 pt-1">{{exercise.name}}</h4>
                  </div>

                  <v-btn text fab x-small color="dark-grey" @click="addExercise(exercise.id)">
                    <v-icon>mdi-check</v-icon></v-btn>
                </v-card>
              </div>

            </CustomCard>

          </div>


          <div v-if="mode===1" class="space-between-row width px-10">
            <v-btn @click="previousStep" fab color="primary">
              <img width="30" height="30" src="../assets/icons/chevron-left.svg" alt="left">
            </v-btn>

            <v-alert class="error-tag ma-0" :value="error" dismissible type="error">{{errorMsg}}</v-alert>

            <v-btn  class="align-self-center" color=" primary"
                    @click="finish">finish</v-btn>
          </div>


          <!-- ROUTINE OVERVIEW -->
          <div v-if="mode===0" class="row-evenly width">
            <CustomCard card-title="Overview" card-width="1000" card-height="550">

              <div class="bottom-area">
                <div class="overview">
                  <div>
                    <v-form v-model="validTitle">
                      <v-text-field rounded outlined color="secondary" :rules="titleRules"
                                    background-color="tertiary" label="Title"
                                    class="py-2" v-model="routine.routine_name"></v-text-field>
                    </v-form>

                    <v-form v-model="validDetails">
                      <v-textarea rounded outlined color="secondary" :rules="detailRules"
                                  background-color="tertiary" label="Description" no-resize
                                  class="py-2" v-model="routine.routine_detail"></v-textarea>
                    </v-form>
                  </div>


                  <v-divider></v-divider>

                  <div class="space-between-row">
                    <h4>Category</h4>
                    <v-chip-group v-model="routine.routine_category" mandatory>
                      <v-chip color="tertiary" v-for="(cat, index) in $categoryItems" :key="index">{{cat.name}}</v-chip>
                    </v-chip-group>
                  </div>

                  <v-divider></v-divider>


                  <div class="space-between-row">
                    <h4>Difficulty level: </h4>
                    <div>
                      <v-card-actions class="py-0 my-0 justify-center">
                        <v-select :items="dificulties" dense rounded hide-details single-line
                                  color="secondary" item-color="secondary"
                                  background-color="tertiary" class="select_it" v-model="routine.routine_difficulty"></v-select>
                      </v-card-actions>
                    </div>
                  </div>
<!--                  <div class="space-between-row">-->
<!--                    <h4>Public: </h4>-->
<!--                    <v-switch readonly v-model="routine.routine_is_public" class="pa-0 ma-0" hide-details></v-switch>-->
<!--                  </div>-->
                </div>

              </div>
            </CustomCard>
          </div>

          <div v-if="mode===0" class="row-end px-10">

            <v-alert class="error-tag ma-0" :value="error" dismissible type="error">{{errorMsg}}</v-alert>

            <v-btn @click="confirmOverview" fab color="primary">
              <img width="30" height="30" src="../assets/icons/chevron-right.svg" alt="left">
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
import { mapState } from "pinia";
import ExerciseCard2 from "@/components/Exercise/ExerciseCard2";
import { useCategoryStore } from "@/stores/CategoryStore";
import { CompleteCycle, CompleteExercise, CompleteRoutine, CompleteRoutineApi } from "@/api/CompleteRoutineApi";
import { FavouriteApi } from "@/api/favourites";


export default {
  name: "CreateRoutineView",
  components: {
    ExerciseCard2,
    CustomCard,
    SideMenu,
    TopBar,
  },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    await securityStore.checkApiOnline();

    if(securityStore.online === false){
      await this.$router.push({ name: "Error" });
    }
    if(securityStore.isLoggedIn === false){   // TODO: !!!! check !!!!
      await this.$router.push({ name: "Login" });
    }
    else{
      this.exerciseStore = useExerciseStore();
      await this.exerciseStore.updateCache();
      this.categoryStore = useCategoryStore();
      await this.categoryStore.updateCache();

      // setup del ejercicio que ya existe
      this.routine = await CompleteRoutineApi.getCompleteRoutine(this.$route.params.id);

      this.setupValues();

      this.oldVersion = await CompleteRoutineApi.getCompleteRoutine(this.$route.params.id);
    }
  },
  computed: {
    ...mapState(useExerciseStore,{
      $items: 'items',
    }),
    ...mapState(useCategoryStore,{
      $categoryItems: 'items',
    }),

    // routine detials
    currentSeries() {
      if(this.routine.cycles.length > this.index)
        return this.routine.cycles[this.index];
      return this.routine.cycles[0];
    },
    currentIndex(){
      return this.index;
    }
  },
  data: () => ({

    routine: new CompleteRoutine("","",true,"Rookie"),
    oldVersion: null,

    // display mode, 0 = routine overview, 1 = routine details
    mode: 0,

    /* --- routine overview --- */
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

    /* --- routine details --- */
    // order lo vamos a poner al final

    counter: 1,
    index: 0,
    reprules: [
      value => !!value || 'Required',
      value => !(/[^0-9]/.test(value)) || 'Only numbers'
    ],

    /* --- error handling --- */
    errorMsg: null,
    error: false,

  }),
  methods: {
    setupValues(){
      let index = 0;
      for(const catKey in this.$categoryItems){
        if(this.routine.routine_category.id === this.$categoryItems[catKey].id){
          this.routine.routine_category = index;
        }
        index +=1;
      }
      this.routine.routine_difficulty = this.routine.routine_difficulty.charAt(0).toUpperCase() + this.routine.routine_difficulty.slice(1);
    },
    //  ---- common ----
    handleError(msg){
      this.errorMsg = msg
      this.error = true;
      setTimeout(()=>{
        this.error=false;
        this.errorMsg = "";
      },5000)

    },
    //  ---- overivew ----
    checkValidOverview(){
      if( !this.validDetails || !this.validTitle){
        this.handleError("Missing title or details");
        return false;
      }
      return true;
    },
    async confirmOverview(){
      if(this.checkValidOverview()){
        this.routine.routine_difficulty = this.routine.routine_difficulty.toLowerCase();
        this.routine.routine_category = this.$categoryItems[this.routine.routine_category]
        this.mode = 1
      }
    },
    // ---- details ----
    previousStep(){
      this.mode = 0;
    },
    updateSeries(index) {
      this.index = index;
    },
    checkValidCyclesAndExercises(){
      let currentIndex = 0
      for(const cycleKey in this.routine.cycles){
        if(this.routine.cycles[cycleKey].exercises.length === 0){
          this.handleError("All series must have exercises")
          this.index = parseInt(cycleKey)
          return false;
        }
        if(!this.routine.cycles[cycleKey].validRepetitions){
          this.handleError("Number of repetitions must be a number")
          this.index = parseInt(cycleKey)
          return false;
        }
        currentIndex += 1;
        this.routine.cycles[cycleKey].cycle_repetitions = parseInt(this.routine.cycles[cycleKey].cycle_repetitions);
        this.routine.cycles[cycleKey].cycle_order = currentIndex;

        let routIndex = 0;
        for(const exerKey in this.routine.cycles[cycleKey].exercises){
          routIndex += 1;
          const reps = parseInt(this.routine.cycles[cycleKey].exercises[exerKey].exercise_repetitions);
          const dur = parseInt(this.routine.cycles[cycleKey].exercises[exerKey].exericse_duration);

          if((!this.routine.cycles[cycleKey].exercises[exerKey].validRepetitions || !this.routine.cycles[cycleKey].exercises[exerKey].validDuration)
            || (!(reps > 0) && !(dur > 0))){
            this.index = currentIndex;
            this.handleError("Exercise must have either duration > 0 or repetitions > 0");
            return false;
          }
          if(reps > 999 || dur > 999){
            this.handleError("Exercise must have duration < 999 and repetitions < 999");
            this.index = currentIndex;
            return false;
          }

          this.routine.cycles[cycleKey].exercises[exerKey].exercise_order = routIndex;
          this.routine.cycles[cycleKey].exercises[exerKey].exercise_repetitions = reps;
          this.routine.cycles[cycleKey].exercises[exerKey].exericse_duration = dur;
        }

      }
      return true;
    },
    moveExercise(index, offset){
      if(this.currentSeries.exercises.length <= index + offset ||  index + offset < 0){
        return;
      }
      let auxi =  this.currentSeries.exercises[index];
      let auxi2 = this.currentSeries.exercises[index + offset];

      this.currentSeries.exercises.splice(index + offset,1 ,auxi)
      this.currentSeries.exercises.splice(index,1 ,auxi2)
    },
    async addExercise(id) {
      const exercise = await this.exerciseStore.get(new Exercise(id))

      for(const exerciseKey in this.currentSeries.exercises){
        if(this.currentSeries.exercises[exerciseKey].exercise_id === exercise.id){
          this.handleError("This cycle already contains that exercise");
          return;
        }
      }
      this.routine.cycles[this.index].add_exercise(new CompleteExercise(exercise.id, exercise.name, exercise.detail, exercise.type));
    },
    addCycle() {
      this.counter += 1;
      this.routine.cycles.splice(this.routine.cycles.length -1,0,
        new CompleteCycle("Cycle " + this.counter, "","exercise"));
    },
    removeCycle(index){
      if(this.routine.cycles.length > 1) {

        if(index === this.routine.cycles.length - 1)
          this.updateSeries(index - 1);
        else
          this.updateSeries(index + 1);

        this.routine.cycles.splice(index, 1);
      }
    },
    immortalCycles(name){
      return name === "Warmup" || name === "Cooldown" || name === "Cycle 1";
    },
    removeExercise(index){
      this.routine.cycles[this.index].remove_exercise(index);
    },
    async finish() {
      if(this.checkValidCyclesAndExercises()){
        const favorited = await FavouriteApi.checkFavourite(this.routine.routine_id);

        try{
          await CompleteRoutineApi.deleteCompleteRoutine(this.oldVersion);
        }
        catch(e){
          console.log(e)
          return;
        }
        await CompleteRoutineApi.createCompleteRoutine(this.routine);

        if(favorited){
          await FavouriteApi.markAsFavourite(this.routine.routine_id);
        }

        this.mode = 1;
        await this.$router.push({ name: "My Routines" })
      }
    },
  },

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
  zoom: 90%;
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
  width: 12%;
}
.text-field {
  padding: 0;
  margin-left: 5px;
  margin-right: 3px;
}

/* routine overview */
.select_it{
  width: 175px;
}
.bottom-area{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
}
.overview{
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.error-tag{
  position: fixed;
  bottom: 30px;
  right: 33%;
  width: 400px;
}

</style>