import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/user/Login';
import Product from './components/product/Product';
import ProductDetails from './components/product/ProductDetails';
import Register from './components/user/Register';
import store from './store'
import { LoadUser } from './actions/userAction';
import Profile from './components/user/Profile';
import { useSelector } from 'react-redux';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/shipping/Shipping';
import ConfirmOrder from './components/shipping/ConfirmOrder';
import Success from './components/shipping/Success';
import MyOrders from './components/orders/MyOrders';
import OrderDetails from './components/orders/OrderDetails';
import BillingAddress from './components/shipping/BillingAddress';
import ScrollToTop from './scrollToTop';
const ProtectedRoute = ({children}) => {
  const { isAuthenticated} = useSelector((state)=>state.user);
  if(!isAuthenticated ){
      return <Navigate to= "/login" />
  }
  return children
}
/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */

function App() {

    /**
   * Load user data on component mount.
   */
    store.dispatch(LoadUser());


  return (
    <>
    <Router>
      <ScrollToTop/>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Product />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route path='/cart' element={<Cart /> }/>
        <Route path='/orders' element={<MyOrders /> }/>

        <Route path='/profile' element={  
           /**
               * Protected route for user profile.
               * @returns {JSX.Element} The rendered Profile component.
           */ 
           <ProtectedRoute>
            <Profile />
          </ProtectedRoute>} 
          />
        <Route path='/shipping' element={   
            /**
               * Protected route for shipping details.
               * @returns {JSX.Element} The rendered Shipping component.
            */
           <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>} 
          />
        <Route path='/billing/address' element={  
           /**
               * Protected route for billing address.
               * @returns {JSX.Element} The rendered BillingAddress component.
            */ 
           <ProtectedRoute>
            <BillingAddress />
          </ProtectedRoute>} 
          />
        <Route path='/order/confirm' element={   
           /**
               * Protected route for order confirmation.
               * @returns {JSX.Element} The rendered ConfirmOrder component.
            */
           <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>} 
          />
        <Route path='/success' element={ 
           /**
               * Route for success page.
               * @returns {JSX.Element} The rendered Success component.
            */  
            <Success />
        } 
          />
            <Route path='/order/:id' element={ 
               /**
               * Protected route for order details.
               * @returns {JSX.Element} The rendered OrderDetails component.
               */  
           <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>} 
          />

        <Route path='/password/update' element={  
               /**
               * Protected route for updating password.
               * @returns {JSX.Element} The rendered UpdatePassword component.
               */ 
           <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>} 
          />


        {/* product categories routes */}
        <Route path='/search/treatment/:treatment' element={<Product />} />
        <Route path='/search/essential/:essential' element={<Product />} />
        <Route path='/search/medical/:medical' element={<Product />} />
        <Route path='/search/animal/:animal' element={<Product />} />
        <Route path="/search/:keyword" element={<Product />} />
        </Routes>
    </Router>
    </>
  );

 
  
}


export default App;
