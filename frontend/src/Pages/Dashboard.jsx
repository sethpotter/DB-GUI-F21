import React, { useState, useEffect } from 'react';
import { Navbar } from '../Components/Navbar';
import { ProductList } from '../Components/ProductList';
import { ProductSearch } from '../Components/ProductSearch';
import { InventoryService } from "../Services/InventoryService";
import { UserService } from "../Services/UserService";
import { Inventory } from "../Models/Inventory";
import {User, UserTypes} from "../Models/User";
import "../Styles/Dashboard.scss";

export const DashboardPage = props => {

    const inventoryService = new InventoryService();
    const userService = new UserService();

    const [ inventory, setInventory ] = useState(new Inventory());
    const [ items, setItems ] = useState([]); // Used for search

    const [ user, setUser ] = useState(new User());

    useEffect(() => {
        inventoryService.clear();
        setInventory(new Inventory());
        setItems([]);

        userService.loadUser((user) => {
            setUser(user);

            if(user.userType !== UserTypes.SUPPLIER) {
                inventoryService.loadInventory(user.restaurantId, (inventory) => {
                    setInventory(inventory);
                    setItems(inventory.items);
                });
            }
        });
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
                        <h1 className="ps-5 inter text-muted fw-light">Dashboard</h1>
                        <ProductSearch onSearch={ params => setItems(onSearch(params))}/>
                    </div>
                </div>
            </div>
            {(inventory.restaurantId !== undefined) ? <ProductList items={items}/> :
                <div>
                    <center>
                        <h2 className="mt-5 inter text-muted fw-bold">Inventory is Empty</h2>
                        <h5 className="inter text-muted fw-light">Type a restaurant name and click the load button.</h5>
                    </center>
                </div>
            }
            {(inventory.restaurantId !== undefined && items.length === 0) ?
                <div>
                    <center>
                        <h2 className="mt-5 inter text-muted fw-bold">No Products were Found</h2>
                        <h5 className="inter text-muted fw-light">Try a different search term.</h5>
                    </center>
                </div>
                : null
            }

        </div>
    </>

}

export default DashboardPage;
