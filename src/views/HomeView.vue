<template>
  <div  class="total-height">
    <div class="top-height">
      <TopBar></TopBar>
    </div>
    <div class="bottom-heigh d-flex  width">
      <div class="w2" >
        <SideMenu></SideMenu>
      </div>
      <div class="general-area width ">
        <div class="width row-center mt-1">

          <router-link link to="/create-routine">
            <BigButton button_text="Create Routine"/>
          </router-link>
          <div class="px-7"></div>
          <router-link link to="/exercises">
            <BigButton button_text="Manage Exercises"/>
          </router-link>
        </div>
          <div class="text">
            <h1>By Category</h1>
            <v-spacer/>
            <router-link to="/allroutines" >View All Routines</router-link>
          </div>
          <MuscleCarousel/>

        <div class="text">
          <h1>Favourite Routines</h1>
        </div>
        <RoutineCarrousel></RoutineCarrousel>


      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { useSecurityStore } from "@/stores/SecurityStore";
import RoutineCarrousel from "@/components/Routines/RoutineCarrousel";

import SideMenu from "@/components/Navigation/SideMenu";
import TopBar from "@/components/Navigation/TopBar";
import MuscleCarousel from "@/components/MuscleCarousel";
import BigButton from "@/components/CommonComponents/BigButton";
import { mapState } from "pinia";
import { RoutineApi } from "@/api/routine";

export default {
  name: 'HomeView',
  components: {
    RoutineCarrousel,
    BigButton,
    MuscleCarousel,
    SideMenu,
    TopBar
  },
  computed: {
    ...mapState(useSecurityStore, {
      $user: 'user'
    })},
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
      this.myRoutines = await RoutineApi.getAllUserRoutines(this.$user.id);
    }
  },
  data() {
    return {
      myRoutines: null
    }
  }
}
</script>

<style scoped>
.total-height{
  height: 100%;
}
.top-height{
  height: 10%;
}
.bottom-heigh{
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
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  zoom: 70%;
}
.text {
  width: 90%;
  display: flex;
  justify-content: start;
}

</style>
