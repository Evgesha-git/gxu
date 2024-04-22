import httpClient from "../../utils/httpClient";
import { formSlice } from "../redusers/formSlice"

export const getFormData = () => async (dispatch) => {
    try {
        dispatch(formSlice.actions.setLoading());
        const resp = await httpClient('/nsi_pers_young_spec/');
        const data = await resp.data;
        dispatch(formSlice.actions.setFormData(data));
    } catch (error) {
        dispatch(formSlice.actions.setError(error.message))
    }
}