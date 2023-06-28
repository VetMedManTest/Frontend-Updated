import axios from 'axios'
import { MEDICAL_CARE_TYPE_LOAD_FAIL, MEDICAL_CARE_TYPE_LOAD_REQUEST, MEDICAL_CARE_TYPE_LOAD_SUCCESS } from "../../constants/categories/medicalCareConstants";
import { API_URL } from "../../api";
axios.defaults.withCredentials = true;

/**
 * Action to load medical care types.
 * It states that the function is responsible for loading medical care types and returns a promise. The function expects a dispatch function from Redux as a parameter. It also specifies that the function is asynchronous.
 *
 * @function medicalCareTypeLoadAction
 * @async
 * @param {function} dispatch - Redux dispatch function.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while loading medical care types.
 */
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