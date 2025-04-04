import './GroupsBlock.styles.scss'
import Status from '../components/status/Status'
import GroupsList from '../../../../entities/groups-nodes/GroupsList'
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchGroupsNodes } from '../../../../entities/groups-nodes/model/store/groupsNodesSlice';
import { useEffect, useMemo } from 'react';
import GroupsIncluder from './ui/GroupsIncluder';

const GroupsBlock = () => {
  const { groups, nodes, status, error } = useSelector(state => state.groupsNodes);
  const { selectedGroupNodes } = useSelector(state => state.selectedGroupNodes);
  const { selectedNode } = useSelector(state => state.selectedNode);

  const groupsLen = useMemo(() => (
    Object.keys(groups).length
  ), [groups]);

  const nodesLen = useMemo(() => (
    Object.keys(nodes).length
  ), [nodes]);

  const worstStatusId = useMemo(() => {
    let tmpStatus = 0;
 
    for (let nodeId of selectedGroupNodes) {
      if (nodes[nodeId]['statusId'] > tmpStatus) {
        tmpStatus = nodes[nodeId]['statusId'];

        if (tmpStatus == 6) {break;}
      }
    }

    return tmpStatus;
  }, [selectedGroupNodes])

  if (error) {
    return (
      <div className="main__groups-list">{error}</div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="main__groups-list">Загрузка...</div>
    )
  }


  return (
    <div className="main__groups-block">
        <Status statusId={worstStatusId}>Общий статус: </Status>
        <span className='main__groups-block-info'>Кол-во групп: {groupsLen}, кол-во нод: {nodesLen}</span>
        <span className='main__groups-block-info'>Кол-во нод в выбранной группе: {selectedGroupNodes.length}</span>
        <GroupsList />
        <GroupsIncluder groups={groups} selectedNode={selectedNode}/>
    </div>
  )
}

export default GroupsBlock;