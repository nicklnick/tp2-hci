<template>
  <div  class="total-height">
    <div class="top-height">
      <TopBar></TopBar>
    </div>

    <div class="bottom-height d-flex  width">
      <div class="w2">
        <SideMenu></SideMenu>
      </div>
      <div class="general-area width">

        <!-- start -->
        <div class="space-between-col total-height py-10 width">

          <!-- General -->
          <div class="space-between-row px-10">
              <v-btn fab color="tertiary" @click="goBack()">
                <img width="30" height="30" src="@/assets/icons/chevron-left.svg" alt="left">
              </v-btn>
            <div class="justify-self-center title_text">
              <!-- conditional rendering -->
              <h1>{{this.routine.routine_name}}</h1>
            </div>
            <v-card></v-card>
          </div>
          <!-- /General -->


          <!-- Overview -->
            <div  class="row-center width">
              <div class="pr-7 cwidth row-start">
                <v-card id="main-panel" class="cwidth cheight rounded-xl" color="quaternary" raised>
                  <div class="cheight space-between-col">

                    <div>
                      <v-card class="cwidth rounded-b-0 rounded-t-xl row-start" color="secondary">
                        <v-tabs class="tab-size-width rounded-tl-xl" background-color="secondary" show-arrows
                                v-model="tab">
                          <v-tabs-slider color="tertiary"></v-tabs-slider>
                          <v-tab v-for="(cycle, index) in this.routine.cycles" :key="index">
                            <div class="flex-row justify-space-between">
                              {{cycle.cycle_name}}
                            </div>
                          </v-tab>
                        </v-tabs>
                      </v-card>
                    </div>

                    <!-- exercise card -->
                    <div class="row-center overflow-auto">
                      <div class="general-area-width general-area-height">
                        <ExerciseCard2 class="my-2 quaternary"
                                       v-for="(exercise, index) in this.routine.cycles[tab].exercises" :key="index"
                                       :exer_name="exercise.exercise_name"
                                       :exer_detail="exercise.exercise_detail"
                                       :exer_type="exercise.exercise_type"
                        >
                          <!-- exercise time and series -->
                          <div class="flex-container py-2 space-evenly-col pr-3">
                            <div v-if="exercise.exericse_duration > 0">
                              <v-text-field readonly v-model="exercise.exericse_duration" label="Time (s)"></v-text-field>
                            </div>
                            <div v-if="exercise.exercise_repetitions > 0">
                              <v-text-field readonly v-model="exercise.exercise_repetitions" label="Repetitions"></v-text-field>
                            </div>
                          </div>
                          <!-- /exercise time and series -->
                        </ExerciseCard2>
                      </div>
                    </div>
                    <!-- /exercise card -->

                    <!-- repeat text -->
                    <div class="row-center">
                      <div class="general-area-width">
                        <v-divider></v-divider>

                        <div class="row-start">
                          <p class="pl-3 pt-2 text-field text-color">Repeat {{this.routine.cycles[tab].cycle_repetitions}} times</p>
                        </div>

                        <v-spacer></v-spacer>
                      </div>
                    </div>
                  </div>
                </v-card>
              </div>
              <!-- /repeat text -->

              <!-- side panel (overview) -->
              <CustomCard card-width="400" card-height="550" card-title="Overview">
                <div class="general-area-height">
                  <div class="overflow-auto px-4 mt-2">
                  <v-textarea rounded outlined color="secondary"
                              readonly
                              background-color="tertiary" label="Description" no-resize
                              class="py-2" :value="this.routine.routine_detail"
                              ></v-textarea>
                  </div>

                  <div class="px-3">
                    <v-divider class="mb-2"></v-divider>
                    <div class="space-between-row">
                      <h4>Category</h4>
                      <v-chip-group>
                        <v-chip color="tertiary">
                          {{this.routine.routine_category.name?.toUpperCase()}}
                        </v-chip>
                      </v-chip-group>
                    </div>

                    <v-divider class="my-2"></v-divider>

                    <div class="space-between-row">
                      <div>
                        <h4>Difficulty: </h4>
                      </div>
                      <div>
                        <v-chip :color="difficulty_color" class="font-weight-bold">
                          {{this.routine.routine_difficulty.toUpperCase()}}
                        </v-chip>
                      </div>
                    </div>
                  </div>
                </div>
              </CustomCard>
              <!-- /side panel (overview) -->
            </div>
            <!-- General -->
            <div class="space-between-row width px-10">
              <v-spacer></v-spacer>
              <router-link v-if="isMyRoutine()" :to="`/routines/edit/${this.routine.routine_id}`">
                <v-btn fab x-large color="primary">
                  <v-icon>edit</v-icon>
                </v-btn>
              </router-link>

              <v-dialog v-if="isMyRoutine()" v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="ml-4" color="primary" dark v-bind="attrs" fab x-large v-on="on"><v-icon>delete</v-icon></v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5">Do you wish to delete the routine?</v-card-title>
                  <v-card-text>This action cannot be undone. Confirm deletion.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">Don't delete</v-btn>
                    <v-btn color="red" text @click="deleteRoutine()">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              </div>

            </div>
        <!-- -->

      </div>
    </div>


  </div>
</template>

<script>


import TopBar from "@/components/Navigation/TopBar";
import SideMenu from "@/components/Navigation/SideMenu";
import {useSecurityStore} from "@/stores/SecurityStore";
import {CompleteRoutine, CompleteRoutineApi} from "@/api/CompleteRoutineApi";
import ExerciseCard2 from "@/components/Exercise/ExerciseCard2";
import CustomCard from "@/components/CommonComponents/CustomCard";
import { mapState } from "pinia";

export default {
  name: "OverviewRoutineView",
  components: {
    CustomCard,
    ExerciseCard2,
    SideMenu,
    TopBar
  },
  data: () => {
    return {
      routine: new CompleteRoutine("", "", false, "", ""),
      tab: 0,
      isPublic: true,
      difficulty_color: null,

      confirm_delete: false,
      dialog: false,
    }
  },
  computed: {
    currentCycle() {
      if(this.routine.cycles.length > this.index)
        return this.routine.cycles[this.index];
      return this.routine.cycles[0];
    },
    ...mapState(useSecurityStore,{
      $user: 'user'
    })
  },
  methods: {
    getDifficultyColor() {
      if(this.routine.routine_difficulty === "rookie")
        this.difficulty_color = "blue lighten-4"
      else if(this.routine.routine_difficulty === "beginner")
        this.difficulty_color = "blue lighten-1"
      else if(this.routine.routine_difficulty === "intermediate")
        this.difficulty_color =  "yellow"
      else if(this.routine.routine_difficulty === "advanced")
        this.difficulty_color = "orange"
      else
        this.difficulty_color = "red"
    },
    isMyRoutine(){
      return this.routine.user?.id  === this.$user.id;
    },
    async deleteRoutine(){
      this.dialog = false;
      await CompleteRoutineApi.deleteCompleteRoutine(this.routine)
      await this.$router.push({ name: "My Routines" });
    },
    goBack() {
      window.history.back();
    }
  },
  async mounted() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    await securityStore.checkApiOnline();

    if(securityStore.online === false){
      await this.$router.push({ name: "Error" });
    }
    if(securityStore.isLoggedIn === false){
      await this.$router.push({ name: "Login" });
    }
    else{
      this.routine = await CompleteRoutineApi.getCompleteRoutine(this.$route.params.id);
      this.getDifficultyColor();
    }
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
  zoom: 82%;
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

.text-field {
  padding: 0;
  margin-left: 5px;
  margin-right: 3px;
}

/* routine overview */

.flex-container {
  display: flex;
  width: 200px;
}

.title_text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 50%;
}

.twidth {
  width: 90%;
}

.error-tag{
  position: fixed;
  bottom: 30px;
  right: 33%;
  width: 400px;
}

</style>
