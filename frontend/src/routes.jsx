import {PrivateRoute} from "./Util/PrivateRoute";
import {
    LoginPage,
    SignUpPage,
    DashboardPage,
    Deliveries,
    OrderPage,
} from "./Pages";

export const routes = [
    { path: "/login", element: <LoginPage/> },
    { path: "/signup", element: <SignUpPage/> },
    { path: "/", element: <PrivateRoute><DashboardPage/></PrivateRoute> },
    { path: "/deliveries", element: <PrivateRoute><Deliveries/></PrivateRoute> },
    { path: "/order", element: <PrivateRoute><OrderPage/></PrivateRoute> }
]