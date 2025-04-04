import "./NodesBlock.styles.scss";
import { useSelector } from "react-redux";
import NodesSwitcher from "./ui/NodesSwitcher";
import Node from "../../../../entities/nodes/Node";

const NodesBlock = () => {
  const nodesStatus = useSelector((state) => state.groupsNodes.status);
  const nodesError = useSelector((state) => state.groupsNodes.error);
  const metricsStatus = useSelector((state) => state.metricsNodes.status);
  const metricsError = useSelector((state) => state.metricsNodes.status);
  const { selectedGroupNodes } = useSelector(
    (state) => state.selectedGroupNodes,
  );
  const { firstShownIndex } = useSelector((state) => state.firstShownIndex);

  console.log(nodesStatus, metricsStatus);

  if (
    (metricsError && metricsStatus !== "succeeded") ||
    (nodesError && nodesStatus !== "succeeded")
  ) {
    return <div className="main__nodes-block">Что-то пошло не так...</div>;
  }

  if (
    nodesStatus === "loading" ||
    metricsStatus === "loading" ||
    nodesStatus === "idle" ||
    metricsStatus === "idle"
  ) {
    return <div className="main__nodes-block">Загрузка...</div>;
  }

  return (
    <div className="main__nodes-block">
      {selectedGroupNodes
        .slice(firstShownIndex, firstShownIndex + 5)
        .map((nodeId) => (
          <Node key={nodeId} nodeId={nodeId} />
        ))}
      <NodesSwitcher />
    </div>
  );
};

export default NodesBlock;
