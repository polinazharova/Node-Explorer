import './NodeInfoBlock.styles.scss'
import NothingHereYet from '../components/nothing-here-yet/NothingHereYet'
import NodeInterface from '../../../../entities/node-interface/NodeInterface';
import NodeAdmin from '../../../../entities/node-admin/NodeAdmin';
import NodeApp from '../../../../entities/node-app/NodeApp';
import NodeMetricsGraphics from '../../../../entities/node-metrics-graphics/NodeMetricsGraphics';
import Divider from '../components/divider/Divider';
import { useSelector } from 'react-redux';

const NodeInfoBlock = () => {
  const {selectedNode} = useSelector(state => state.selectedNode);
  const { status, error } = useSelector(state => state.groupsNodes);

  if (error && status !== 'succeeded') {
    return (<div className="main__node-info-block">Что-то пошло не так...</div>)
  }
  if (status === 'loading' || status === 'idle') {
    return (<div className="main__node-info-block">Загрузка...</div>)
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
      <Divider />
      <div className="main__node-info-block-comp">
        <NodeInterface interfaceId={selectedNode['interfaceId']}/>
        <NodeApp appId={selectedNode['appId']}/>
      </div>
      <Divider />
      <NodeAdmin adminId={selectedNode['adminId']} />
    </div>
  )
}

export default NodeInfoBlock;