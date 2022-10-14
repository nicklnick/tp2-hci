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
          <h1 class="PageTitle">Favourites</h1>
        </div>
        <!-- CONTENT GOES HERE -->
        <v-row class="width">
          <v-col cols="3" v-for="(favRoutine, index) in favouriteRoutines" :key="index">
              <RoutineButton :routine_author="favRoutine.user.username"
                             :routine_name="favRoutine.name"
                             :routine_difficulty="favRoutine.difficulty"
                             :routine_stars="favRoutine.score"
                             :routine_id="favRoutine.id"
                             :routine_category="favRoutine.category?.name"
              ></RoutineButton>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>

</template>

<script>
import SideMenu from "@/components/Navigation/SideMenu";
import TopBar from "@/components/Navigation/TopBar";
import RoutineButton from "@/components/Routines/RoutineButton";
import {FavouriteApi} from "@/api/favourites.js";
import {mapActions, mapState} from "pinia";
import { useSecurityStore } from "@/stores/SecurityStore";

export default {
  name: 'FavouriteView',
  components: {
    SideMenu,
    TopBar,
    RoutineButton,
  },
  data() {
    return {
      favouriteRoutines: null
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn',
      $online: 'online'
    }),
    ...mapActions(useSecurityStore, {
      $checkApiOnline: 'checkApiOnline'
    }),
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
    this.favouriteRoutines = await FavouriteApi.getFavourites();
    this.favouriteRoutines = this.favouriteRoutines.content;
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


.flex-container {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 30%;
}

.PageTitle {
  font-size: 3rem;
}


</style>