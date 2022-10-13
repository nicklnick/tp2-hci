<template>
  <v-card class="my-2 quaternary" >
    <div class="d-flex justify-space-between ">
      <div  class="exercise-text-width col-start pl-3 pt-1">
        <v-list-item-title class="align-self-start headline pb-3">{{exer_name}}</v-list-item-title>
        <v-divider  class="py-2"></v-divider>
        <v-list-item-subtitle class="pa-0 ma-0 exercise-text-width card_text">Details: {{exer_detail}}</v-list-item-subtitle>
        <v-list-item-subtitle class="pa-0 ma-0 exercise-text-width card_text">Type: {{exer_type[0].toUpperCase() + exer_type.substring(1)}}</v-list-item-subtitle>
      </div>

      <div class="space-evenly-col">
        <v-btn text fab x-small color="dark-grey"
               @click="removeExercise"
        ><v-icon>mdi-close</v-icon></v-btn>

        <v-btn text fab x-small color="dark-grey"
           v-if="editable === 'true'"    @click="editExercise"
        ><v-icon>mdi-pencil</v-icon></v-btn>

      </div>
    </div>

  </v-card>
</template>

<script>
export default {
  name: "ExerciseCard",
  props: {
    exer_name: {
      type: String,
      required: true
    },
    exer_detail: {
      type: String,
      required: true
    },
    exer_type: {
      type: String,
      required: true
    },
    editable: {
      type: String,
      required: true,
    }
  },
  methods: {
    removeExercise(){
      this.$emit("removeExercise");
    },
    editExercise() {
      this.$emit("editExercise");
    }
  }
};
</script>

<style scoped>
.exercise-text-width{
  width: 85%;
}

.card_text {
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

</style>