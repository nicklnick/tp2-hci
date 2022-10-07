<template>
  <v-card class="navDrawer" height="100%" width="100%">
    <v-navigation-drawer height="100%" permanent color="secondary" width="100%">
      <v-list class="navbar" dense nav height="70%">
        <v-list-item-group class="button" v-model="selectedItem">



            <router-link v-for="item in items" :key="item.title" link class="button-link" :to="item.to">
              <v-list-item>
              <v-list-item-icon v-if="item.icon">
                <v-icon color="#000000">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            </router-link>



        </v-list-item-group>
      </v-list>

      <v-list dense nav>

        <router-link v-for="item in items2" :key="item.title" link class="button-link" :to="item.to">

        <v-list-item height="auto" class="align-content-end" link>
          <v-list-item-icon>
            <v-icon color="#000000">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        </router-link>

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
        { title: "Home", icon: "mdi-home", to:"/home" },
        { title: "Exercises", icon: "mdi-run", to:"/exercises" },
        { title: "Routines", icon: "mdi-book", to:"/routines" },
        { title: "Favourites", icon: "mdi-heart", to:"/favorites" },
      ],
      items2: [
        { title: "Settings", icon: "mdi-cog", to:"/settings"  },
        { title: "Help", icon: "mdi-help-circle" , to:"/help"},
        { title: "Log Out", icon: "mdi-logout", to:"/" },
      ],
      right: null,
    };
  },
};
</script>

<style>


.navDrawer {
  height: 100%;
}
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