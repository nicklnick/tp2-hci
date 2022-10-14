<template>
    <v-btn color="quaternary" height="200px" width="250px">
      <v-card color="quaternary" height="200px" width="250px">
        <div class="flex-container pt-2">
          <v-card-title> {{routine_name}} </v-card-title>
          <v-card-subtitle>By: {{routine_author}}</v-card-subtitle>
          <v-card-text class="text-start">
            <div class="align-content-start justify-content-start">
              {{routine_detail}}
            </div>
          </v-card-text>
        </div>
        <v-card-actions class="justify-end">
          <v-chip-group>
            <v-chip small color="tertiary">
              {{routine_category}}
            </v-chip>
            <v-chip small color="tertiary">
              {{routine_difficulty}}
            </v-chip>

          </v-chip-group>
          <v-btn @click="switchColor()" icon>
            <v-icon :color="heart_color_comp"
            >mdi-heart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-btn>
</template>

<script>
import {useSecurityStore} from "@/stores/SecurityStore";

export default {
  name: "RoutineButton",
  data: () => ({
      heart_color: "white",

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
      routine_detail: {
        type: String,
        required: true
      },
      routine_difficulty: {
        type: String,
        required: true
      },
      routine_category: {
        type: String,
        required: true
      }
  },
  computed: {
    heart_color_comp() {
      return this.heart_color;
    },
  },
  methods: {
    switchColor() {
      // TODO: Para ustedes ta bueno este blanco?
      this.heart_color = this.heart_color === "primary" ? "white" : "primary";
    }
  },
  async created() {
    // Siempre inicializarlo!!!!!
    const securityStore = useSecurityStore()
    await securityStore.initialize()
  }
};
</script>

<!-- TODO: fix color!!! -->
<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.card_size {
  height: 150px;
  width: 200px;
}
</style>