import { defineStore } from "pinia";
import { Routine, RoutineApi } from "@/api/routine.js";

export const useRoutineStore = defineStore("RoutineStore", {
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
    push(routine) {
      this.items.push(routine);
    },
    replace(index, routine) {
      this.items[index] = routine;
    },
    splice(index) {
      this.items.splice(index, 1);
    },
    replaceAll(routine) {
      this.items = routine;
    },
    async create(routine) {
      const result = await RoutineApi.add(routine);
      //if (!this.findIndex(result))
        this.push(result);
      return result;
    },
    async modify(routine) {
      const result = await RoutineApi.modify(routine);
      const index = this.findIndex(result);
      if (index >= 0)
        this.replace(index, result);
      return result;
    },
    async delete(routine) {
      await RoutineApi.delete(routine.id);
      const index = this.findIndex(routine);
      if (index >= 0)
        this.splice(index);
    },
    async get(routine) {
      const index = this.findIndex(routine);
      if (index >= 0)
        return this.items[index];

      const result = await RoutineApi.get();
      this.push(result);
      return result;
    },
    // te consigue T0DOS las rutinas de todos los usuarios
    async getAll(controller) {
      return await RoutineApi.getAll(controller);
    },
    async updateCache(controller){
      try{
        const res = await RoutineApi.getAll(controller);
        this.items = [];
        for(const newSport in res.content){
          this.push(new Routine(res.content[newSport].id, res.content[newSport].name, res.content[newSport].isPublic,
            res.content[newSport].difficulty, res.content[newSport].user.id))
        }
      }
      catch (e){
        console.log(e)
      }
    }
  },
});
