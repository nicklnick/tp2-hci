<template>
  <div  class="total-height">
    <div class="top-height">
      <TopBar></TopBar>
    </div>


    <div class="bottom-heigh d-flex  width">
      <div class="w2" >
        <SideMenu></SideMenu>
      </div>
      <div  class=" general-area width ">
        <router-link class="my-10 " link to="/create-routine">
          <BigButton button_text="Create Routine"/>
        </router-link>
        <div class="pt-10 text flex-column">
          <div class="width">
            <h1 class="pb-10">Your Routines</h1>
          </div>
          <div v-if="myRoutines===null || myRoutines.length === 0">
            <h2>Routines that you created will appear here!</h2>
          </div>
          <div v-else class="width">
            <PaginationGrid  :routine-array="myRoutines"/>
          </div>
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

import { useSecurityStore } from "@/stores/SecurityStore";
import { mapActions, mapState } from "pinia";
import { RoutineApi } from "@/api/routine";
import PaginationGrid from "@/components/Navigation/PaginationGrid";

export default {
  name: 'HomeView',
  components: {
    PaginationGrid,
    BigButton,
    SideMenu,
    TopBar,
  },
  data() {
    return {
      myRoutines: null,
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn',
      $online: 'online',
      $user: 'user'
    }),
    ...mapActions(useSecurityStore, {
      $checkApiOnline: 'checkApiOnline',
    }),
  },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();

    await this.$checkApiOnline;

    if(!this.$online){
      await this.$router.push({ name: "Error" });
    }
    if(!this.$isLoggedIn){   // TODO: !!!! check !!!!
      await this.$router.push({ name: "Home" });
    }
    this.myRoutines = await RoutineApi.getAllUserRoutines(this.$user.id);
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
  justify-content: start;
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
