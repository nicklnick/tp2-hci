<template>
  <v-toolbar color="secondary">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <HomeButton></HomeButton>

    <v-spacer></v-spacer>

    <SearchBar></SearchBar>

    <v-spacer></v-spacer>

    <v-btn id="profile" color="tertiary" fab small>
      <v-icon>account_circle</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import HomeButton from "@/components/HomeButton";
export default {
  name: "TopBar",
  components: { HomeButton, SearchBar },
};
</script>

<style scoped></style>
