import {defineStore} from "pinia";
import {CycleExerciseApi} from "@/api/cycleExercise";

export const useCycleExerciseStore = defineStore("cycleExercise", {
    state:() => ({
        exercises: [],
    }),
    actions: {
        push(exercise) {
            this.exercises.push(exercise)
        },
        async addToCycle(cycleId, exerciseId, exerciseData) {
            const result = await CycleExerciseApi.add(cycleId, exerciseId, exerciseData);

            this.push(result);
            return result;
        },
        async modify(cycleId, exerciseId, cycleExercise) {
            return await CycleExerciseApi.modify(cycleId, exerciseId, cycleExercise);
        },
        async delete(cycleId, exerciseId) {
            return await CycleExerciseApi.delete(cycleId, exerciseId);
        },
        async get(cycleId, exerciseId) {
            return await CycleExerciseApi.get(cycleId, exerciseId);
        },
        async getAll(cycleId) {
            return await CycleExerciseApi.getAllExercisesInCycle(cycleId);
        }
    }
})