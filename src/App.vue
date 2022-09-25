<template>
  <v-app>
    <v-main>
      <v-toolbar color="secondary">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-btn id="home-button" color="tertiary" raised large> </v-btn>

        <v-spacer></v-spacer>

        <v-autocomplete
          id="search-bar"
          class="search-bar"
          label="Search"
          background-color="quaternary"
          item-color="black"
          dense
          filled
          rounded
          solo-inverted
        ></v-autocomplete>

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
  display: flex;
  align-self: baseline;
}
</style>
