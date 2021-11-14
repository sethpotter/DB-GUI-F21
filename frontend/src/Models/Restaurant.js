export class Restaurant {
    constructor(id, name, joinedDate, active) {
        this.id = id;
        this.name = name;
        this.joinedDate = joinedDate; // The date this restaurant joined?
        this.active = active;         // Whether this restaurant is active?
    }
}