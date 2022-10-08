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


</style>
<script>

export default {
  components: { }
}
</script>