import './Node.styles.scss'
import { useSelector, useDispatch } from 'react-redux';;
import NodeStatus from '../../features/node-explorer/ui/components/status/Status';
import NodeMetrics from '../node-metrics/NodeMetrics';
import handleNodeClick from './model/handleNodeClick';
import { selectNode } from './model/store/selectedNodeSlice';
import { useEffect } from 'react';

const Node = ({nodeId}) => {
  const {nodes} = useSelector(state => state.groupsNodes);
  const {selectedNode} = useSelector(state => state.selectedNode);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedNode) {
      const foundNode = Object.keys(nodes).find(nodeId => nodeId == selectedNode['nodeId']);
      if (!foundNode) {
        dispatch(selectNode(null));
      }
    }
  }, [nodes])
  
  return (
    <div className={selectedNode && selectedNode['nodeId'] == nodeId ? "main__node main__node_selected" : "main__node"} onClick={() => {handleNodeClick(event, dispatch, nodes, nodeId)}}>
      <div className="main__node-comp">
        <NodeStatus statusId={nodes[nodeId]['statusId']}></NodeStatus>
        <span className="main__node-name">{nodes[nodeId]['nodeName']}</span>
      </div>
      <NodeMetrics nodeId={nodeId}/>
    </div>
  )
}

export default Node;