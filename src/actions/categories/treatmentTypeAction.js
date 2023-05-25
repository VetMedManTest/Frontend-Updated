import { TREATMENT_TYPE_LOAD_FAIL, TREATMENT_TYPE_LOAD_REQUEST, TREATMENT_TYPE_LOAD_SUCCESS } from "../../constants/categories/treatmentTypeConstant";
import axios from 'axios'
import { API_URL } from "../../api";
axios.defaults.withCredentials = true;

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