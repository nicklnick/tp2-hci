<template>
  <v-card tile height="100%" width="100%"  color="secondary">
    <div class="bar">

      <router-link class="button-link" to="/home">
        <HomeButton class="ml-4"></HomeButton>
      </router-link>

      <v-spacer></v-spacer>


      <SearchBar class="mb-5"></SearchBar>

      <v-spacer></v-spacer>

      <router-link class="button-link" to="/user">

        <v-btn class="mr-4" id="profile" color="tertiary" fab small>
          <v-icon>account_circle</v-icon>
        </v-btn>
      </router-link>
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