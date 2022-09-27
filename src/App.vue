<template>
  <v-app>
    <v-main>
      <v-toolbar color="secondary">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-btn id="home-button" color="tertiary" raised large> </v-btn>

        <v-spacer></v-spacer>

        <v-text-field
          class="search-bar mt-6"
          label="Search"
          background-color="quaternary"
          color="black"
          append-icon="mdi-magnify"
          transition="none"
          hide-no-data
          dense
          rounded
          filled
          solo-inverted
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn id="profile" color="tertiary" fab small>
          <v-icon>account_circle</v-icon>
        </v-btn>
      </v-toolbar>
    </v-main>
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
.search-bar {
  width: 35%;
  align-self: center;
}
</style>
