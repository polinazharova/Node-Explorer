import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedNode: null,
}; 

const selectedNodeSlice = createSlice({
    name: 'selectedNode',
    initialState: initialState,
    reducers: {
      selectNode : (state, action) => {
        state.selectedNode = action.payload;
      }
    },
})

export default selectedNodeSlice.reducer;
export const { selectNode } = selectedNodeSlice.actions;