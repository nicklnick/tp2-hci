<template>
  <v-card class="my-2 quaternary" >
    <div class="d-flex justify-space-between">
      <div  class="exercise-text-width col-start pl-3 pt-1">
        <v-list-item-title class="align-self-start headline pb-3 title_text">{{exer_name}}</v-list-item-title>
        <v-divider  class="py-1"></v-divider>
        <v-list-item-subtitle class="pa-0 ma-0 exercise-text-width card_text">{{exer_detail}}</v-list-item-subtitle>
        <v-list-item-subtitle class="pb-3  ma-0 exercise-text-width card_text">
          <v-chip :color="color">
            {{exer_type[0].toUpperCase() + exer_type.substring(1)}}
          </v-chip>
        </v-list-item-subtitle>
      </div>
        <slot>
        </slot>
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
  },
  data(){
    return {

    }
  },
  computed: {
    color(){
      if(this.exer_type === "exercise"){
          return  "#6b82f5"
      }
      return "#ecd76d";
    }
  }
};
</script>

<style scoped>
.exercise-text-width{
  width: 70%;
}

.card_text {
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
}

.title_text {
  max-width: 90%;
}

</style>