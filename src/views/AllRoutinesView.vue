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
        <div class="header">
            <v-btn fab color="tertiary" @click="goBack">
              <img width="30" height="30" src="../assets/icons/chevron-left.svg" alt="left">
            </v-btn>

          <h1 class="text">All Routines</h1>
        </div>
        <!-- CONTENT GOES HERE -->
        <div class="pt-15 pl-5 width" v-if="routines != null && routines.length > 0">
          <PaginationGrid  :routine-array="routines"/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import SideMenu from "@/components/Navigation/SideMenu";
import TopBar from "@/components/Navigation/TopBar";
import {RoutineApi} from "@/api/routine";
import PaginationGrid from "@/components/Routines/PaginationGrid";
import { useSecurityStore } from "@/stores/SecurityStore";

export default {
  name:"AllRoutinesView",
  components: {
    SideMenu,
    TopBar,
    PaginationGrid
  },
  data() {
    return {
      routines: null
    }
  },
  computed: {
  },
  methods: {
    goBack() {
      window.history.back()
    }
  },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    await securityStore.checkApiOnline();

    if(securityStore.online === false){
      await this.$router.push({ name: "Error" });
    }
    if(securityStore.isLoggedIn === false){
      await this.$router.push({ name: "Login" });
    }
    else {
      this.routines = await RoutineApi.getAll();
    }
  },
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
  align-items: start;
  height: 100%;
  zoom: 80%;
}
.header {
  display: flex;
  width: 30%;
  margin-top: 3%;
  justify-content: space-evenly;
}
.text{
  font-size: 3rem;
}

</style>