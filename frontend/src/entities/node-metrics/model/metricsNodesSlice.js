import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import simpleHash from '../../lib/simpleHash';

const initialState = {
  metrics : {},
  status : 'idle',
  error : null,
  hash : null,
}; 

export const fetchMetricsNodes = createAsyncThunk(
    'metricsNodes/fetchMetricsNodes',
    async (url, { rejectWithValue }) => {
      try {
        const response = await fetch(url, { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }});
        if (!response.ok) throw new Error('Could not get data!');
        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const metricsNodesSlice = createSlice({
    name: 'metricsNodes',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMetricsNodes.pending, (state) => {
            if (state.status === 'succeeded') {return;}
            state.status = 'loading';
        })
        builder.addCase(fetchMetricsNodes.fulfilled, (state, action) => {
          const newHash = simpleHash(action.payload);

          if (newHash === state.hash) {
            if (state.error) {
              state.error = null;
            }
            return;
          } 

          const init = {
            metrics : {},
          };

          const data = action.payload.reduce((acc, item) => {
            const nodeMetrics = {'datetime' : item.datetime, 'cpu' : item.cpu_utilization, 'memory' : item.memory_utilization, 'disk' : item.disk_utilization};
            acc.metrics[item.node_id] = acc.metrics[item.node_id] ? [...acc.metrics[item.node_id], nodeMetrics] : [nodeMetrics];

            return acc;
          }, init)

            state.metrics = data.metrics;
            state.status = 'succeeded';
            state.error = null;
            state.hash = newHash;
        })
        builder.addCase(fetchMetricsNodes.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
})

export default metricsNodesSlice.reducer;