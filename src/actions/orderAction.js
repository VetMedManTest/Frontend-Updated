import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL, 
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/orderConstant";

import axios from "axios";
import { API_URL } from "../api";
axios.defaults.withCredentials = true;

/**
 * Action to create an order.
 *
 * @function createOrder
 * @async
 * @param {object} order - The order object containing order details.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while creating the order.
 */

// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(`${API_URL}/api/v1/order/new`, order, config);
  
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  /**
 * Action to fetch a user's orders.
 *
 * @function myOrders
 * @async
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while fetching the user's orders.
 */
 // My Orders
 export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/v1/myorders`);

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
 
/**
 * Action to fetch order details.
 *
 * @function getOrderDetails
 * @async
 * @param {string} id - The ID of the order to fetch details for.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while fetching the order details.
 */

//Order Details action
export const getOrderDetails = (id) => async (dispatch)=>{
  try {
      dispatch({type : ORDER_DETAILS_REQUEST});

      const {data} = await axios.get(`${API_URL}/api/v1/order/${id}`);

      dispatch({type: ORDER_DETAILS_SUCCESS,payload: data.order});
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
    
  }
}

/**
 * Action to clear errors.
 *
 * @function clearErrors
 * @async
 * @returns {Promise} - A promise that resolves when the action is completed.
 */

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };