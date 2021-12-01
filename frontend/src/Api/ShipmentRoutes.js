import axios from "axios";
import {url} from "../Util/url";
import {Product} from "../Models/Product";
import {toQuery} from "../Util/utils";
import {Shipment} from "../Models/Shipment";

/// TODO Deal with OrderDetails and Orders here. Merge these
/**
 * Adds an order to the order table.
 * @param order
 * @returns {Promise<boolean>}
 */
const addOrder = (order) => {
    let request = {
        orderId: order.id,
        orderDate: order.orderDate,
        shippedDate: order.shippedDate,
        arrivalDate: order.arrivalDate,
        address: order.address,
        carrier: order.carrier,
        delivered: order.delivered
    };

    return axios.post(`http://${url}:8000/order?` + toQuery(request)).then(res => {
        console.log(res);

        let promiseArr = [];
        for(const i of order.items)
            promiseArr.push(addOrderDetail(order.id, i.product, i.stock));

        Promise.all(promiseArr).then(() => {
            return true;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

/**
 * Update an order on the order table.
 * @param order
 * @returns {Promise<boolean>}
 */
const updateOrder = (order) => {
    let request = {
        orderDate: order.orderDate,
        shippedDate: order.shippedDate,
        arrivalDate: order.arrivalDate,
        address: order.address,
        carrier: order.carrier,
        delivered: order.delivered
    };

    deleteOrderDetail(order.id).then(() => {
        return axios.put(`http://${url}:8000/order/${order.id}?` + toQuery(request)).then(res => {
            console.log(res);

            let promiseArr = [];
            for(const i of order.items)
                promiseArr.push(addOrderDetail(order.id, i.product, i.stock));

            Promise.all(promiseArr).then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });
        }).catch(err => {
            console.log(err.response);
            return false;
        });
    });
}

const deleteOrder = (order) => {
    deleteOrderDetail(order.id).then(() => {
        return axios.delete(`http://${url}:8000/order/` + order.id).then(res => {
            console.log(res);
            return true;
        }).catch(err => {
            console.log(err.response);
            return false;
        });
    });
}

const getOrder = (orderId) => {
    return axios.get(`http://${url}:8000/order/` + orderId).then(res => {
        console.log(res);
        let data = res.data[0];
        let order = new Shipment(data.orderID,
                                 data.orderDate,
                                 data.sentDate,
                                 data.estArrival,
                                 data.address,
                                 data.carrier,
                                 data.delivered,
                                 data.RestaurantID,
                                 []
        );

        return getOrderDetail(order.id).then((itemsData) => {
            for(const i of itemsData) {
                order.items.push({productId: i.productID, quantity: i.quantity});
            }
            console.log(order.items);

            return order;
        }).catch(err => {
            console.log(err.response);
            return null;
        });
    }).catch(err => {
        console.log(err.response);
        return null;
    });
}

const addOrderDetail = (orderId, productId, quantity) => {
    let request = {
        orderId: orderId,
        productId: productId,
        quantity: quantity
    };

    return axios.post(`http://${url}:8000/orderDetails?` + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

const updateOrderDetail = (orderId, productId, quantity) => {
    let request = {
        orderId: orderId,
        productId: productId,
        quantity: quantity
    };

    return axios.put(`http://${url}:8000/orderDetails?` + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

/**
 * Leave off product to delete all products associated with an orderId
 * @param orderId
 * @param productId
 * @returns {Promise<boolean>}
 */
const deleteOrderDetail = (orderId, productId) => {
    let request = {
        orderId: orderId,
        productId: productId
    };

    return axios.delete(`http://${url}:8000/orderDetails?` + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

const getOrderDetail = (orderId, productId) => {
    let request = {
        orderId: orderId,
        productId: productId
    };

    return axios.get(`http://${url}:8000/orderDetails?` + toQuery(request)).then(res => {
        console.log(res);
        return res.data;
    }).catch(err => {
        console.log(err.response);
        return null;
    });
}

export {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    addOrderDetail,
    updateOrderDetail,
    deleteOrderDetail,
    getOrderDetail
}