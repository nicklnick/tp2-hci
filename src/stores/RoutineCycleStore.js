import {defineStore} from "pinia";
import {RoutineCycleApi} from "@/api/routineCycle";

export const useRoutineCycleStore = defineStore("routineCycle", {
    state:() => ({
        cycles: [],
    }),
    actions: {
        push(cycle) {
            this.cycles.push(cycle)
        },
        async create(routineId, cycleData) {
            const result = await RoutineCycleApi.add(routineId, cycleData);

            this.push(result);
            return result;
        },
        async modify(routineId, cycle) {
            return await RoutineCycleApi.modify(routineId, cycle.id, cycle);
        },
        async delete(routineId, cycleId) {
            return await RoutineCycleApi.delete(routineId, cycleId);
        },
        async get(routineId, cycleId) {
            return await RoutineCycleApi.get(routineId, cycleId);
        },
        async getAll(routineId) {
            return await RoutineCycleApi.getAllCyclesInRoutine(routineId);
        }
    }
})