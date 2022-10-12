import { Api } from "./api.js";

export { ExerciseApi, Exercise }

class ExerciseApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}`;
  }

  static async add(sport, controller) {
    return await Api.post(ExerciseApi.getUrl(), true, sport, controller);
  }

  static async modify(sport, controller) {
    return await Api.put(ExerciseApi.getUrl(sport.id), true, sport, controller);
  }

  static async delete(id, controller) {
    return await Api.delete(ExerciseApi.getUrl(id), true, controller);
  }

  static async get(id, controller) {
    return await Api.get(ExerciseApi.getUrl(id),true,  controller);
  }

  static async getAll(controller) {
    return await Api.get(ExerciseApi.getUrl(), true, controller);
  }
}

class Exercise {
  constructor(id, name, detail) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.detail = detail;
    this.type = "exercise";
  }
}
