import { defineStore } from "pinia";
import { SportApi } from "@/api/sport";

export const useSportStore = defineStore("sport", {
    state: () => ({ items: [] }),
    getters: {
        findIndex() {
            return (sport) => {
                return this.items.findIndex(item => item.id === sport.id)
            }
        },
    },
    actions: {
        push(sport) {
            this.items.push(sport);
        },
        replace(index, sport) {
            this.items[index] = sport;
        },
        splice(index) {
            this.items.splice(index, 1);
        },
        replaceAll(sports) {
            this.items = sports;
        },
        async create(sport) {
            const result = await SportApi.add(sport);
            if (!this.findIndex(result))
                this.push(result);
            return result;
        },
        async modify(sport) {
            const result = await SportApi.modify(sport);
            const index = this.findIndex(result);
            if (index >= 0)
                this.replace(index, result);
            return result;
        },
        async delete(sport) {
            await SportApi.delete(sport.id);
            const index = this.findIndex(sport);
            if (index >= 0)
                this.splice(index);
        },
        async get(sport) {
            const index = this.findIndex(sport);
            if (index >= 0)
                return this.items[index];

            const result = await SportApi.get();
            this.push(result);
            return result;
        },
        async getAll(controller) {
            const result = await SportApi.getAll(controller);
            return result;
        }
    },
});
