<template>
  <v-card id="create-routine" class="create-routine overflow-y-auto" color="quaternary" raised
              max-height="400px">
    <v-flex class="flex-column">
      <v-card >
        <!-- TODO: vincular el for a la cantidad de Add Series que haya tocado la persona -->
        <v-tabs
          class="rounded-t-lg"
          background-color="secondary"
          show-arrows
        >
          <v-tabs-slider color="tertiary"></v-tabs-slider>

          <v-tab
            v-for="i in 10"
            :key="i"
            :href="'#tab-' + i"
          >
            Item {{ i }}
          </v-tab>
        </v-tabs>
      </v-card>

      <v-text-field v-for="n in 3" :key="n" class="routine-text" prepend-icon="drag_indicator"></v-text-field>

    </v-flex>

    <div class="floating-buttons">
      <AddButton content="+ add exercise"></AddButton>
      <AddButton content="+ add rest"></AddButton>
    </div>
  </v-card>
</template>

<script>
import AddButton from "@/components/AddButton";
export default {
  data() {
    return  {
      toggle_exclusive: 2,
    }
  },
  name: "CreateRoutinePanel",
  components: { AddButton }
};
</script>

<style scoped>
.create-routine {
  height: 46%;
  width: 37%;
}

.routine-text {
  width: 85%;
}

.centered-input {
  text-align: center;
}

.floating-buttons {
  flex-direction: row;
  display: flex;
  justify-content: end;
}
</style>