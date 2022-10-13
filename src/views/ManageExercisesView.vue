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

        <!-- CONTENT GOES HERE -->
        <CustomCard card-title="Your Exercises" card-height="600" card-width="1000" >
          <div class="cheight cwidth row-center ">
            <div  class="cheight general-area-width overflow-auto">


              <!-- Create new exercise -->
              <v-card elevation="20" class="general-area new-activity" v-if="mode !== 0" color="quaternary" >
                <div class="space-between-col new-exercise-box  general-area-height">

                  <h2>New exercise</h2>
                  <v-spacer></v-spacer>
                  <v-divider class="py-3"></v-divider>

                  <v-text-field rounded outlined color="secondary"
                                background-color="tertiary" label="Exercise name"
                                class="py-2" :rules="titleRules" v-model="newActivityTitle"
                  ></v-text-field>
                  <v-text-field rounded outlined color="secondary"
                                background-color="tertiary" label="Exercise details"
                                class="py-2" :rules="titleRules" v-model="newActivityDetails"
                  ></v-text-field>


                  <div class="space-between-row">
                    <p>Type</p>
                    <v-radio-group v-model="newActivityType" row>
                      <v-radio value="exercise" label="Exercise"></v-radio>
                      <v-radio value="rest" label="Rest"></v-radio>
                    </v-radio-group>
                  </div>


                  <div class="row-end">
                    <span class="error-msg">{{errorMessage}}</span>
                    <v-spacer></v-spacer>
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


              <v-row class="py-4 exercise-row-width">
                <v-col cols="4" v-for="(exercise, index) in $items" :key="index">
                  <div class="columns">
                    <div class="exercise-card-width">

                      <ExerciseCard  v-if="exercise.id !== editing"
                                    :exer_name="exercise.name" :exer_detail="exercise.detail"
                                    :exer_type="exercise.type" editable="true"
                                    @removeExercise="removeSport(exercise)" @editExercise="setEditingMode(exercise)"
                      />
                    </div>
                  </div>
                </v-col>
              </v-row>



            </div>
          </div>


          <v-btn class="mb-10" fab absolute right bottom color="secondary"
                 @click="setCreationMode">
            <v-icon>mdi-plus</v-icon>
          </v-btn>

        </CustomCard>

      </div>
    </div>

  </div>
</template>

<script>


import TopBar from "@/components/Navigation/TopBar";
import SideMenu from "@/components/Navigation/SideMenu";
import CustomCard from "@/components/CommonComponents/CustomCard";

import { mapActions, mapState } from "pinia";

import { useSecurityStore } from "@/stores/SecurityStore";
import { useExerciseStore } from "@/stores/ExerciseStore";
import { Exercise } from "@/api/exercise";
import ExerciseCard from "@/components/Exercise/ExerciseCard";



export default {
  name: "ManageExercisesView",
  components: {
    ExerciseCard,
    CustomCard,

    SideMenu,
    TopBar
  },
  data: () => ({
    mode: 0,        // 0: normal mode, 1: creation mode, 2: editing mode
    activities: [ ],
    newActivityTitle: "",
    newActivityDetails: "",
    newActivityType: "exercise",

    errorMessage: null,
    editingId: null,

    sportStore: null,

    titleRules: [
      value => !!value || 'Required',
    ],
  }),
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
    editing(){
      return this.editingId;
    }
  },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();

    await this.$checkApiOnline;

    if(!this.$online){
      await this.$router.push({ name: "Error" });
    }
    if(this.$isLoggedIn === false){   // TODO: !!!! check !!!!
      await this.$router.push({name: "Login"});
    }

    this.exerciseStore = useExerciseStore();
    await this.exerciseStore.updateCache();
  },
  methods: {
    ...mapActions(useExerciseStore, {
      $createExercise: 'create',
      $modifyExercise: 'modify',
      $deleteExercise: 'delete',
      $updateCache: 'updateCache',
    }),
    setEditingMode(exercise){
      this.mode =  2;
      this.editingId = exercise.id;
      this.newActivityTitle = exercise.name;
      this.newActivityDetails = exercise.detail;
      this.newActivityType = exercise.type;
    },
    removeSport(exercise){
      this.$deleteExercise(exercise)
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
      this.newActivityDetails = "";
      this.newActivityType = "exercise";
      this.editingId = null;
      this.errorMessage = null;
    },
    checkNewActivity(){
      if(this.newActivityTitle === "" || this.newActivityDetails === "")
        return false;
      return true;
    },
    errorHandling(result){
      switch(result.code ){
        case 4:
          this.errorMessage = result.description
          break;
        case 2:
          if(result.details[0].localeCompare("\"UNIQUE constraint failed: Sport.name\""))
            this.errorMessage = "Exercise name already exists"
        }
      },
    async checkAndDismiss(){
      if(this.checkNewActivity()){
        try{
          if(this.mode ===1){
            await this.$createExercise(new Exercise(null, this.newActivityTitle, this.newActivityDetails, this.newActivityType))
          }
          else{
            await this.$modifyExercise(new Exercise(this.editingId, this.newActivityTitle, this.newActivityDetails, this.newActivityType));
          }
        }
        catch (e) {
            this.errorHandling(e)
            return;
        }
        this.stopCreationMode();
      }
    }
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
  zoom:90%;
}
.cwidth {
  width: 1000px;
}
.cheight {
  height: 540px;
}
.general-area-height {                /* !!!! COMMON !!!! */
  height: 90%;
}
.new-activity{
  margin-bottom: 20px;
  margin-top: 20px;
}
.general-area-width {                /* !!!! COMMON !!!! */
  width: 90%;
}
.exercise-row-width{
  width: 99%;
}
.exercise-card-width{
  width: 275px;
}
.new-exercise-box{
  width: 60%;
}


</style>