import { Api } from "./api.js";

export { SportApi, Sport }

class SportApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/sports${ slug ? `/${slug}` : ""}`;
  }

  static async add(sport, controller) {
   return await Api.post(SportApi.getUrl(), true, sport, controller);
  }

  static async modify(sport, controller) {
    return await Api.put(SportApi.getUrl(sport.id), true, sport, controller);
  }

  static async delete(id, controller) {
    return await Api.delete(SportApi.getUrl(id), true, controller);
  }

  static async get(id, controller) {
    return await Api.get(SportApi.getUrl(id),true,  controller);
  }

  static async getAll(controller) {
    return await Api.get(SportApi.getUrl(), true, controller);
  }
}

class Sport {
  constructor(id, name, detail) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.detail = detail;
  }
}
