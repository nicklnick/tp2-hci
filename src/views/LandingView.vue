<template>
  <div class="screen">
    <div class="d-flex justify-end">
      <v-btn class="button black--text" color="quaternary" rounded>LogIn</v-btn>
      <v-btn class="button black--text" color="primary" rounded>Sign Up</v-btn>
    </div>
    <div class="body">
      <h1 class="text ml-6">Welcome to Fitness First</h1>
      <h2 class="ml-6">A place where you can get workout routines made for you or make your own!</h2>
    </div>
    <div>
      <h3>Get Routines Now!</h3>
      <v-btn class="button black--text" color="primary" rounded>Enter as a Guest</v-btn>
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
}
.button {
  width: auto;
  margin: 10px;
  border: thick;
}

.text {

}

.body {
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 60%;
}

</style>
