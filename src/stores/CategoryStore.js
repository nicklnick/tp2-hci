import {defineStore} from "pinia";
import {Category, CategoryApi} from "@/api/category";

export const useCategoryStore = defineStore("sport", {
    state: () => ({
        items: [],
    }),
    getters: {
        getItems: (state) => { return state.items },
        findIndex() {
            return (category) => {
                return this.items.findIndex(item => item.id === category.id)
            }
        },
    },
    actions: {
        push(category) {
            this.items.push(category);
        },
        replace(index, category) {
            this.items[index] = category;
        },
        splice(index) {
            this.items.splice(index, 1);
        },
        replaceAll(categories) {
            this.items = categories;
        },
        async create(category) {
            const result = await CategoryApi.add(category);

            this.push(result);
            return result;
        },
        async modify(category) {
            const result = await CategoryApi.modify(category);
            const index = this.findIndex(result);
            if(index >= 0)
                this.replace(index, result);
            return result;
        },
        async delete(category) {
            await CategoryApi.delete(category.id);
            const index = this.findIndex(category);
            if(index >= 0)
                this.splice(index);
        },
        async get(category) {
            const index = this.findIndex(category);
            if(index >= 0)
                return this.items[index];

            const result = await CategoryApi.get();
            this.push(result);
            return result;
        },
        async getAll(controller) {
            return await CategoryApi.getAll(controller);
        },
        async updateCache(controller) {
            try {
                const result = await CategoryApi.getAll(controller);
                this.items = [];
                for(const newCategory in result.content) {
                    this.push(new Category(result.content[newCategory].id,
                        result.content[newCategory].name,
                        result.content[newCategory].detail))
                }
            }
            catch(e) {
                // TODO: Handle error?
                console.log(e)
            }
        }

    }
})