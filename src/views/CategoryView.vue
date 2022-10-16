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
          <router-link to="/home" tag="button">
          <v-btn
          color="secondary"
          >
            Go Back
          </v-btn>
          </router-link>

        <h1 class="text">{{ muscle.name }}</h1>
        </div>
        <!-- CONTENT GOES HERE -->
        <div class="width">
          <PaginationGrid  :routine-array="routines"/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import store from "@/store/MuscleGroups"
import SideMenu from "@/components/Navigation/SideMenu";
import TopBar from "@/components/Navigation/TopBar";
import {RoutineApi} from "@/api/routine";
import PaginationGrid from "@/components/Navigation/PaginationGrid";
import { useSecurityStore } from "@/stores/SecurityStore";

export default {
  name:"CategoryView",
  components: {
    SideMenu,
    TopBar,
    PaginationGrid
  },
  data(){
    return {
      routines: null
    }
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  computed: {
    muscle() {
      return store.muscles.find(
        (muscles) => muscles.slug === this.slug
      );
    },
  },
  methods: {
    async filteredCategory(CategoryID) {
      const resp = []
      let auxi = await RoutineApi.getAll()
      for( const key in auxi){
        if( parseInt(auxi[key].category.id) === parseInt(CategoryID) && auxi[key].isPublic === true)
          resp.push(auxi[key])
      }
      return resp
    }
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
      this.routines = await this.filteredCategory(this.muscle.id)
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