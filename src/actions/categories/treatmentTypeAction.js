import { TREATMENT_TYPE_LOAD_FAIL, TREATMENT_TYPE_LOAD_REQUEST, TREATMENT_TYPE_LOAD_SUCCESS } from "../../constants/categories/treatmentTypeConstant";
import axios from 'axios'
import { API_URL } from "../../api";
axios.defaults.withCredentials = true;

/**
 * Action to load treatment types.
 *
 * @function treatmentTypeLoadAction
 * @async
 * @param {function} dispatch - The Redux dispatch function used to dispatch actions.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while loading treatment types.
 *
 * @description This action is responsible for loading treatment types from the API.
 * It dispatches three different actions based on the API request status: TREATMENT_TYPE_LOAD_REQUEST,
 * TREATMENT_TYPE_LOAD_SUCCESS, and TREATMENT_TYPE_LOAD_FAIL.
 * - TREATMENT_TYPE_LOAD_REQUEST: Dispatched when the request is initiated.
 * - TREATMENT_TYPE_LOAD_SUCCESS: Dispatched when the request is successful with the loaded treatment types.
 * - TREATMENT_TYPE_LOAD_FAIL: Dispatched when the request fails with the error message.
 *
 * @example
 * import { TREATMENT_TYPE_LOAD_FAIL, TREATMENT_TYPE_LOAD_REQUEST, TREATMENT_TYPE_LOAD_SUCCESS } from "../../constants/categories/treatmentTypeConstant";
 * import axios from 'axios'
 * import { API_URL } from "../../api";
 * axios.defaults.withCredentials = true;
 *
 * export const treatmentTypeLoadAction = () => async (dispatch) => {
 *     dispatch({ type: TREATMENT_TYPE_LOAD_REQUEST });
 *     try {
 *         const { data } = await axios.get(`${API_URL}/api/v1/treatment`);
 *         dispatch({
 *             type: TREATMENT_TYPE_LOAD_SUCCESS,
 *             payload: data
 *         });
 *     } catch (error) {
 *         dispatch({
 *             type: TREATMENT_TYPE_LOAD_FAIL,
 *             payload: error.response.data.error
 *         });
 *     }
 * }
 */


export const treatmentTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: TREATMENT_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/v1/treatment`);
        dispatch({
            type: TREATMENT_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: TREATMENT_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}