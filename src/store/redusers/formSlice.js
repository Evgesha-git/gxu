import { createSlice } from "@reduxjs/toolkit";

const initState = {
    loading: false,
    formData: null,
    error: null
}

export const formSlice = createSlice({
    name: 'form',
    initialState: initState,
    reducers: {
        setLoading(state){
            state.loading = true;
        },
        setFormData(state, action){
            state.loading = false;
            state.formData = action.payload;
            state.error = null;
        },
        setError(state, action){
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default formSlice.reducer;