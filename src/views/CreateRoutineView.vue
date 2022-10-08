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


          <!-- Routine details-->
          <div v-if="mode===0" class="row-center width">
            <CreateRoutineDetails class="pr-7"></CreateRoutineDetails>
            <SelectExercise ></SelectExercise>
          </div>

          <div v-if="mode===0" class="row-end px-10">
            <v-btn @click="changeMode" fab color="primary">
              <v-icon>chevron-right</v-icon>
            </v-btn>
          </div>


          <!-- Routine overview -->
          <div class="row-evenly width">
            <CreateRoutineOverview v-if="mode===1"></CreateRoutineOverview>
          </div>


          <div v-if="mode===1" class="space-between-row width px-10">
            <v-btn @click="changeMode" fab color="primary">
              <v-icon>chevron-left</v-icon>
            </v-btn>

            <v-btn  class="align-self-center" color=" primary">finish</v-btn>
          </div>

        </div>

        <!-- CONTENT GOES HERE -->


      </div>
    </div>


  </div>
</template>

<script>


import TopBar from "@/components/Navigation/TopBar";
import SideMenu from "@/components/Navigation/SideMenu";
import CreateRoutineOverview from "@/components/Routines/CreateRoutineOverview";
import CreateRoutineDetails from "@/components/Routines/CreateRoutineDetails";
import SelectExercise from "@/components/Routines/SelectExercise";

export default {
  name: "CreateRoutineView",
  components: {
    SelectExercise,
    CreateRoutineDetails,
    CreateRoutineOverview,

    SideMenu,
    TopBar
  },
  data: () => ({
    mode: 0,

  }),
  methods: {
    changeMode() {
      this.mode = this.mode===1 ? 0 : 1;
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
  zoom: 85%;
}




</style>