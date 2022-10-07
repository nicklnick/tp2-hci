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

          <!-- CONTENT GOES HERE -->


        </div>
      </div>


    </div>
</template>

<script>


import TopBar from "@/components/Navigation/TopBar";
import SideMenu from "@/components/Navigation/SideMenu";

export default {
  name: "TestView",
  components: {

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
  justify-content: center;
  align-items: center;
}


</style>