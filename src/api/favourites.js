import {Api} from "./api.js";

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
        return await Api.get(FavouriteApi.getUrl(), true, controller)
    }

    static async checkFavourite(routineID, controller){
        let favourites = await this.getFavourites(controller)
        favourites = favourites.content
        let routine;
        for( routine in favourites){
            if(favourites[routine].id=== routineID)
                return true
        }
        return false
    }
}
