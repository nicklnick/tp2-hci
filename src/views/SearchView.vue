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
        <div class="pt-4 flex-container">
          <div class="content">
            <h1 class="PageTitle">Search Result:</h1>
          </div>
          <div class="content2">
            <h1 class="PageTitle">{{$route.params.input}}</h1>
          </div>
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
import { useSecurityStore } from "@/stores/SecurityStore";
import PaginationGrid from "@/components/Routines/PaginationGrid";


export default {
  name:"SearchView",
  components: {
    PaginationGrid,
    SideMenu,
    TopBar,
  },
  data() {
    return{
      pathInput: this.$route.params.input,
      routines: null
    }
  },
  watch: {
      "$route.params.input"() {
        this.refresh()
      }
  },
  computed: {
  },
  methods: {
    async filteredSearch() {
      const resp = []
      let auxi = await RoutineApi.getAll()
      for (const key in auxi){
        if( auxi[key].name === this.$route.params.input && auxi[key].isPublic === true)
          resp.push(auxi[key])
      }
      return resp
    },
    async refresh(){
      this.routines = await this.filteredSearch()
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
      this.routines = await this.filteredSearch()
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

.content {
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
  margin-top: 15px;
  margin-bottom: 15px;
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