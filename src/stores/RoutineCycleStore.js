import {defineStore} from "pinia";
import {RoutinesCyclesApi} from "@/api/routinesCycles";

export const useRoutineCycleStore = defineStore("routinesCycle", {
    state:() => ({
        cycles: [],
    }),
    actions: {
        push(cycle) {
            this.cycles.push(cycle)
        },
        async create(routineId, cycleData) {
            const result = await RoutinesCyclesApi.add(routineId, cycleData);

            this.push(result);
            return result;
        },
        async modify(routineId, cycle) {
            return await RoutinesCyclesApi.modify(routineId, cycle.id, cycle);
        },
        async delete(routineId, cycleId) {
            return await RoutinesCyclesApi.delete(routineId, cycleId);
        },
        async get(routineId, cycleId) {
            return await RoutinesCyclesApi.get(routineId, cycleId);
        },
        async getAll(routineId) {
            return await RoutinesCyclesApi.getAllCyclesInRoutine(routineId);
        }
    }
})