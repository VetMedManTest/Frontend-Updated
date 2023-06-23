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
import ROQModel from './components/ROQ';
import Footer from './components/Footer';
const ProtectedRoute = ({children}) => {
  const { isAuthenticated} = useSelector((state)=>state.user);
  if(!isAuthenticated ){
      return <Navigate to= "/login" />
  }
  return children
}

function App() {
  store.dispatch(LoadUser())
  return (
    <>
    <ROQModel/>
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
           <ProtectedRoute>
            <Profile />
          </ProtectedRoute>} 
          />
        <Route path='/shipping' element={   
           <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>} 
          />
        <Route path='/billing/address' element={   
           <ProtectedRoute>
            <BillingAddress />
          </ProtectedRoute>} 
          />
        <Route path='/order/confirm' element={   
           <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>} 
          />
        <Route path='/success' element={   
            <Success />
        } 
          />
            <Route path='/order/:id' element={   
           <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>} 
          />

        <Route path='/password/update' element={   
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
        <Footer/>
    </Router>
    </>
  );

 
  
}


export default App;
