import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstShownIndex : 0,
}; 

const firstShownIndexSlice = createSlice({
    name: 'firstShownIndex',
    initialState: initialState,
    reducers: {
        nullIndex : (state) => {
            state.firstShownIndex = 0;
        },
        setIndex : (state, action) => {
            state.firstShownIndex = action.payload;
        },
    },
})

export default firstShownIndexSlice.reducer;
export const { nullIndex, setIndex } = firstShownIndexSlice.actions;