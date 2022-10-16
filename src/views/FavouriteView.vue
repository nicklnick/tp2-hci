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
            <h1 class="pb-10">Favorite Routines</h1>
          </div>
        <!-- CONTENT GOES HERE -->
        <div v-if="favouriteRoutines === null || favouriteRoutines.length === 0" class="flex-container">
          <h2>Looks like you haven't liked any routines. I'm sure you'll find one you enjoy! ʕ•ᴥ•ʔ</h2>
        </div>
        <div v-else class="width">
          <PaginationGrid  :routine-array="favouriteRoutines"/>
        </div>
        </div>
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
import { mapState } from "pinia";
import { FavouriteApi } from "@/api/favourites";
import PaginationGrid from "@/components/Navigation/PaginationGrid";

export default {
  name: 'HomeView',
  components: {
    BigButton,
    SideMenu,
    TopBar,
    PaginationGrid
  },
  data() {
    return {
      favouriteRoutines: null
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $user: 'user'
    }),
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
    else {
      this.favouriteRoutines = await FavouriteApi.getFavourites();
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
