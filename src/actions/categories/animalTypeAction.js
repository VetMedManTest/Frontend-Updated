/**
 * Action creator for loading animal types.
 * Dispatches appropriate actions based on the API request status.
 * @module animalTypeLoadAction
 */

import { ANIMAL_TYPE_LOAD_FAIL, ANIMAL_TYPE_LOAD_REQUEST, ANIMAL_TYPE_LOAD_SUCCESS } from "../../constants/categories/animalTypeConstants";
import axios from 'axios'
import { API_URL } from "../../api";
axios.defaults.withCredentials = true;

/**
 * Action creator for loading animal types.
 *
 * @function animalTypeLoadAction
 * @returns {Function} - An asynchronous function that dispatches actions based on the API request status.
 *
 * @throws {Error} If there is an error while loading animal types.
 */

export const animalTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: ANIMAL_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/v1/animal`);
        dispatch({
            type: ANIMAL_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ANIMAL_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}