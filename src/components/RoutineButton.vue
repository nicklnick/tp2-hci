<template>

    <v-btn color="quaternary" height="150px" width="200px">
      <v-card color="quaternary" height="150px" width="200px">

        <div class="custom_card card_size">

            <div>
              <h3 class="card_text ml-4 pb-0 pt-3">
                {{routine_name}}
              </h3 >
              <h5  class="card_text ml-4 pt-0">
                By: {{routine_author}}
              </h5>
              <v-divider class="mx-4 mt-1 mb-4"></v-divider>
            </div>

            <div>
              <v-row class="ml-2">
                <v-card color="secondary" class="px-1 mx-1 text-caption rounded-pill"
                >arms</v-card>
                <v-card color="secondary" class="px-1 mx-1  text-caption rounded-pill"
                >chest</v-card>
                <v-card color="secondary" class="px-1 mx-1 text-caption rounded-pill"
                >glutes</v-card>
              </v-row>
            </div>


            <div class="justify-end">
              <v-card-actions  class="py-0 justify-space-between">

                <div>
                  <v-icon small class="pr-2" color="primary">mdi-star</v-icon>
                  <span>{{routine_stars}}/5</span>
                </div>

                <v-btn @click="switchColor()" icon >
                  <v-icon :color="heart_color_comp"
                  >mdi-heart</v-icon>
                </v-btn>

              </v-card-actions>
            </div>

        </div>

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

<!-- TODO: fix color!!! -->
<style scoped>

.card_text {
  text-align: left;
}

.button_card {
  background-color: green;
  height: 150px;
  width: 200px;
}

.card_size {
  height: 150px;
  width: 200px;
}

.custom_card {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>