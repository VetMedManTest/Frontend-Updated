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
