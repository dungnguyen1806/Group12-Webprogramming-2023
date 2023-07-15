import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import statisticalApi from "../api/statisticalApi"

export const getAllStatistical = createAsyncThunk('statisticals/getAllStatistical', async (params, thunkApi) => {
    const response = await statisticalApi.getAll();

    thunkApi.dispatch(setStatisticalData(response));
    
    return response;
})

const initialService = {
    statisticals: []
}

const statisticalSlice = createSlice({
    name: 'statistical',
    initialState: initialService,
    reducers: {
        setStatisticalData: (state, action) => {
            state.statisticals = action.payload;
        }
    }
})

const { reducer, actions } = statisticalSlice;

export const { setStatisticalData } = actions;
export default reducer;