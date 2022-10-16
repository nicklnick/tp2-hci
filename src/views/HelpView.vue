<template>
  <div  class="total-height">
    <div class="top-height">
      <TopBar></TopBar>
    </div>

    <div class="bottom-heigh d-flex  width">
      <div class="w2" >
        <SideMenu></SideMenu>
      </div>
      <div class="content">
      <div class="header">
        <v-btn fab color="tertiary" @click="goBack">
          <img width="30" height="30" src="../assets/icons/chevron-left.svg" alt="left">
        </v-btn>
        <h1 class="text">Help</h1>
      </div>
      <div class="general-area width ">
        <v-card color="quaternary" rounded class="help ">
          <div class="text-area py-3">
            <h1 class="my-2">FAQ</h1>
            <h2>How do I create an exercise?</h2>
            <v-divider></v-divider>
            <h3>1) Click on the "Exercises" tab. There you will be presented with your exercises.</h3>
            <h3>2) Click on the + sign on the bottom right of the creation tool.</h3>
            <h3>3) Choose a name, a description and the what type of exercise it is.</h3>

            <h2 class="pt-4">How do I create a routine?</h2>
            <v-divider></v-divider>
            <h3>1) Before you can begin, you must create a few exercises so as to put them in your routines.
              You can do so by clicking on the "Exercises" tab in the sidebar.</h3>
            <h3>2) Once you've created a few exercises, you can now begin creating your routine. You can do so by
              clicking on the "Routines" tab of the sidebar.</h3>
            <h3>3) There, you will have to choose a name, give it a description, choose the general muscle group
              you will be targeting and finally choosing a difficulty.</h3>
            <h3>4) Having done that, you will be presented with the routine creation tool. On the top bar, you can
              see the different cycles your routine has. You can add one by clicking the + sign on the top right.
              On the right hand side, you will see the exercises you created. By clicking on the tick icon, you
              can add directly to the selected cycle. Keep in mind that within a cycle, an exercise can only appear once.</h3>
            <h3>5) Both cycles and exercises can be repeated by changing the repeat field. Additionally, exercises must
            either have a number of repetitions or a duration (in seconds)</h3>
          </div>
        </v-card>
      </div>
      </div>
    </div>
  </div>

</template>

<script>
import SideMenu from "@/components/Navigation/SideMenu";
import TopBar from "@/components/Navigation/TopBar";
import { useSecurityStore } from "@/stores/SecurityStore";

export default {
  name: 'HelpView',
  components: {
    SideMenu,
    TopBar
  },
  methods: {
    goBack() {
      window.history.back()
    }
  },
  async mounted() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    await securityStore.checkApiOnline();

    if (securityStore.online === false) {
      await this.$router.push({ name: "Error" });
    }
    if (securityStore.isLoggedIn === false) {
      await this.$router.push({ name: "Login" });
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
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 100%;
  zoom: 80%;
}
.content {
  height: 100%;
  width: 100%;
}

.header {
  display: flex;
  width: 30%;
  height: 15%;
  margin-top: 3%;
  justify-content: space-evenly;
}
.text {
  font-size: 3rem;
}
.text-area{
  width: 95%;
}

.help {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>