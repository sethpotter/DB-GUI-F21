export class Product {
    constructor(id, name, description, image, stock, minStock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.stock = stock;             // Basically the quantity of the product.
        this.minStock = minStock;       // The minimum amount of stock before it turns red on inventory.
    }
}