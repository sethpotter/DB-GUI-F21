import axios from "axios";
import {url} from "../Util/url";
import {toQuery} from "../Util/utils";
import {User, UserTypes} from "../Models/User";

/**
 * Registers a new user. UserTypes are associated by Id (Look in User.js)
 * Returns an appropriate message if success or failed.
 * @param username
 * @param password
 * @param usertype
 * @returns {Promise<AxiosResponse<any> | T>}
 */
const register = (username, password, usertype) => {
    const request = {
        username: username,
        password: password,
        usertype: usertype
    };

    return axios.post(`http://${url}:8000/register?` + toQuery(request)).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err.response);
        return err.response.data;
    });
}

/**
 * Login in as a user. Returns a User object.
 * Returns appropriate message if incorrect password.
 * @param username
 * @param password
 * @returns {Promise<AxiosResponse<any> | T>}
 */
const login = (username, password) => {
    const request = {
        username: username,
        password: password
    };

    return axios.get(`http://${url}:8000/login?` + toQuery(request)).then(res => {
        let userData = res.data;
        let user = new User(userData.userID, username, null, password, userData.userType, null);
        if(userData.userType !== UserTypes.SUPPLIER) {
            return getUserRestaurantIds({id: userData.userID}).then((res) => {
                user.restaurantIds = res;
                return user;
            });
        } else {
            return user;
        }
    }).catch(err => {
        console.log(err.response);
        return err.response.data;
    });
}

/**
 * Gets all the restaurantIds a user is associated with.
 * @param user
 * @returns {Promise<AxiosResponse<any>>}
 */
const getUserRestaurantIds = (user) => {
    const request = {
        userId: user.id
    };

    return axios.get(`http://${url}:8000/getRestaurantId?` + toQuery(request)).then(res => {
        let restaurants = [];
        for(let wrap of res.data) {
            restaurants.push(wrap.restaurantID);
        }
        if(restaurants.length > 0)
            return restaurants;
        else
            return null;
    }).catch(err => {
        console.log(err.response);
        return null;
    });
}

export {
    login,
    register,
    getUserRestaurantIds
}