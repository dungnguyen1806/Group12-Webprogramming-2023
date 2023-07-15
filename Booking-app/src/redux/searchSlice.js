import { createSlice } from "@reduxjs/toolkit"

const initialSearch = {
    search: {
        estination: '',
        dates: [],
        options: {
            adult: 1,
            children: 0,
            room: 1,
        },
    }
}

const searchSlice = createSlice({
    name: 'search',
    initialState: initialSearch,
    reducers: {
        setSearchData: (state, action) => {
            state.search = action.payload;
        }
    }
})

const { reducer, actions } = searchSlice;

export const { setSearchData } = actions;
export default reducer;