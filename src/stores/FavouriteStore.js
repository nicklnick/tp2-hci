import { defineStore } from "pinia";
import { FavouriteApi} from "@/api/favourites.js";

export const useFavouriteStore = defineStore( "FavouriteStore", {
    state: () => ({
        items: [],
    }),
    getters: {
        getItems: (state) => { return state.items },
    },
    actions: {
        push(routineID) {
            this.items.push(routineID);
        },
        splice(index) {
            this.items.splice(index, 1);
        },
        async addToFavourites(routineID) {
            let result = await FavouriteApi.markAsFavourite(routineID);
            //if (!this.findIndex(result))
            this.push(routineID);
            return result;
        },
        async remove(routineID) {
            await FavouriteApi.removeAsFavourite(routineID);
            const index = this.findIndex(routineID);
            if (index >= 0)
                this.splice(index);
        },
        // te consigue T0DOS las rutinas de todos los usuarios
        async getAll(controller) {
            return await FavouriteApi.getFavourites(controller);
        },
    }
});