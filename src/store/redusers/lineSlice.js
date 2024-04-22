import { createSlice } from "@reduxjs/toolkit";

const initState = {
    loading: false,
    lineData: null,
    lineIdData: null,
    error: null,
}

export const lineSlice = createSlice({
    name: 'line',
    initialState: initState,
    reducers: {
        setLoading(state) {
            state.loading = true;
        },
        setLineData(state, action) {
            state.loading = false;
            state.lineData = action.payload;
            state.error = null;
        },
        setIdLine(state, action){
            state.loading = false;
            state.lineIdData = action.payload;
            state.error = null;
        },
        setError(state, action){
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default lineSlice.reducer;