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
      </div>
    </div>
  </div>
</template>


<script>
import SideMenu from "@/components/Navigation/SideMenu";
import TopBar from "@/components/Navigation/TopBar";
export default {
  name:"SearchView",
  components: {
    SideMenu,
    TopBar
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
</style>