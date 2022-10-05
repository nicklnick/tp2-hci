<template>
  <div class="home">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div>
      <top-bar></top-bar>
    </div>
    <div class="prueba">
      <side-menu></side-menu>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import topBar from "@/components/TopBar";
import sideMenu from "@/components/sideMenu";

export default {
  name: 'HomeView',
  components: {
    topBar,
    sideMenu,
  }
}
</script>

<style>
.home {
  height: 100%;
}

.prueba {
  height: 88.5%;
}
</style>
