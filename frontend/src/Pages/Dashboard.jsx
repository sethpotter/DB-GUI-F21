import React, { useState, useEffect } from 'react';
import { Product } from '../Models/Product';
import { Navbar } from '../Components/Navbar';
import { ProductList } from '../Components/ProductList';
import { ProductSearch } from '../Components/ProductSearch';
import { InventoryService } from "../Services/InventoryService";
import { UserService } from "../Services/UserService";
import {Inventory} from "../Models/Inventory";
import {User} from "../Models/User";

export const DashboardPage = props => {

    const inventoryService = new InventoryService();
    const userService = new UserService();

    const [ inventory, setInventory ] = useState(new Inventory());
    const [ user, setUser ] = useState(new User());

    useEffect(() => {
        userService.loadUser((user) => {
            setUser(user);
            inventoryService.loadInventory(user.restaurantId, (inventory) => {
                setInventory(inventory);
            });
        });

        onSearch();
    }, []);

    let onSearch = params => {
        if(!params)
            return inventory;

        return inventory.items.filter((item) => {
            const productName = item.product.name.toLowerCase();
            return productName.includes(params.name.toLowerCase());
        });
    }

    return <>
        <Navbar />
        <br />
        <div className="container margin-top">
            <h1 className="">Dashboard</h1>
            <br />
            <ProductSearch onSearch={ params => setInventory(onSearch(params))}/>
            <br />
        </div>
        <ProductList inventory={inventory}/>
    </>

}

export default DashboardPage;
