import {isLogin} from "../Util/utils";
import {getLoggedIn} from "../Api/UserRoutes";

export class UserService {

    loadUser(callback) {
        if(window.user)
            callback(window.user);

        if(isLogin()) {
            getLoggedIn().then((user) => {
                window.user = user;
                callback(user);
            });
        }
    }

    signOut() {
        sessionStorage.setItem("userId", null);
    }

}