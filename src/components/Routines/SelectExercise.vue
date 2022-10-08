<template>
  <CustomCard card-width="300" card-height="500" card-title="Select Exercise">

    <div class="general-height overflow-auto px-4">
      <v-card class="d-flex justify-space-between my-2 quaternary" v-for="(activity, index) in currentSeries"
              :key="index">
        <span class="pl-3 pt-1">{{activity}}</span>

        <v-btn text fab x-small color="dark-grey"
               @click="$emit('selectedExercise', activity)"
        ><v-icon>mdi-check</v-icon></v-btn>
      </v-card>
    </div>

  </CustomCard>
</template>

<script>
import CustomCard from "@/components/CommonComponents/CustomCard";

export default {
  name: "SelectExercise",
  components: { CustomCard },
  data: () => ({
    currentSeries: [1,2,3,4,5,2,3,4,52,3,4,52,3,4,52,3,4,52,3,4,5],
  }),
  methods: {
  },
};
</script>

<style scoped>

.general-height {
  height: 450px
}

</style>