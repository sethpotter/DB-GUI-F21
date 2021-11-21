import './App.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DashboardPage from './Pages/Dashboard';
import LoginPage from './Pages/Login';
import SignUpPage from './Pages/SignUp';
import OrderPage from './Pages/Order';
import DeliveriesPage from './Pages/Deliveries';
import StockPage from './Pages/Stock';
import PrivateRoute from './Util/PrivateRoute';

function App () {

  // General routing for now until we figure out user types. (Supplier etc..)
  // I will try to update the routing later to accommodate that.
  return (
	<>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/" element={
                    <PrivateRoute>
                        <DashboardPage/>
                    </PrivateRoute>
                }/>
                <Route path="/order" element={
                    <PrivateRoute>
                      <OrderPage/>
                    </PrivateRoute>
                }/>
                <Route path="/deliveries" element={
                    <PrivateRoute>
                        <DeliveriesPage/>
                    </PrivateRoute>
                }/>
                <Route path="/stock" element={
                    <PrivateRoute>
                        <StockPage/>
                    </PrivateRoute>
                }/>
            </Routes>
        </BrowserRouter>
	</>
  );
}

export default App;
