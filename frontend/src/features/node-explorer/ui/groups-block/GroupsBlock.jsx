import './GroupsBlock.styles.scss'
import Status from '../components/status/Status'
import GroupsList from '../../../../entities/groups-nodes/GroupsList'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import GroupsIncluder from './ui/GroupsIncluder';
import Divider from '../components/divider/Divider';

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
    const statusRating = [3, 2, 4, 5, 1, 6];
    let idx = 0, tmpStatus = 0, tmpIdx = 0;

    for (let nodeId of selectedGroupNodes) {
      if (nodes[nodeId]['statusId'] > tmpStatus) {
        tmpStatus = nodes[nodeId]['statusId'];
        tmpIdx = statusRating.indexOf(tmpStatus);
        if (tmpIdx > idx) {
          idx = tmpIdx;
          if (idx === 5) {
            break;
          }
        }
      }
    }

    return statusRating[idx];
  }, [selectedGroupNodes])


  if (error && status !== 'succeeded') {
    return (
      <div className="main__groups-block">{error}</div>
    )
  }

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="main__groups-block">Загрузка...</div>
    )
  }


  return (
    <div className="main__groups-block">
        <Status statusId={worstStatusId}>Общий статус: </Status>
        <Divider />
        <span className='main__groups-block-info'>Кол-во групп: {groupsLen}, кол-во нод: {nodesLen}</span>
        <span className='main__groups-block-info'>Кол-во нод в выбранной группе: {selectedGroupNodes.length}</span>
        <GroupsList />
        <Divider />
        <GroupsIncluder groups={groups} selectedNode={selectedNode}/>
    </div>
  )
}

export default GroupsBlock;