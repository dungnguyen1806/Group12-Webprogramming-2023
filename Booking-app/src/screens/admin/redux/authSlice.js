import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getDataManager = createAsyncThunk("auth/getDataManager", async (params, thunkApi) => {
    thunkApi.dispatch(setAuth({ isAuthenticated: true, user: JSON.parse(localStorage.getItem("managerInfo")) }));
})

export const removeManager = createAsyncThunk("auth/removeManager", async (params, thunkApi) => {
    thunkApi.dispatch(logout());
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem("managerInfo")) || null,
        authLoading: true,
        isAuthenticated: false
    },
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        logout: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
        },

    }
})

const { reducer, actions } = authSlice;

export const { setAuth, logout } = actions;
export default reducer;