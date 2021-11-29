import {getRestaurantById, getRestaurantByName} from "../Api/RestaurantRoutes";

export class RestaurantService {

    loadRestaurant(id) {

    }

    loadRestaurantByName(name, callback) {
        getRestaurantByName(name).then((restaurant) => {
            callback(restaurant);
        });
    }

}