export const UserTypes = {
    EMPLOYEE: 1,
    MANAGER: 2,
    SUPPLIER: 3
}

export class User {
    constructor(id, username, email, password, userType, restaurantIds) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.restaurantIds = restaurantIds; // [] Array type
    }
}