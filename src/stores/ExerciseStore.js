import { defineStore } from "pinia";
import { ExerciseApi } from "@/api/exercise";

export const useExerciseStore = defineStore("exercise", {
  state: () => ({
    items: [],
  }),
  getters: {
    getItems: (state) =>{ return state.items},
    findIndex() {
      return (exercise) => {
        return this.items.findIndex(item => item.id === exercise.id)
      }
    },
  },
  actions: {
    push(exercise) {
      this.items.push(exercise);
    },
    replace(index, exercise) {
      this.items[index] = exercise;
    },
    splice(index) {
      this.items.splice(index, 1);
    },
    replaceAll(exercises) {
      this.items = exercises;
    },
    async create(exercise) {
      const result = await ExerciseApi.add(exercise);
      //if (!this.findIndex(result))   por alguna razon esto rompe el auto update
      this.push(result);
      return result;
    },
    async modify(exercise) {
      const result = await ExerciseApi.modify(exercise);
      const index = this.findIndex(result);
      if (index >= 0)
        this.replace(index, result);
      return result;
    },
    async delete(exercise) {
      await ExerciseApi.delete(exercise.id);
      const index = this.findIndex(exercise);
      if (index >= 0)
        this.splice(index);
    },
    async get(exercise) {
      const index = this.findIndex(exercise);
      if (index >= 0)
        return this.items[index];

      const result = await ExerciseApi.get();
      this.push(result);
      return result;
    },
    async getAll(controller) {
      const result = await ExerciseApi.getAll(controller);
      return result;
    },
    async updateCache(controller){
        this.items =  await ExerciseApi.getAll(controller);
    }
  },
});
