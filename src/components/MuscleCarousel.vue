<template>
  <div class="carousel">
  <v-carousel hide-delimiters height="100%">
    <template v-for="(item, index) in muscles ">
      <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1"
                       :key="index"
      >
        <v-row class="flex-nowrap" style="height:100%">
          <template v-for="(n,i) in columns">
            <template v-if="(+index + i) < muscles.length">
              <v-col :key="i" align-self="center">
                    <v-row
                           justify="center"
                    >
                      <div class="display-3">
                        <router-link
                          :to="{
                            name: 'CategoryView',
                            params: { slug: muscles[+index + i].slug }
                          }"
                          tag="button"
                        >
                        <ButtonWithIcon :button_icon="muscles[+index + i].image" :button_text="muscles[+index + i].name"></ButtonWithIcon>
                        </router-link>
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
import ButtonWithIcon from "@/components/CommonComponents/ButtonWithIcon";
import store from "@/stores/MuscleGroups";
export default {
  name: 'MuscleCarousel',
  components: { ButtonWithIcon },
  data(){
    return {
      slider: [
        {button_text: 'Legs', button_icon: 'muscles/piernas.png'},
        {button_text: 'Chest', button_icon: 'muscles/torso.png'},
        {button_text: 'Bicep', button_icon: 'muscles/muscle.png'},
        {button_text: 'Back', button_icon: 'muscles/body-part.png'}
      ],
      muscles: store.muscles
    }
  },
  computed: {
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
}
</script>

<style scoped>
.carousel {
  width: 90%;
  height: 30%;
}
</style>