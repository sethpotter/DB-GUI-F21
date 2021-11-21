import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom"; // TODO

import LogoImg from '../Resources/logo.svg';
import BellImg from '../Resources/notification.svg';
import DropdownImg from '../Resources/down_arrow.svg';

import {User} from "../Models/User";

import '../Styles/Navbar.scss';

export const Navbar = props => {

    const pages = {
        'Inventory' : '/',
        'Order' : '/order',
        'Deliveries' : 'deliveries'
    };

    const [activePage, setActivePage] = useState(Object.keys(pages)[0]);
    const [user, setUser] = useState(new User(0, "japple.seed", "", "", ""));

    useEffect(() => {

    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg nav-border py-3">
                <img id="logo" className="px-5" src={LogoImg} alt="Logo" />
                <div>
                    {
                        Object.keys(pages).map((name, i) =>
                            <a href={pages[name]}
                               key={name}
                               className={activePage === name ? 'btn nav-btn px-4 mx-4 active' : 'btn nav-btn px-4 mx-4'}
                               onClick={ () => { setActivePage(name) }}
                            >
                                {name}
                            </a>
                        )
                    }
                </div>
                <div className="ms-auto px-1">
                    <button id="notifications" className="btn circle-btn">
                        <img src={BellImg} alt="Notifications" />
                    </button>
                </div>
                <div className="me-4 ms-4">
                    <Dropdown>
                        <Dropdown.Toggle id="account" className="btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <h5 className="nav-text-primary fw-bold">Logged In</h5>
                            <div className="d-flex justify-content-center">
                                <h6 className="text-black">{user.username}</h6>
                                <img className="align-self-center pb-1 ms-1" id="dropdownImg" src={DropdownImg} alt="Account help"/>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu" aria-labelledby="account">
                            <Dropdown.Item className="dropdown-item" href="/">Inventory</Dropdown.Item>
                            <Dropdown.Item className="dropdown-item" href="/order">Order</Dropdown.Item>
                            <Dropdown.Item className="dropdown-item" href="/deliveries">Deliveries</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item className="dropdown-item text-danger" href="#">Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </nav>
        </>
    );
}