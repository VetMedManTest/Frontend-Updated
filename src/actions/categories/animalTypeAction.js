import { ANIMAL_TYPE_LOAD_FAIL, ANIMAL_TYPE_LOAD_REQUEST, ANIMAL_TYPE_LOAD_SUCCESS } from "../../constants/categories/animalTypeConstants";
import axios from 'axios'
import { API_URL } from "../../api";
axios.defaults.withCredentials = true;

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