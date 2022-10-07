<template>
  <div  class="total-height">
    <div class="top-height">
      <TopBar></TopBar>
    </div>

    <div class="bottom-height d-flex  width">
      <div class="w2" >
        <SideMenu></SideMenu>
      </div>
      <div class="general-area width">
        <div class="flex-container">
          <div>
            <IconUser></IconUser>
          </div>
          <div class="mt-3">
            <p class="font-weight-bold">Username</p>
          </div>
          <div class="info-fields">
            <InfoUser class="ma-2"></InfoUser>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/Navigation/TopBar";
import SideMenu from "@/components/Navigation/SideMenu";
import InfoUser from "@/components/UserProfile/InfoUser";
import IconUser from "@/components/UserProfile/IconUser";

export default {
  name: "UserProfileView",
  components: {
    TopBar,
    SideMenu,
    InfoUser,
    IconUser
  }
}
</script>

<style scoped>

.total-height {
  height: 100%;
}

.top-height {
  height: 10%;
}

.bottom-height {
  height: 90%;
}

.width {
  width: 100%;
}

.w2 {
  width: 15%;
}

.general-area{               /* !!!! COMMON !!!! */
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-fields {
  width: 170%;
}

.flex-container {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>