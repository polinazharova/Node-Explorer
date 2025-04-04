import { configureStore } from '@reduxjs/toolkit';
import groupsNodesReducer from '../entities/groups-nodes/model/store/groupsNodesSlice';
import selectedGroupNodesReducer from '../entities/groups-nodes/model/store/selectedGroupNodesSlice';
import metricsNodesReducer from '../entities/node-metrics/model/metricsNodesSlice'
import firstShownIndexReducer from '../features/node-explorer/model/store/firstShownIndexSlice';
import selectedNodeReducer from '../entities/nodes/model/store/selectedNodeSlice'

export const store = configureStore({
  reducer: {
    'groupsNodes' : groupsNodesReducer,
    'selectedGroupNodes' : selectedGroupNodesReducer,
    'selectedNode' : selectedNodeReducer,
    'metricsNodes' : metricsNodesReducer,
    'firstShownIndex' : firstShownIndexReducer,
  },
});