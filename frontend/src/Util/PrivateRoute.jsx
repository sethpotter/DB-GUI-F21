import React from 'react';
import {Navigate} from 'react-router-dom';
import {isLogin} from './utils';

export const PrivateRoute = ({children}) => {
    return (
        isLogin() ? children : <Navigate to="/login"/>
    );
};