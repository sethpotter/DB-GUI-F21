import React, { useState, useEffect } from 'react';
import { Navbar } from '../Components/Navbar';
import { ProductList } from '../Components/ProductList';
import { ProductSearch } from '../Components/ProductSearch';
import { InventoryService } from "../Services/InventoryService";
import { UserService } from "../Services/UserService";
import { Inventory } from "../Models/Inventory";
import { User } from "../Models/User";
import "../Styles/Dashboard.scss";

export const DashboardPage = props => {

    const inventoryService = new InventoryService();
    const userService = new UserService();

    const [ inventory, setInventory ] = useState(new Inventory());
    const [ items, setItems ] = useState([]); // Used for search

    const [ user, setUser ] = useState(new User());

    useEffect(() => {
        userService.loadUser((user) => {
            setUser(user);
            inventoryService.loadInventory(user.restaurantId, (inventory) => {
                setInventory(inventory);
                setItems(inventory.items);
            });
        });

        onSearch();
    }, []);

    let onSearch = params => {
        if(!params)
            return inventory.items;

        return inventory.items.filter((item) => {
            const productName = item.product.name.toLowerCase();
            return productName.includes(params.name.toLowerCase());
        });
    }

    return <>
        <Navbar />
        <div className="dashboard-root">
            <div className="container margin-top">
                <div className="panel">
                    <br/>
                    <div>
                        <h1 className="ps-3 inter text-muted">Dashboard</h1>
                        <ProductSearch onSearch={ params => setItems(onSearch(params))}/>
                    </div>
                </div>
            </div>
            <ProductList items={items}/>
        </div>
    </>

}

export default DashboardPage;
