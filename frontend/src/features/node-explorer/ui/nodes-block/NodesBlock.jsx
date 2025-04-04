import './NodesBlock.styles.scss'
import { useSelector } from 'react-redux'
import NodesSwitcher from './ui/NodesSwitcher'
import Node from '../../../../entities/nodes/Node'

const NodesBlock = () => {
  const nodesStatus = useSelector(state => state.groupsNodes.status);
  const { selectedGroupNodes } = useSelector(state => state.selectedGroupNodes);
  const metricsStatus = useSelector(state => state.metricsNodes.status);
  const { firstShownIndex } = useSelector(state => state.firstShownIndex);

  if (nodesStatus === 'failed' || metricsStatus === 'failed') {
    return (
      <div className="main__nodes-block">Что-то пошло не так...</div>
    )
  }

  if (nodesStatus === 'loading' || metricsStatus === 'loading' || nodesStatus === 'idle' || metricsStatus === 'idle'  ) {
    return (
      <div className="main__nodes-block">Загрузка...</div>
    )
  }

  return (
    <div className="main__nodes-block">
        {
          selectedGroupNodes.slice(firstShownIndex, firstShownIndex + 5).map((nodeId) => (
            <Node key={nodeId} nodeId={nodeId}/>
          ))
        }
        <NodesSwitcher />
    </div>
  )
}

export default NodesBlock;