<template>
  <div className="screen">
    <div>
      <h1>Uh Oh</h1>
      <h1>Our API is not working</h1>
      <h1>(._.) ( l: ) ( .-. ) ( :l ) (._.)</h1>
    </div>
    <router-link to="/home" tag="button">
      <v-btn color="secondary">Go Home</v-btn>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'ApiErrorView'
}
</script>

<style scoped>
.screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  justify-items: center;
  padding-top: 50px;
}

</style>