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
        <div class="width row-center">

          <router-link link to="/create-routine">
            <BigButton button_text="Create Routine"/>
          </router-link>
          <div class="px-7"></div>
          <router-link link to="/exercises">

            <BigButton button_text="Manage Exercises"/>
          </router-link>
        </div>
          <div class="text">
            <h1>Search Routines by Category</h1>
          </div>
          <MuscleCarousel/>
        <!-- CONTENT GOES HERE -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { useSecurityStore } from "@/stores/SecurityStore";

import SideMenu from "@/components/Navigation/SideMenu";
import TopBar from "@/components/Navigation/TopBar";
import MuscleCarousel from "@/components/MuscleCarousel";
import BigButton from "@/components/BigButton";
import { mapActions, mapState } from "pinia";
export default {
  name: 'HomeView',
  components: {
    BigButton,
    MuscleCarousel,
    SideMenu,
    TopBar
  },
  computed: {
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn',
      $online: 'online'
    })},
  ...mapActions(useSecurityStore, {
    $checkApiOnline: 'checkApiOnline'
  }),
  watch: {

  },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();

    await this.$checkApiOnline;

    if(!this.$online){
      console.log("redirecting")
      await this.$router.push({ name: "Error" });
    }
    if(this.$isLoggedIn === false){   // TODO: !!!! check !!!!
      await this.$router.push({name: "Login"});
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
  zoom: 80%;
}
.text {
  width: 90%;
  display: flex;
  justify-content: start;
}

</style>
