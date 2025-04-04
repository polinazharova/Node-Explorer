import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import simpleHash from '../../../lib/simpleHash';

const initialState = {
  groups: {},
  nodes: {},
  interfaces: {},
  apps: {},
  admins: {},
  statuses: {},
  status: 'idle',
  error: null,
  hash: null
}; 

export const fetchGroupsNodes = createAsyncThunk(
    'groupsNodes/fetchGroupsNodes',
    async (url, { rejectWithValue }) => {
      try {
        const response = await fetch(url, { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }});
        if (!response.ok) throw new Error('Не удалось получить данные!');
        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const groupsNodesSlice = createSlice({
    name: 'groupsNodes',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGroupsNodes.pending, (state) => {
            if (state.status === 'succeeded') {return;}
            state.status = 'loading';
        })
        builder.addCase(fetchGroupsNodes.fulfilled, (state, action) => {
          const newHash = simpleHash(action.payload);

          if (newHash === state.hash) {
            if (state.error) {
              state.error = null;
            }

            return;
          } 

          const init = {
            groups: {},
            nodes: {},
            interfaces: {},
            apps: {},
            admins: {},
            statuses: {},
          };

          const data = action.payload.reduce((acc, item) => {
            acc.groups[item.group_id] = {'groupName' : item.group_name, 
              'nodeId' : [
              ...(acc.groups[item.group_id]?.nodeId || []), 
              item.node_id                                 
            ]};

            acc.nodes[item.node_id] = {'nodeName' : item.node_name, 'statusId' : item.node_status_id, 'interfaceId' : item.interface_id,
              'adminId' : item.admin_id, 'appId' : item.app_id, 'groupId' : [
                ...(acc.nodes[item.node_id]?.groupId || []), 
                item.group_id                                 
              ]};

            acc.interfaces[item.interface_id] = {'interfaceName' : item.interface_name, 'interfaceStatusId' : item.interface_status_id};

            acc.apps[item.app_id] = {'appName' : item.app_name};
            
            acc.statuses[item.node_status_id] = {'statusName' : item.node_status_name, 'statusColor' : item.node_status_color};
            
            if (!acc.statuses[item.interface_status_id]) {
              acc.statuses[item.interface_status_id] = {'statusName' : item.interface_status_name, 'statusColor' : item.interface_status_color};
            }

            acc.admins[item.admin_id] = {'adminFirstname' : item.admin_firstname, 'adminLastname' : item.admin_lastname, 'adminEmail' : item.admin_email};

            return acc;

          }, init)

            state.groups = data.groups;
            state.nodes = data.nodes;
            state.interfaces = data.interfaces;
            state.apps = data.apps;
            state.admins = data.admins;
            state.statuses = data.statuses;
            state.status = 'succeeded';
            state.error = null;
            state.hash = newHash;
        })
        builder.addCase(fetchGroupsNodes.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
})

export default groupsNodesSlice.reducer;