import {Api} from "@/api/api";

export { Cycle, RoutinesCyclesApi }

class RoutinesCyclesApi {
    static getUrl(routineId, cycleId) {
        return `${Api.baseUrl}/routines/${routineId}/cycles${cycleId? `/${cycleId}` : ""}`;
    }

    static async add(routineId, cycle, controller) {
        return await Api.post(RoutinesCyclesApi.getUrl(routineId), true, cycle, controller);
    }

    static async modify(routineId, cycleId, cycle, controller) {
        return await Api.put(RoutinesCyclesApi.getUrl(routineId, cycleId), true, cycle, controller);
    }

    static async delete(routineId, cycleId, controller) {
        return await Api.delete(RoutinesCyclesApi.getUrl(routineId, cycleId), true, controller);
    }

    static async get(routineId, cycleId, controller) {
        return await Api.get(RoutinesCyclesApi.getUrl(routineId, cycleId), true, controller);
    }

    static async getAllCyclesInRoutine(routineId, controller) {
        return await Api.get(RoutinesCyclesApi.getUrl(routineId), true, controller).content;
    }
}

class Cycle {
    constructor(id, name, detail, type, order, repetitions) {
        if(id) {
            this.id = id;
        }
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.order = order;
        this.repetitions = repetitions;
    }
}