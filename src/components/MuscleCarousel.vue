<template>
  <div class="carousel">
  <v-carousel hide-delimiters height="100%">
    <template v-for="(item, index) in slider">
      <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1"
                       :key="index"
      >
        <v-row class="flex-nowrap" style="height:100%">
          <template v-for="(n,i) in columns">
            <template v-if="(+index + i) < slider.length">
              <v-col :key="i">
<!--                      <v-sheet v-if="(+index + i) < slider.length"-->
<!--                               height="100%"-->
<!--                      >-->
                    <v-row align="center"
                           justify="center"
                    >
                      <div class="display-3">
                        <ButtonWithIcon :button_icon="slider[+index + i].button_icon" :button_text="slider[+index + i].button_text"></ButtonWithIcon>
                      </div>
                    </v-row>
<!--                      </v-sheet>-->
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
import ButtonWithIcon from "@/components/ButtonWithIcon";
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
      ]
    }
  },
  computed: {
    columns() {
      if (this.$vuetify.breakpoint.xl) {
        return 4;
      }

      if (this.$vuetify.breakpoint.lg) {
        return 5;
      }

      if (this.$vuetify.breakpoint.md) {
        return 2;
      }

      return 1;
    }
  },
}
</script>

<style scoped>
.carousel {
  width: 70%;
  height: 30%;
}
</style>