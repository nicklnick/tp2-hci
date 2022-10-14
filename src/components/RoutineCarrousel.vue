<template>
  <div class="carousel">
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
                      <routine-button :routine_author="myRoutines[+index +i].user.username"
                                      :routine_category="myRoutines[+index +i].category?.name"
                                      :routine_detail="myRoutines[+index +i].detail"
                                      :routine_difficulty="myRoutines[+index +i].difficulty"
                                      :routine_name="myRoutines[+index +i].name"
                                      :routine_id="myRoutines[+index + i].id"
                      ></routine-button>
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
import {mapActions, mapState} from "pinia";
import {RoutineApi} from "@/api/routine";
import {useSecurityStore} from "@/stores/SecurityStore";
import RoutineButton from "@/components/Routines/RoutineButton";

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
      $isLoggedIn: 'isLoggedIn',
      $online: 'online',
      $user: 'user'
    }),
    ...mapActions(useSecurityStore, {
      $checkApiOnline: 'checkApiOnline',
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

    await this.$checkApiOnline;

    if(!this.$online){
      await this.$router.push({ name: "Error" });
    }
    if(!this.$isLoggedIn){   // TODO: !!!! check !!!!
      await this.$router.push({ name: "Home" });
    }
    this.myRoutines = await RoutineApi.getAllUserRoutines(this.$user.id);
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
