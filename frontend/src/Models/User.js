export const UserTypes = { // TODO Match this with the database.
    EMPLOYEE: "employee",
    MANAGER: "manager",
    SUPPLIER: "supplier"
}

export class User {
    constructor(id, username, email, password, userType) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.userType = userType;

        if(this.userType !== UserTypes.SUPPLIER)
            this.restaurantId = null; // TODO Get the restaurant this user is associated with
    }
}