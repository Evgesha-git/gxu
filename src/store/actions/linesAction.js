import { lineSlice } from "../redusers/lineSlice";
import httpClient from '../../utils/httpClient';

export const getLinesData = () => async (dispatch) => {
    try {
        dispatch(lineSlice.actions.setLoading());
        const resp = await httpClient.get('/f_pers_young_spec/');
        const data = await resp.data;
        dispatch(lineSlice.actions.setLineData(data));
    } catch (error) {
        dispatch(lineSlice.actions.setError(error.message));
    }
}

export const getIdLinesData = (id) => async (dispatch) => {
    try {
        dispatch(lineSlice.actions.setLoading());
        const resp = await httpClient.get(`/f_pers_young_spec/${id}`);
        const data = await resp.data;
        dispatch(lineSlice.actions.setIdLine(data));
    } catch (error) {
        dispatch(lineSlice.actions.setError(error.message));
    }
}

