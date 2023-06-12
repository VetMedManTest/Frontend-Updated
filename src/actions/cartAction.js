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
  
/**
 * Action to add items to the cart.
 *
 * @function addItemsToCart
 * @async
 * @param {string} id - The ID of the product to add to the cart.
 * @param {number} quantity - The quantity of the product to add to the cart.
 * @param {string} userId - The ID of the user.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while adding items to the cart.
 */

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


/**
 * Action to remove items from the cart.
 *
 * @function removeItemsFromCart
 * @async
 * @param {string} id - The ID of the item to remove from the cart.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while removing items from the cart.
 */

  // REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("vetcartItems", JSON.stringify(getState().cart.cartItems));
  };

  /**
 * Action to save shipping information.
 *
 * @function saveShippingInfo
 * @async
 * @param {object} data - The shipping information to save.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while saving the shipping information.
 */
 
  
  // SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("vetshippingInfo", JSON.stringify(data));
  };


  /**
 * Action to save billing information.
 *
 * @function saveBillingInfo
 * @async
 * @param {object} data - The billing information to save.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while saving the billing information.
 */


  // SAVE BILLING INFO
export const saveBillingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_BILLING_INFO,
      payload: data,
    });
  
    localStorage.setItem("vetbillingInfo", JSON.stringify(data));
  };


/**
 * Action to reset the cart.
 *
 * @function resetCart
 * @async
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @description This action provides various functions related to the cart, such as adding items to the cart,
 * removing items from the cart, saving shipping information, saving billing information, and resetting the cart.
 * It dispatches different actions based on the action type:
 * - ADD_TO_CART: Dispatched when items are added to the cart.
 * - REMOVE_CART_ITEM: Dispatched when items are removed from the cart.
 * - SAVE_SHIPPING_INFO: Dispatched when the shipping information is saved.
 * - SAVE_BILLING_INFO: Dispatched when the billing information is saved.
 * - RESET_CART: Dispatched when the cart is reset.
 *
 * @example
 * import {
 *   ADD_TO_CART,
 *   REMOVE_CART_ITEM,
 *   RESET_CART,
 *   SAVE_BILLING_INFO,
 *   SAVE_SHIPPING_INFO,
 * } from "../constants/cartConstant";
 *
 * import axios from 'axios';
 * import { API_URL } from "../api";
 * axios.defaults.withCredentials = true;
 *
 * export const addItemsToCart = (id, quantity, userId) => async (dispatch, getState) => {
 *   // ... function implementation
 * };
 *
 * export const removeItemsFromCart = (id) => async (dispatch, getState) => {
 *   // ... function implementation
 * };
 *
 * export const saveShippingInfo = (data) => async (dispatch) => {
 *   // ... function implementation
 * };
 *
 * export const saveBillingInfo = (data) => async (dispatch) => {
 *   // ... function implementation
 * };
 *
 * export const resetCart = () => async (dispatch) => {
 *   // ... function implementation
 * };
 */

// Reset Cart
export const resetCart = () => async (dispatch) => {
  dispatch({
    type: RESET_CART,
  });

  localStorage.removeItem("vetcartItems");
  //localStorage.removeItem("vetshippingInfo");
};