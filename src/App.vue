<template>
  <v-app>
    <v-spacer></v-spacer>
    <div class="d-flex align-center justify-center">
      <v-btn id="profile" color="tertiary" fab x-large>
        <v-icon x-large>account_circle</v-icon>
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <div>
      <p class="font-weight-bold">username</p>
    </div>
    <div>
      <v-card class="d-flex flex-column align-center justify-center" flat tile>
        <v-container class="pa-1">
          <v-card
            class="d-flex text-center justify-center align-center"
            rounded-lg
            color="tertiary"
            height="35px"
          >
            Full Name
          </v-card>
          <v-card class="text-center my-3 justify-center align-center" roundend-lg color="tertiary" height="35px">
            Birthday Date
          </v-card>
          <v-card class="text-center justify-center align-center" roundend-lg color="tertiary" height="35px">
            E-mail
            <v-btn icon color="black" small>
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card>
        </v-container>
      </v-card>
    </div>
    <v-spacer></v-spacer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>

<style>
.pa-1 {
  width: 50%;
}

.font-weight-bold {
  text-align: center;
}
</style>
