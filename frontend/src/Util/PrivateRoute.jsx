import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLogin } from './utils';

const PrivateRoute = ({ children }) => {
    return (
        isLogin() ? children : <Navigate to="/login" />
    );
  };
  
export default PrivateRoute;