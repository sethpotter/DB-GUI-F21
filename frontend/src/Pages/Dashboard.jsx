import React, { useState, useEffect } from 'react';
import { Product } from '../Models/Product';
import { Navbar } from '../Components/Navbar';
import { ProductList } from '../Components/ProductList';
import { ProductSearch } from '../Components/ProductSearch';
import {InventoryService} from "../Services/InventoryService";
import {getLoggedIn} from "../Api/UserRoutes";
import {UserService} from "../Services/UserService";

let str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

export const DashboardPage = props => {

    const inventoryService = new InventoryService();
    const userService = new UserService();

    const productList = [
        new Product(1, "Beer", str, "https://via.placeholder.com/350", 1, 5),
        new Product(2, "Wine", str, "https://via.placeholder.com/350", 8, 5),
        new Product(3, "Salt", str, "https://via.placeholder.com/350", 0.3, 2),
        new Product(4, "Chips", str, "https://via.placeholder.com/350", 1.7, 8),
        new Product(5, "Salmon", str, "https://via.placeholder.com/350", 4.5, 1),
        new Product(6, "Sugar", str, "https://via.placeholder.com/350", 0.3, 6),
        new Product(7, "Vinegar", str, "https://via.placeholder.com/350", 23, 2),
        new Product(8, "Tilapia", str, "https://via.placeholder.com/350", 4.5, 10)
    ]

    const [ products = productList, setProducts ] = useState(undefined);

    useEffect(() => {

        // UserService gets the user currently logged in.
        // InventoryService use these to fetch data from inventory or products

        // Inventory is an array of 'items' which are (InventoryItem)s
        // InventoryItem includes stock and minVal also.

        userService.loadUser((user) => {

        });
        inventoryService.loadInventory(1, (inventory) => { // Load restaurant 1 inventory

        });
        inventoryService.loadProducts((products) => { // Returns all the products available.

        });

        onSearch();
    }, []);

    let onSearch = params => {
        console.log()

        if(!params)
            return productList;

        return productList.filter((productList) => {
            const productName = productList.name.toLowerCase();
            return productName.includes(params.name.toLowerCase());
            });
    }

    return <>
        <Navbar />
        <br />
        <div className="container margin-top">
            <h1 className="">Dashboard</h1>
            <br />
            <ProductSearch onSearch={ params => setProducts(onSearch(params))}/>
            <br />
        </div>
        <ProductList products={products}/>

    </>

}

export default DashboardPage;
