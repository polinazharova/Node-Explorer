import './NodeMetrics.styles.scss'
import { useSelector } from 'react-redux';

const NodeMetrics = ({nodeId}) => {
  const { cpu, disk, memory } = useSelector(state => state.metricsNodes.metrics[nodeId][state.metricsNodes.metrics[nodeId].length - 1]);

  return (
    <div className="main__node-metrics">
      <span className={cpu <= 95 ? (cpu > 85 ? "main__node-metric_yellow" : "main__node-metric_green" ) : "main__node-metric_red"}>Утилизация CPU: {cpu}</span>
      <span className={memory <= 95 ? (memory > 85 ? "main__node-metric_yellow" : "main__node-metric_green" ) : "main__node-metric_red"}>Утилизация Memory: {memory}</span>
      <span className={disk <= 95 ? (disk > 85 ? "main__node-metric_yellow" : "main__node-metric_green" ) : "main__node-metric_red"}>Утилизация Disk: {disk}</span>
    </div>
  )
}

export default NodeMetrics;