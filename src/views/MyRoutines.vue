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
        <router-link link to="/create-routine">

          <BigButton button_text="Create Routine"/>
        </router-link>
        <div class="text">
          <h1>Your Routines</h1>
          <v-card class="routine-box" :v-if="routine.userId === $user.id -1" v-for="(routine, index) in $items" :key="index">
            <p>Name: {{routine.name}}</p>
            <p>Is public: {{routine.isPublic}}</p>
            <p>Difficulty: {{routine.difficulty}}</p>
          </v-card>
        </div>
        <div>

        </div>
        <!-- CONTENT GOES HERE -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import SideMenu from "@/components/Navigation/SideMenu";
import TopBar from "@/components/Navigation/TopBar";
import BigButton from "@/components/BigButton";

import { useRoutineStore } from "@/stores/RoutineStore";
import { useSecurityStore } from "@/stores/SecurityStore";
import { mapActions, mapState } from "pinia";

export default {
  name: 'HomeView',
  components: {
    BigButton,
    SideMenu,
    TopBar
  },
  computed: {
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn',
      $online: 'online',
      $user: 'user'
    }),
    ...mapActions(useSecurityStore, {
      $checkApiOnline: 'checkApiOnline',
      $getCurrentUser: 'getCurrentUser'
    }),
    ...mapState(useRoutineStore,{
      $items: 'items',
    }),
  },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();

    await this.$checkApiOnline;

    if(!this.$online){
      console.log("error, redirecting")
      await this.$router.push({ name: "Error" });
    }
    if(!this.$isLoggedIn){   // TODO: !!!! check !!!!
      await this.$router.push({ name: "Home" });
    }
    await this.$getCurrentUser();

    this.routineStore = useRoutineStore();
    await this.routineStore.updateCache();
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

.routine-box{
  width: 250px;
  height: 250px;
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
