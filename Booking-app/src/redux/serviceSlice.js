import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import serviceApi from "../api/serviceApi"

export const getAllService = createAsyncThunk('services/getAll', async (params, thunkApi) => {
    const response = await serviceApi.getAll();

    thunkApi.dispatch(setServices(response));

    return response;
})

const initialService = {
    services: []
}

const serviceSlice = createSlice({
    name: 'service',
    initialState: initialService,
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload;
        }
    }
})

const { reducer, actions } = serviceSlice;

export const { setServices } = actions;
export default reducer;