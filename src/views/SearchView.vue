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
        <div class="flex-container">
          <div class="content">
            <h1 class="PageTitle">Search Result:</h1>
          </div>
          <div class="content2">
            <h1 class="PageTitle">{{$route.params.input}}</h1>
          </div>
        </div>
        <!-- CONTENT GOES HERE -->
        <div v-for="(routine, index) in routines" :key="index">
          <div v-if="routine.name===$route.params.input && routine.isPublic===true" class="columns">
            <RoutineButton :routine_author="routine.user.username" :routine_name="routine.name" :routine_difficulty="routine.difficulty" :routine_stars="routine.score"></RoutineButton>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import SideMenu from "@/components/Navigation/SideMenu";
import TopBar from "@/components/Navigation/TopBar";
import RoutineButton from "@/components/Routines/RoutineButton";
import {RoutineApi} from "@/api/routine";
import {mapActions, mapState} from "pinia";
import { useSecurityStore } from "@/stores/SecurityStore";


export default {
  name:"SearchView",
  components: {
    SideMenu,
    TopBar,
    RoutineButton
  },
  data() {
    return{
      routines: null
    }
  },

  computed: {
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn',
      $online: 'online'
    }),
    ...mapActions(useSecurityStore, {
    $checkApiOnline: 'checkApiOnline'
  })
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
    this.routines = await RoutineApi.getAll()
    this.routines = this.routines.content
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

.content {
  margin-top: 3%;
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
}

.content2 {
  width: 70%;
  display: flex;
  justify-content: start;
  align-items: end;
}

.flex-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: start;
}

.PageTitle {
  font-size: 3rem;
}

.content {
  width: 40%;
}
.Grid {
  display: flex;
  justify-content: space-evenly;
}
</style>