import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducers } from './reducers/productReducers';
import { loadAnimalTypeReducer } from './reducers/categories/animalTypeReducer';
import { loadTreatmentTypeReducer } from './reducers/categories/treatmentTypeReducer';
import { loadDailyEssentialTypeReducer } from './reducers/categories/dailyEssentialsTypeReducer';
import { loadMedicalCareTypeReducer } from './reducers/categories/medicalCareTypeReducers';
import { UpdatePasswordReducer, forgotPasswordReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/orderReducer';


//combine reducers
const reducer = combineReducers({
   products: productsReducers,
   animalTypeAll: loadAnimalTypeReducer,
   treatmentTypeAll: loadTreatmentTypeReducer,
   dailyEssentialTypeAll: loadDailyEssentialTypeReducer,
   medicalCareTypeAll: loadMedicalCareTypeReducer,
   productDetails:productDetailsReducer,
   user:userReducer,
   updatePassword: UpdatePasswordReducer,
   forgotPassword:forgotPasswordReducer,
   cart:cartReducer,
   newOrder:newOrderReducer,
   myOrders: myOrdersReducer,
   orderDetails: orderDetailsReducer,
   newReview: newReviewReducer,
   newProduct:newProductReducer,
   product: productReducer,
});

//initial state
let initialState = {
   cart:{
      cartItems: localStorage.getItem("vetcartItems") ?
      JSON.parse(localStorage.getItem("vetcartItems"))
      : [],
      shippingInfo: localStorage.getItem("vetshippingInfo")
      ? JSON.parse(localStorage.getItem("vetshippingInfo"))
      :{},
      billingInfo: localStorage.getItem("vetbillingInfo")
      ? JSON.parse(localStorage.getItem("vetbillingInfo"))
      :{},
  },
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;