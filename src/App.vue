<template>
  <div id="app">
    <v-app>
      <router-view/>
    </v-app>

  </div>
</template>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('~@/assets/Background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.space-between-col{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.space-between-row{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.row-start {
  display: flex;
  flex-direction: row;
}
.space-evenly-row{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.space-evenly-col{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.col-start{
  display: flex;
  flex-direction: column;
  align-items: start;
}
.row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.row-end {
  display: flex;
  flex-direction: row;
  justify-content: end;
}
.center-row-col{
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-link{
  text-decoration: none;
}
.row-evenly{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.error-msg{
  color: red;
}

// scrollbar
body::-webkit-scrollbar {
  width: 12px
}

body::-webkit-scrollbar-track {
  background: #14C38E;        /* color of the tracking area */
}

body::-webkit-scrollbar-thumb {
  background-color: #b8f1b0;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid #14C38E;  /* creates padding around scroll thumb */
}


div::-webkit-scrollbar {
  width: 12px;
}

div::-webkit-scrollbar-track {
  background: #E3FCBF;        /* color of the tracking area */
}

div::-webkit-scrollbar-thumb {
  background-color: #B8F1B0;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid #14C38E;  /* creates padding around scroll thumb */
}


</style>
<script>

export default {
  components: { },
  methods:{
    async offlineHandle() {
      await this.$router.push({ name: "Offline" });
    }
  },
  created() {
    window.addEventListener('offline',this.offlineHandle)
  }
}
</script>