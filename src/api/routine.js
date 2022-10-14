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
  static async getAllUserRoutines(userId, controller){
    const allRoutines =  await Api.get(RoutineApi.getUrl(),true,  controller);

    const resp = []

    for(const newSport in allRoutines.content){
      if(userId === allRoutines.content[newSport].user.id)
        resp.push(new Routine(allRoutines.content[newSport].id, allRoutines.content[newSport].name,allRoutines.content[newSport].detail ,allRoutines.content[newSport].isPublic,
          allRoutines.content[newSport].difficulty, allRoutines.content[newSport].user, allRoutines.content[newSport].category))
    }

    return resp;
  }

  // te consigue T0DOS las rutinas de todos los usuarios
  static async getAll(controller) {
    return await Api.get(RoutineApi.getUrl(), true, controller);
  }
}

class Routine {
  constructor(id, name, detail, isPublic, difficulty, user, category) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.detail = detail;
    this.isPublic = isPublic;
    this.difficulty = difficulty;
    this.user = user;
    this.category = category;
  }
}
