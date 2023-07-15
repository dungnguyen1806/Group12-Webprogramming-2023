import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import destinationApi from "../api/destinationApi";

export const getAllDestination = createAsyncThunk('destinations/getAll', async (params, thunkApi) => {
    const response = await destinationApi.getAll();
    
    thunkApi.dispatch(setDestinations(response));

    return response;
})

const initialDestination = {
    destinations: []
}

const categorySlice = createSlice({
    name: 'destination',
    initialState: initialDestination,
    reducers: {
        setDestinations: (state, action) => {
            state.destinations = action.payload;
        }
    }
})

const { reducer, actions } = categorySlice;

export const { setDestinations } = actions;
export default reducer;