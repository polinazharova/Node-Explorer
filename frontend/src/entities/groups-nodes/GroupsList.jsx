import "./GroupsList.styles.scss";
import { useSelector } from "react-redux";
import useSelectedGroup from "./model/hooks/useSelectedGroup";
import { useState } from "react";
import handleGroupsItemClick from "./lib/handleGroupsItemClick";

const GroupsList = () => {
  const { groups } = useSelector((state) => state.groupsNodes);
  const [selectedGroup, setSelectedGroup] = useState("Все");

  useSelectedGroup(selectedGroup, setSelectedGroup);

  return (
    <div className="main__groups-list">
      <span className="main__groups-list-text">Список групп:</span>
      <ul className="main__groups-list-ul">
        <li
          className="main__groups-list-item main__groups-list-item_selected"
          onClick={(event) => {
            handleGroupsItemClick(event, setSelectedGroup);
          }}
        >
          Все
        </li>
        {Object.keys(groups).map((id) => (
          <li
            className="main__groups-list-item"
            key={id}
            onClick={(event) => {
              handleGroupsItemClick(event, setSelectedGroup);
            }}
          >
            {groups[id]["groupName"]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsList;
