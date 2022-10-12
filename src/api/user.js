import { Api } from "./api.js";

export { UserApi, Credentials }

class UserApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/users${ slug ? `/${slug}` : ""}`;
    }

    static async signup(username, password, email, controller){
        return await Api.post(UserApi.getUrl(''), false,
          {"username": username, "password": password, "email": email},  controller);
    }

    static async verifyEmail(email, code, controller){
        return await Api.post(UserApi.getUrl('verify_email'), false,
          {"email": email, "code": code},  controller);
    }

    static async login(credentials, controller) {
        return await Api.post(UserApi.getUrl('login'), false, credentials, controller);
    }

    static async logout(controller) {
        await Api.post(UserApi.getUrl('logout'), true, controller);
    }
    static async get(controller) {
        return Api.get(UserApi.getUrl('current'), true, controller);
    }
    static async modify(data, controller) {
        return await Api.put(UserApi.getUrl('current'), true, data, controller);
    }
}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}