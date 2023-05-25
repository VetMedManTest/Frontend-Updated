import { DAILY_ESSENTIALS_TYPE_LOAD_FAIL, DAILY_ESSENTIALS_TYPE_LOAD_REQUEST, DAILY_ESSENTIALS_TYPE_LOAD_SUCCESS } from "../../constants/categories/dailyEssentialsConstants";
import axios from 'axios'
import { API_URL } from "../../api";
axios.defaults.withCredentials = true;

export const dailyEssentialsTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: DAILY_ESSENTIALS_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/api/v1/essential`);
        dispatch({
            type: DAILY_ESSENTIALS_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DAILY_ESSENTIALS_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}