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
    let page = 0, url = `${Api.baseUrl}/exercises?page=${page}`,allExer;
    const resp = []
    do{
      allExer = await Api.get(url, true, controller);
      for(const newSport in allExer.content){
        resp.push(new Exercise(allExer.content[newSport].id, allExer.content[newSport].name,
          allExer.content[newSport].detail,allExer.content[newSport].type))
      }
      page++;
    }
    while(allExer.isLastPage === false);
    return resp;
  }
}

class Exercise {
  constructor(id, name, detail,type) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.detail = detail;
    this.type = type;
  }
}
