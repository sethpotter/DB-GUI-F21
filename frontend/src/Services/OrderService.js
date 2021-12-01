import {addOrder, updateOrder, getOrder} from "../Api/ShipmentRoutes";
import {Shipment} from "../Models/Shipment";

export class OrderService {

    hasOrder() {
        return (this.getOrder() !== null);
    }

    getOrder() {
        if(window.order)
            return window.order;
        else
            return null;
    }

    loadOrder(orderId, callback) {
        getOrder(orderId).then((order) => {
            window.order = order;
            callback(order);
        });
    }

    postOrder(restaurantId, address, carrier, items, callback) {
        let date = new Date();
        let orderDate = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();
        let order = new Shipment(null, orderDate, null, null, address, carrier, 0, restaurantId, items);
        addOrder(order).then((valid) => {
            if(valid) {
                console.log("Posted order: ");
                console.log(order);
                callback();
            }
        });
    }

    updateOrder(order, callback) {
        updateOrder(order).then((valid) => {
            if(valid) {
                console.log("Update order: ");
                console.log(order);
                callback();
            }
        });
    }

}