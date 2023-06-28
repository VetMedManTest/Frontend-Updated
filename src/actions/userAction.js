import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_ERRORS

} from '../constants/userConstants'

import axios from 'axios'
import { API_URL } from "../api";
axios.defaults.withCredentials = true;

/**
 * Action to log in a user.
 *
 * @function login
 * @async
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise} - A promise that resolves when the login action is completed.
 *
 * @throws {Error} If there is an error during the login process.
 */

//login action
export const login =(email,password) => async (dispatch)=>{
    try{
        dispatch({ type:LOGIN_REQUEST })

        const config = { headers: {"Content-Type": "application/json" } };

        const { data } =  await axios.post(
            `${API_URL}/api/v1/login`,
            {email, password},
            config
        )

        dispatch({type:LOGIN_SUCCESS, payload:data.user})
    }
    catch(error){
        dispatch({ type:LOGIN_FAIL, payload:error.response.data.message });
    }
}

/**
 * Action to register a new user.
 *
 * @function register
 * @async
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise} - A promise that resolves when the registration action is completed.
 *
 * @throws {Error} If there is an error during the registration process.
 */

//register
export const register = (name,email,password) => async(dispatch)=>{
        try{
            dispatch({type:REGISTER_USER_REQUEST})

            const config = { headers: {"Content-Type": "application/json" } };

            const { data } = await axios.post(`${API_URL}/api/v1/register`,{name,email,password},config)

            dispatch({type:REGISTER_USER_SUCCESS, payload:data.user})

        }
        catch(error){
            dispatch({ type:REGISTER_USER_FAIL, payload:error.response.data.message });

        }
}

/**
 * Action to load the user's data.
 *
 * @function LoadUser
 * @async
 * @returns {Promise} - A promise that resolves when the user's data is loaded.
 *
 * @throws {Error} If there is an error while loading the user's data.
 */

//Load  User
export const LoadUser =() => async (dispatch)=>{
    try{
        dispatch({ type:LOAD_USER_REQUEST })


        const { data } =  await axios.get(`${API_URL}/api/v1/me`)

        dispatch({type:LOAD_USER_SUCCESS, payload:data.user})
    }
    catch(error){
        dispatch({ type:LOAD_USER_FAIL, payload:error.response.data.message });
    }
}

/**
 * Action to log out the user.
 *
 * @function logout
 * @async
 * @returns {Promise} - A promise that resolves when the user is logged out.
 *
 * @throws {Error} If there is an error while logging out the user.
 */
//User Logout
export const logout =() => async (dispatch)=>{
    try{
         await axios.get(`${API_URL}/api/v1/logout`)

         dispatch({ type:LOGOUT_USER_SUCCESS })


    }
    catch(error){
        dispatch({ type:LOGOUT_USER_FAIL, payload:error.response.data.message });
    }
}

/**
 * Action to update the user's password.
 *
 * @function updatePassword
 * @async
 * @param {object} passwords - Object containing the current password and the new password.
 * @param {string} passwords.currentPassword - The user's current password.
 * @param {string} passwords.newPassword - The user's new password.
 * @returns {Promise} - A promise that resolves when the password is successfully updated.
 *
 * @throws {Error} If there is an error while updating the password.
 */
//Update Password
export const updatePassword = (passwords) => async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST})

        const config = { headers: {"Content-Type": "application/json" } };

        const { data } = await axios.put(`${API_URL}/api/v1/password/update`,passwords,config)

        dispatch({type:UPDATE_PASSWORD_SUCCESS, payload:data.success})

    }
    catch(error){
        dispatch({ type:UPDATE_PASSWORD_FAIL, payload:error.response.data.message });

    }
}

/**
 * Action to request a password reset email for a user.
 *
 * @function forgotPassword
 * @async
 * @param {string} email - The email address of the user.
 * @returns {Promise} - A promise that resolves when the password reset email is successfully sent.
 *
 * @throws {Error} If there is an error while sending the password reset email.
 */
// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`${API_URL}/api/v1/password/forgot`, email, config);
  
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };


/**
 * Action to reset the password for a user using a reset token.
 *
 * @function resetPassword
 * @async
 * @param {string} token - The reset token received via email.
 * @param {object} passwords - The new password data.
 * @param {string} passwords.password - The new password.
 * @param {string} passwords.confirmPassword - The confirmation of the new password.
 * @returns {Promise} - A promise that resolves when the password is successfully reset.
 *
 * @throws {Error} If there is an error while resetting the password.
 */
  // Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `${API_URL}/api/v1/password/reset/${token}`,
        passwords,
        config
      );
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Clearing Errors
export const clearErrors = () => async (dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}
