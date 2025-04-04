import "./NodeExplorer.styles.scss";
import GroupsBlock from "./groups-block/GroupsBlock";
import NodesBlock from "./nodes-block/NodesBlock";
import NodeInfoBlock from "./node-info-block/NodeInfoBlock";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGroupsNodes } from "../../../entities/groups-nodes/model/store/groupsNodesSlice";
import { fetchMetricsNodes } from "../../../entities/node-metrics/model/metricsNodesSlice";

const NodeExplorer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroupsNodes("/api/groups"));
    dispatch(fetchMetricsNodes("/api/metrics"));

    setInterval(() => {
      dispatch(fetchGroupsNodes("/api/groups"));
      dispatch(fetchMetricsNodes("/api/metrics"));
    }, 60000);
  }, []);

  return (
    <div id="main__node-explorer">
      <GroupsBlock />
      <NodesBlock />
      <NodeInfoBlock />
    </div>
  );
};

export default NodeExplorer;
