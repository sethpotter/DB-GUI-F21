import React from 'react';
import Logo from '../Resources/logo.svg';
import Bell from '../Resources/notification.svg';
import Dropdown from '../Resources/down_arrow.svg';

export class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.pages = {
            'Inventory' : '/',
            'Order' : '/order',
            'Deliveries' : 'deliveries'
        };

        this.state = {
            activePage: Object.keys(this.pages)[0],
            user: 'japple.seed'
        }
    }

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg nav-border py-3">
                    <img id="logo" className="px-5" src={Logo} alt="Logo" />
                    <div>
                        {
                            Object.keys(this.pages).map((name, i) =>
                                <a href={this.pages[name]}
                                   key={name}
                                   className={this.state.activePage === name ? 'btn nav-btn px-4 mx-4 active' : 'btn nav-btn px-4 mx-4'}
                                   onClick={ () => {this.setState({activePage: name});}}
                                >
                                    {name}
                                </a>
                            )
                        }
                    </div>
                    <div className="ms-auto px-1">
                        <button id="notifications" className="btn circle-btn">
                            <img src={Bell} alt="Notifications" />
                        </button>
                    </div>
                    <div className="me-4 ms-4">
                        <button id="account" className="btn">
                            <h5 className="nav-text-primary fw-bold">Logged In</h5>
                            <div className="d-flex justify-content-center">
                                <h6>{this.state.user}</h6>
                                <img className="align-self-center pb-1 ms-1" id="dropdown" src={Dropdown} alt="Account help"/>
                            </div>
                        </button>
                    </div>
                </nav>
            </>
        );
    }
}