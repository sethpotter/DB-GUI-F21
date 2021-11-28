import {Inventory} from "../Models/Inventory";
import {getProducts} from "../Api/ProductRoutes";
import {getInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem} from "../Api/InventoryRoutes";
import {InventoryItem} from "../Models/InventoryItem";

export class InventoryService {

    loadProducts(callback) {
        if(window.products)
            callback(window.products);
        else
            getProducts().then((products) => {
                window.products = products;
                callback(products);
            });
    }

    loadInventory(restaurantId, callback) {
        if(window.inventory) {
            callback(window.inventory)
            return;
        }

        const load = () => {
            getInventory(restaurantId).then((productInv) => {
                let inventory = new Inventory(restaurantId);

                // If the product exists add it to the inventory
                for (let pd of productInv) {
                    let existing = window.products.find(x => x.id === pd.productID);
                    if (existing)
                        inventory.items.push(new InventoryItem(existing, pd.stock, pd.minVal));
                }
                window.inventory = inventory;
                callback(inventory);
            });
        }

        if (window.products) {
            load();
        } else {
            getProducts().then((products) => {
                window.products = products;
                load();
            });
        }
    }

    addItem(item) {
        let inventory = window.inventory;
        if(inventory) {
            addInventoryItem(item, inventory.restaurantId).then((valid) => {
                if(valid) {
                    inventory.items.push(item);
                    console.log("Added: ");
                    console.log(item);
                }
            });
        }
    }

    removeItem(item) {
        let inventory = window.inventory;
        if(inventory) {
            deleteInventoryItem(item, inventory.restaurantId).then((valid) => {
                if(valid) {
                    inventory = inventory.items.filter(i => i.product.id !== item.product.id);
                    console.log("Removed: ");
                    console.log(item);
                }
            });
        }
    }

    changeStock() {
        
    }

    changeMinStock() {

    }
}