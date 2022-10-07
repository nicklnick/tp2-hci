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



        <!-- Overview -->
        <div class="space-between-col total-height py-10">
          <div class="space-between-row width">
              <v-btn fab color="tertiary">
                <v-icon>chevron-left</v-icon>
              </v-btn>
              <h1>Create Routine</h1>
            <v-card></v-card>

          </div>


          <!-- Routine details-->
          <CreateRoutineDetails v-if="mode===0"></CreateRoutineDetails>
          <div v-if="mode===0" class="row-end">
            <v-btn @click="changeMode" fab color="primary">
              <v-icon>chevron-right</v-icon>
            </v-btn>
          </div>


          <!-- Routine overview -->
          <CreateRoutineOverview v-if="mode===1"></CreateRoutineOverview>
          <div v-if="mode===1" class="space-between-row width ">
            <v-btn @click="changeMode" fab color="primary">
              <v-icon>chevron-left</v-icon>
            </v-btn>

            <v-btn   color="primary">finish</v-btn>
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

export default {
  name: "CreateRoutineView",
  components: {
    CreateRoutineDetails,
    CreateRoutineOverview,

    SideMenu,
    TopBar
  },
  data: () => ({
    mode: 1,

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