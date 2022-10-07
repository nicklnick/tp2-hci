<template>
  <v-card height="100%" width="100%"  color="secondary">
    <div class="bar">
      <HomeButton class="ml-4"></HomeButton>

      <v-spacer></v-spacer>


      <SearchBar class="mb-5"></SearchBar>

      <v-spacer></v-spacer>

      <v-btn class="mr-4" id="profile" color="tertiary" fab small>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </div>
  </v-card>

</template>

<script>
import SearchBar from "@/components/CommonComponents/SearchBar";
import HomeButton from "@/components/Navigation/HomeButton";
export default {
  name: "TopBar",
  components: { HomeButton, SearchBar },
};
</script>

<style scoped>
.bar{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}


</style>