<template>
  <div class="screen">
    <div class="pt-10 body">
      <div class="pt-10 Header">
        <h1 class="text">Welcome to Fitness First</h1>
      </div>
      <div class="Subtext">
        <h2 class="text2 ml-6">A place where you can get workout routines made for you or make your own!</h2>
      </div>
    </div>
    <div>
      <h3>Get Routines Now!</h3>
<!--      <v-btn class="button black&#45;&#45;text" color="primary" rounded>Enter as a Guest</v-btn>-->
      <div class="row-center">
        <router-link to="/login" tag="button">
          <v-btn class="button black--text" color="quaternary" rounded>LogIn</v-btn>
        </router-link>
        <router-link to="/signup" tag="button">
          <v-btn class="button black--text" color="primary" rounded>Sign Up</v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LandingView',
}

</script>

<style scoped>
.screen {
  height: 100%;
  width: 100%;
}
.button {
  width: auto;
  margin: 10px;
  border: thick;
}

.text {
  font-size: 4rem;
}

.text2 {
  font-size: 2.5rem;
}

.body {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  height: 60%;
  width: 100%;

}

.Subtext {
  width: 70%;
}

.Header {
  width: 65%;
}

</style>
