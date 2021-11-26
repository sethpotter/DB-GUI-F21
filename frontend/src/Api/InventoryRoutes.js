import axios from "axios";
import {url} from "../Util/url";
import {Product} from "../Models/Product";

/**
 * Gets ALL available products.
 * @returns {Promise<*[]>}
 */
const getProducts = () => {
    return axios.get(`http://${url}:8000/allProductTable`).then(res => {
        let products = [];
        for(let p of res.data) {
            products.push(new Product(p.productID, p.name, p.description, p.priceperunit, p.image, null, null));
        }
        return products;
    }).catch(err => {
        console.log(err.response);
        return err.response;
    });
}

export {
    getProducts
}