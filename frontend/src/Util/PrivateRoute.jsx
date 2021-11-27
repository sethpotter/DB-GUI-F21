import React from 'react';
import {Link} from 'react-router-dom';
import {isLogin} from './utils';

export const PrivateRoute = ({children}) => {
    return (
        isLogin() ? children : <Link to="/login"/>
    );
};