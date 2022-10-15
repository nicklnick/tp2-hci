import {Api} from "./api.js";
import { Routine } from "@/api/routine";

export { FavouriteApi }

class FavouriteApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/favourites${ slug ? `/${slug}` : ""}`;
    }

    static async markAsFavourite(routineID, controller){
        return await Api.post(FavouriteApi.getUrl(routineID), true, controller)
    }

    static async removeAsFavourite(routineID, controller){
        return await Api.delete(FavouriteApi.getUrl(routineID), true, controller )
    }

    static async getFavourites(controller){
        let page = 0, url = `${Api.baseUrl}/favourites?page=${page}`,allFav;
        const resp = []
        do{
            allFav = await Api.get(url, true, controller);
            for(const newSport in allFav.content){
                resp.push(new Routine(allFav.content[newSport].id, allFav.content[newSport].name,allFav.content[newSport].detail ,allFav.content[newSport].isPublic,
                  allFav.content[newSport].difficulty, allFav.content[newSport].user, allFav.content[newSport].category))
            }
            page++;
        }
        while(allFav.isLastPage === false);
        return resp;
    }

    static async checkFavourite(routineID, controller){
        let favourites = await this.getFavourites(controller)
        let routine;
        for( routine in favourites){
            if(favourites[routine].id=== routineID)
                return true
        }
        return false
    }
}
