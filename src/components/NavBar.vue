<template>
  <div>
    <v-app-bar app color="secondary">
      <HomeButton></HomeButton>

      <v-spacer></v-spacer>
      <search-bar></search-bar>
      <v-spacer></v-spacer>

      <v-btn id="profile" color="tertiary" fab small>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer width="auto" :permanent="$vuetify.breakpoint.mdAndUp" app v-model="drawer" color="secondary">
      <div class="flex-container">
        <v-list dense nav>
          <v-list-item-group style="width: 100%" v-model="selectedItem">

            <v-spacer class="mt-6"></v-spacer>

            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon v-if="item.icon">
                <v-icon color="#000000">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-spacer class="mt-12"></v-spacer>

            <v-list-item
                v-for="item in items2"
                :key="item.title"
                link
            >
              <v-list-item-icon>
                <v-icon color="#000000">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import HomeButton from "@/components/HomeButton";
export default {
  name: "NavBar",
  components: { HomeButton, SearchBar },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home" },
        { title: "Routines", icon: "mdi-book" },
        { title: "Favourites", icon: "mdi-heart" },
      ],
      items2: [
        { title: "Settings", icon: "mdi-cog" },
        { title: "Help", icon: "mdi-help-circle" },
        { title: "Log Out", icon: "mdi-logout" },
      ],
      right: null,
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
}

.flex-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
}
</style>