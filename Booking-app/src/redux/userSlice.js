import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authApi from "../api/authApi";

export const getAllManager = createAsyncThunk('managers/getAll', async (params, thunkApi) => {
    const response = await authApi.getAll();
    
    thunkApi.dispatch(setManagers(response));

    return response;
})

const initialManager = {
    managers: []
}

const categorySlice = createSlice({
    name: 'manager',
    initialState: initialManager,
    reducers: {
        setManagers: (state, action) => {
            state.managers = action.payload;
        }
    }
})

const { reducer, actions } = categorySlice;

export const { setManagers } = actions;
export default reducer;