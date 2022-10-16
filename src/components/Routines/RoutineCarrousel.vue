<template>
  <div v-if="myRoutines===null || myRoutines.length === 0">
    <h2>Looks like you don't have any routines. Make Some!</h2>
  </div>
  <div v-else class="carousel">
    <v-carousel hide-delimiters height="100%">
      <template v-for="(item, index) in myRoutines">
        <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1"
                         :key="index"
        >
          <v-row class="flex-nowrap size">
            <template v-for="(n,i) in columns">
              <template v-if="(+index + i) < myRoutines.length">
                <v-col :key="i" align-self="center">
                  <v-row
                      justify="center"
                  >
                    <div class="display-3">
                      <RoutineButton :routine_author="myRoutines[+index +i].user.username"
                                      :routine_category="myRoutines[+index +i].category?.name"
                                      :routine_detail="myRoutines[+index +i].detail"
                                      :routine_difficulty="myRoutines[+index +i].difficulty"
                                      :routine_name="myRoutines[+index +i].name"
                                      :routine_id="myRoutines[+index + i].id"
                      ></RoutineButton>
                    </div>
                  </v-row>
                </v-col>
              </template>
            </template>
          </v-row>
        </v-carousel-item>
      </template>
    </v-carousel>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {useSecurityStore} from "@/stores/SecurityStore";
import RoutineButton from "@/components/Routines/RoutineButton";
import { FavouriteApi } from "@/api/favourites";

export default {
  name: 'RoutineCarrousel',
  components: {
    RoutineButton
  },
  data() {
    return {
      myRoutines: null,
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $user: 'user'
    }),
    columns() {
      if (this.$vuetify.breakpoint.xl) {
        return 4;
      }

      if (this.$vuetify.breakpoint.lg) {
        return 4;
      }

      if (this.$vuetify.breakpoint.md) {
        return 2;
      }

      return 1;
    },
  },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    await securityStore.checkApiOnline();

    if(securityStore.online === false){
      await this.$router.push({ name: "Error" });
    }
    if(securityStore.isLoggedIn === false){
      await this.$router.push({ name: "Login" });
    }
    else {
      this.myRoutines = await FavouriteApi.getFavourites();
    }
  }
}
</script>

<style scoped>
.carousel {
  width: 90%;
  height: 30%;
}

.size {
  height: 100%;
}
</style>
