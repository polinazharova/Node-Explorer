import './NodeInfoBlock.styles.scss'
import NothingHereYet from '../components/nothing-here-yet/NothingHereYet'
import NodeInterface from '../../../../entities/node-interface/NodeInterface';
import NodeAdmin from '../../../../entities/node-admin/NodeAdmin';
import NodeApp from '../../../../entities/node-app/NodeApp';
import NodeMetricsGraphics from '../../../../entities/node-metrics-graphics/NodeMetricsGraphics';
import { useSelector } from 'react-redux';

const NodeInfoBlock = () => {
  const {selectedNode} = useSelector(state => state.selectedNode);
  const { nodes, status, error } = useSelector(state => state.groupsNodes);

  if (error) {
    return (<div>error</div>)
  }
  if (status === 'loading' || status === 'idle') {
    return (<div>Загрузка...</div>)
  }

  if (!selectedNode) {
      return (
      <div className="main__node-info-block">
        <NothingHereYet>ноду</NothingHereYet>
      </div>
    )
  }

  return (
    <div className="main__node-info-block">
      <NodeMetricsGraphics nodeId={selectedNode['nodeId']}/>
      <div className="main__node-info-block-comp">
        <NodeInterface interfaceId={selectedNode['interfaceId']}/>
        <NodeApp appId={selectedNode['appId']}/>
      </div>
      <NodeAdmin adminId={selectedNode['adminId']} />
    </div>
  )
}

export default NodeInfoBlock;