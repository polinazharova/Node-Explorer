import './NodeInterface.styles.scss'
import { useSelector } from 'react-redux';
import Status from '../../features/node-explorer/ui/components/status/Status'

const NodeInterface = ({interfaceId}) => {
  const { interfaceName, interfaceStatusId } = useSelector(state => state.groupsNodes.interfaces[interfaceId]);

  return (
    <div className="main__node-interface">
        <span className="main__node-interface-text">Interface: {interfaceName}</span>
        <Status statusId={interfaceStatusId}></Status>
    </div>
  )
}

export default NodeInterface;