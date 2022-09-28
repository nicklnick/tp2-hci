<template>

    <v-btn color="quaternary" height="150px" width="200px" >

      <v-card color="quaternary" height="150px" width="200px"
      class="justify-space-between">

        <v-card-text align="start" class="text-h6 pb-0 pt-2">
          {{routine_name}}</v-card-text>

        <v-card-subtitle align="start" class="pt-0">
          By: {{routine_author}}</v-card-subtitle>

        <v-card-text class="mt-2">
          <v-row class="justify-space-between mx-1">
            <v-card color="secondary" class="px-1 text-caption rounded-pill"
            >arms</v-card>
            <v-card color="secondary" class="px-1  text-caption rounded-pill"
            >chest</v-card>
            <v-card color="secondary" class="px-1 text-caption rounded-pill"
            >glutes</v-card>
          </v-row>
        </v-card-text>


        <v-card-actions class="align-self-center justify-space-between">

          <div>
            <v-icon small class="pr-2" color="primary">mdi-star</v-icon>
            <span>{{routine_stars}}/5</span>
          </div>

            <v-btn @click="switchColor()" icon >
              <v-icon :color="heart_color_comp"
              >mdi-heart</v-icon>
            </v-btn>

        </v-card-actions>
      </v-card>
    </v-btn>



</template>

<script>
export default {
  name: "RoutineButton",
  data: () => ({
      heart_color: "primary",

  }),
  props:{
      routine_name: {
        type: String,
        required: true
      },
      routine_author: {
        type: String,
        required: true
      },
      routine_stars: {
        type: Number,
      }
  },
  computed: {
    heart_color_comp() {
      return this.heart_color;
    },
  },
  methods: {
    switchColor() {
      this.heart_color = this.heart_color === "primary" ? "white" : "primary";
    }
  },
};
</script>

<style scoped>
</style>