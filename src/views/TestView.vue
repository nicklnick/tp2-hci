<template>
    <div  class="total-height">
      <div class="top-height">
        <TopBar></TopBar>
      </div>


      <div class="bottom-height d-flex  width">
        <div class="w2" >
          <SideMenu></SideMenu>
        </div>
        <div class="general-area width ">

          <OverviewRoutineView routine_id="14"></OverviewRoutineView>


        </div>
      </div>


    </div>
</template>

<script>


import TopBar from "@/components/Navigation/TopBar";
import SideMenu from "@/components/Navigation/SideMenu";
import OverviewRoutineView from "@/views/OverviewRoutineView";

export default {
  name: "TestView",
  components: {
    OverviewRoutineView,

    SideMenu,
    TopBar
},
};
</script>

<style scoped>
.total-height{
  height: 100%;
}
.top-height{
  height: 10%;
}
.bottom-height{
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
  justify-content: center;
  align-items: center;
}


</style>