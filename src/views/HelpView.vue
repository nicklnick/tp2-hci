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
        <h1 class="text">Help</h1>
      </div>
      <div class="general-area width ">
        <div class="help">
          <h2>We don't really know how to help. ¯\_(ツ)_/¯</h2>
          <h2>This is awkward</h2>
        </div>
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
  height: 50%;
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

.help {
  width: 50%;
}

</style>