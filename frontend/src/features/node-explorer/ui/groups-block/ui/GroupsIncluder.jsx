import "./GroupsIncluder.styles.scss";
import { useMemo } from "react";

const GroupsIncluder = ({ groups, selectedNode }) => {
  const includedGroups = useMemo(() => {
    const tmp = [];
    selectedNode?.["groupId"]?.map((groupId) => {
      tmp.push(groups[groupId]?.["groupName"]);
    });

    return tmp;
  }, [selectedNode]);

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="main__groups-block-included-groups">
      <span>Группы, в которые входит нода {selectedNode["nodeName"]}: </span>
      {includedGroups.map((groupName, index) => (
        <span key={groupName + index}>{groupName}</span>
      ))}
    </div>
  );
};

export default GroupsIncluder;
