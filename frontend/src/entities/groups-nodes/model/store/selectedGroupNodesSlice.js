import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedGroupNodes: [],
}; 

const selectedGroupNodesSlice = createSlice({
    name: 'selectedGroupNodes',
    initialState: initialState,
    reducers: {
      selectGroup : (state, action) => {
        state.selectedGroupNodes = action.payload;
      }
    },
})

export default selectedGroupNodesSlice.reducer;
export const { selectGroup } = selectedGroupNodesSlice.actions;