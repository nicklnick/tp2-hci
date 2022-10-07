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
        <h1>{{muscles.name}}</h1>
        <!-- CONTENT GOES HERE -->
      </div>
    </div>
  </div>
</template>


<script>
import store from "@/store/MuscleGroups"
import SideMenu from "@/components/Navigation/SideMenu";
import TopBar from "@/components/Navigation/TopBar";
export default {
  name:"CategoryView",
  components: {
    SideMenu,
    TopBar
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  computed: {
    muscles() {
      return store.muscles.find(
        (muscles) => muscles.slug === this.slug
      );
    },
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
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  zoom: 80%;
}

</style>