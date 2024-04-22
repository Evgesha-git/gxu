import { createSlice } from "@reduxjs/toolkit";

const initState = {
    loading: false,
    headerData: null,
    idData: null,
    error: null,
};

export const dataSlice = createSlice({
    name: "hader",
    initialState: initState,
    reducers: {
        setLoading(state) {
            state.loading = true;
        },
        setData(state, action) {
            state.loading = false;
            state.headerData = action.payload;
            state.error = null;
        },
        setError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        setUnicData(state, action) {
            state.loading = false;
            state.error = null;
            state.idData = action.payload;
        }
    },
});

export default dataSlice.reducer;
