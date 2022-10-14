import {Api} from "@/api/api";

export { Cycle, RoutineCycleApi }

class RoutineCycleApi {
    static getUrl(routineId, cycleId) {
        return `${Api.baseUrl}/routines/${routineId}/cycles${cycleId? `/${cycleId}` : ""}`;
    }

    static async add(routineId, cycle, controller) {
        return await Api.post(RoutineCycleApi.getUrl(routineId), true, cycle, controller);
    }

    static async modify(routineId, cycleId, cycle, controller) {
        return await Api.put(RoutineCycleApi.getUrl(routineId, cycleId), true, cycle, controller);
    }

    static async delete(routineId, cycleId, controller) {
        return await Api.delete(RoutineCycleApi.getUrl(routineId, cycleId), true, controller);
    }

    static async get(routineId, cycleId, controller) {
        return await Api.get(RoutineCycleApi.getUrl(routineId, cycleId), true, controller);
    }

    static async getAllCyclesInRoutine(routineId, controller) {
        return await Api.get(RoutineCycleApi.getUrl(routineId), true, controller);
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