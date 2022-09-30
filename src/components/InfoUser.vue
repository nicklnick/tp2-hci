<template>
  <div class="d-flex flex-column align-center justify-center" flat tile>
    <v-container class="pa-1">
      <InfoBar>
        Full Name
      </InfoBar>
      <InfoBar class="my-3" >
        Birthday Date
      </InfoBar>
      <InfoBar>
        E-mail
        <v-btn icon color="black" small>
          <v-icon size=15px>edit</v-icon>
        </v-btn>
      </InfoBar>
    </v-container>
  </div>
</template>

<script>
import InfoBar from "./InfoBar";
export default {
  name: "InfoUser",
  components: {
    InfoBar
  },
  data: () => ({
    //
  }),
};
</script>
.pa-1 {
width: 50%;
}
<style scoped>
</style>