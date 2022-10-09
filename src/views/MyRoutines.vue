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
          <h1>Search Routines by Category</h1>
        </div>
        <div>
          <RoutineButton></RoutineButton>
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
import RoutineButton from "@/components/Routines/RoutineButton";
import BigButton from "@/components/BigButton";
export default {
  name: 'HomeView',
  components: {
    BigButton,
    RoutineButton,
    SideMenu,
    TopBar
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
