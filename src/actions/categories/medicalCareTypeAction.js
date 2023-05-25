import axios from 'axios'
import { MEDICAL_CARE_TYPE_LOAD_FAIL, MEDICAL_CARE_TYPE_LOAD_REQUEST, MEDICAL_CARE_TYPE_LOAD_SUCCESS } from "../../constants/categories/medicalCareConstants";
import { API_URL } from "../../api";
axios.defaults.withCredentials = true;


export const medicalCareTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: MEDICAL_CARE_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/v1/medical`);
        dispatch({
            type: MEDICAL_CARE_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MEDICAL_CARE_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}