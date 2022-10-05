<template>
  <v-card class="navDrawer" height="100%" width="20%">
    <v-navigation-drawer permanent color="primary">
      <v-list class="navbar" dense nav height="70%">
        <v-list-item-group class="button" v-model="selectedItem">
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon v-if="item.icon">
              <v-icon color="#000000">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list dense nav>
        <v-list-item
          height="auto"
          class="align-content-end"
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
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {
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
    };
  },
};
</script>

<style>
.navbar {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
}

.button {
  width: 100%;
}

.navDrawer {
  display: inline;
  float: left;
}
</style>
