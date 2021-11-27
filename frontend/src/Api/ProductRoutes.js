import axios from "axios";
import {url} from "../Util/url";
import {Product} from "../Models/Product";
import {toQuery} from "../Util/utils";

/**
 * Gets ALL available products.
 * @returns {Promise<*[]>}
 */
const getProducts = () => {
    return axios.get(`http://${url}:8000/product`).then(res => {
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

/**
 * Updates a product's information globally.
 * @param product
 * @returns {Promise<*[]>}
 */
const addProduct = (product) => {
    let request = {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image
    };

    return axios.post(`http://${url}:8000/product` + "?" + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}


/**
 * Updates a product's information globally.
 * @param product
 * @returns {Promise<*[]>}
 */
const updateProduct = (product) => {
    let request = {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image
    };

    return axios.put(`http://${url}:8000/product/` + product.id + "?" + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

const deleteProduct = (productId) => {
    return axios.delete(`http://${url}:8000/product/` + productId).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

export {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}