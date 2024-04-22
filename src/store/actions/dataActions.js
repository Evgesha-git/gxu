import httpClient from "../../utils/httpClient";
import { dataSlice } from "../redusers/dataSlice";

export const getDataItem = (id) => async (dispatch) => {
    try {
        dispatch(dataSlice.actions.setLoading());
        const resp = await httpClient.get(`f_pers_young_spec_line/${id}/`)
        const data = await resp.data;
        dispatch(dataSlice.actions.setUnicData(data));
    } catch (error) {
        dispatch(dataSlice.actions.setError(error.message))
    }
}

export const patchDataItem = (id, data, user) => async (dispatch) => {
    try {
        dispatch(dataSlice.actions.setLoading());
        const resp = await Promise.all([httpClient.patch(`/f_pers_young_spec_line/${id}/`, data), httpClient.patch(`/f_pers_young_spec/${id}/`, user)]);
    } catch (error) {
        dispatch(dataSlice.actions.setError(error.message));
    }
}

export const setDataItem = (data, user) => async (dispatch) => {
    try {
        dispatch(dataSlice.actions.setLoading());
        const resp = await Promise.all([httpClient.post(`/f_pers_young_spec_line/`, data), httpClient.post(`/f_pers_young_spec/`, user)]);
    } catch (error) {
        dispatch(dataSlice.actions.setError(error.message));        
    }
}