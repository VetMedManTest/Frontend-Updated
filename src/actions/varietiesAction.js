import { GET_VARIETY_DETAILS_FAILURE, GET_VARIETY_DETAILS_REQUEST, GET_VARIETY_DETAILS_SUCCESS } from "../constants/varietiesConstant";
import axios from 'axios'
import { API_URL } from "../api";
axios.defaults.withCredentials = true;

//get variety details
export const getVarietyDetails = (varietyId) => async (dispatch) => {
    try {
      dispatch({ type: GET_VARIETY_DETAILS_REQUEST });
  
     const { data } = await axios.get(`${API_URL}/api/v1/varieties/${varietyId}`)
      dispatch({
        type: GET_VARIETY_DETAILS_SUCCESS,
        payload: data.variety,
      });
    } catch (error) {
      dispatch({
        type: GET_VARIETY_DETAILS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };