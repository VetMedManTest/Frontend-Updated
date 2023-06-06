import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    RESET_CART,
    SAVE_BILLING_INFO,
    SAVE_SHIPPING_INFO,
  } from "../constants/cartConstant"

  import axios from 'axios'

  import { API_URL } from "../api";
  axios.defaults.withCredentials = true;
  


  // Add to Cart
  export const addItemsToCart = (id, quantity, userId) => async (dispatch, getState) => {
    const { data } = await axios.get(`${API_URL}/api/v1/product/${id}`);
    let storedVarieties = null;
    // Check if varieties are selected for the product
    if (data.product.varieties) {
      storedVarieties = JSON.parse(localStorage.getItem("VetselectedValues"));
    }
    let payload = {
      product: data.product._id,
      name: data.product.name,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    };
    // Check if varieties are selected for the product
    if (storedVarieties) {
      payload.varieties = storedVarieties;
    }
    dispatch({
      type: ADD_TO_CART,
      payload,
    });
    localStorage.setItem("vetcartItems", JSON.stringify(getState().cart.cartItems));
  };

  // REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("vetcartItems", JSON.stringify(getState().cart.cartItems));
  };

  
  // SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("vetshippingInfo", JSON.stringify(data));
  };

  // SAVE BILLING INFO
export const saveBillingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_BILLING_INFO,
      payload: data,
    });
  
    localStorage.setItem("vetbillingInfo", JSON.stringify(data));
  };

// Reset Cart
export const resetCart = () => async (dispatch) => {
  dispatch({
    type: RESET_CART,
  });

  localStorage.removeItem("vetcartItems");
  //localStorage.removeItem("vetshippingInfo");
};