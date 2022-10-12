import { Api } from "./api.js";

export { Routine, RoutineApi  }

class RoutineApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}`;
  }

  static async add(routine, controller) {
    return await Api.post(RoutineApi.getUrl(), true, routine, controller);
  }

  static async modify(routine, controller) {
    return await Api.put(RoutineApi.getUrl(routine.id), true, routine, controller);
  }

  static async delete(id, controller) {
    return await Api.delete(RoutineApi.getUrl(id), true, controller);
  }

  static async get(id, controller) {
    return await Api.get(RoutineApi.getUrl(id),true,  controller);
  }
  // te consigue T0DOS las rutinas de todos los usuarios
  static async getAll(controller) {
    return await Api.get(RoutineApi.getUrl(), true, controller);
  }
}

class Routine {
  constructor(id, name, isPublic, difficulty, userId) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.isPublic = isPublic;
    this.difficulty = difficulty;
    this.userId = userId;
  }
}
