import React, { useState, useEffect } from 'react';
import { Product } from '../Models/Product';
import Navbar from '../Components/Navbar';
import { ProductList } from '../Components/ProductList';
import { ProductSearch } from '../Components/ProductSearch';

let str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

export const DashboardPage = props => {
    const productList = [
        new Product(1, "Beer", str, "https://via.placeholder.com/350", 1, 5),
        new Product(2, "Wine", str, "https://via.placeholder.com/350", 0, 5),
        new Product(3, "Salt", str, "https://via.placeholder.com/350", 0.3, 6),
        new Product(4, "Chips", str, "https://via.placeholder.com/350", 1.5, 8),
        new Product(5, "Salmon", str, "https://via.placeholder.com/350", 4.5, 10),
        new Product(6, "Sugar", str, "https://via.placeholder.com/350", 0.3, 6),
        new Product(7, "Vinegar", str, "https://via.placeholder.com/350", 0, 8),
        new Product(8, "Tilapia", str, "https://via.placeholder.com/350", 4.5, 10)
    ]

    const [ products = productList, setProducts ] = useState(undefined);



    useEffect(() => {
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
