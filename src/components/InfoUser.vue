<template>
  <div class="d-flex flex-column align-center justify-center">
    <v-container class="ma-2">
      <InfoBar label_text="Full Name"></InfoBar>
      <InfoBar class="my-3" label_text="Birthday Date"></InfoBar>
      <InfoBar label_text="Email">
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

<style scoped></style>