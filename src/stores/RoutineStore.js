import { defineStore } from "pinia";
import { Routine, RoutineApi } from "@/api/routine.js";

export const useRoutineStore = defineStore("routine", {
  state: () => ({
    items: [],
  }),
  getters: {
    getItems: (state) =>{ return state.items},
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
      const result = await RoutineApi.add(sport);
      if (!this.findIndex(result))
        this.push(result);
      return result;
    },
    async modify(sport) {
      const result = await RoutineApi.modify(sport);
      const index = this.findIndex(result);
      if (index >= 0)
        this.replace(index, result);
      return result;
    },
    async delete(sport) {
      await RoutineApi.delete(sport.id);
      const index = this.findIndex(sport);
      if (index >= 0)
        this.splice(index);
    },
    async get(sport) {
      const index = this.findIndex(sport);
      if (index >= 0)
        return this.items[index];

      const result = await RoutineApi.get();
      this.push(result);
      return result;
    },
    async getAll(controller) {
      return await RoutineApi.getAll(controller);
    },
    async updateCache(controller){
      try{
        const res = await RoutineApi.getAll(controller);
        for(const newSport in res.content){
          this.push(new Routine(res.content[newSport].id, res.content[newSport].name, res.content[newSport].isPublic,
            res.content[newSport].difficulty))
        }
      }
      catch (e){
        console.log(e)
      }
    }
  },
});
