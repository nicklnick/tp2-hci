import {Api} from "@/api/api";

export { CategoryApi, Category }

class CategoryApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/categories${slug? `/${slug}` : ""}`;
    }

    static async add(category, controller) {
        return await Api.post(CategoryApi.getUrl(), true, category, controller);
    }

    static async modify(category, controller) {
        return await Api.put(CategoryApi.getUrl(category.id), true, category, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(CategoryApi.getUrl(id), true, controller);
    }

    static async get(id, controller) {
        return await Api.get(CategoryApi.getUrl(id), true, controller);
    }

    static async getAll(controller) {
        return await Api.get(CategoryApi.getUrl(), true, controller);
    }
}

class Category {
    constructor(id, name, detail) {
        if(id) {
            this.id = id;
        }
        this.name = name;
        this.detail = detail;
    }
}