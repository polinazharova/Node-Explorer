import { useSelector } from "react-redux";
import "./Status.styles.scss";

const NodeStatus = ({ children, statusId }) => {
  const { statuses } = useSelector((state) => state.groupsNodes);

  return (
    <div className="main__status">
      <span className="main__status-text">{children}</span>
      <div
        className={`main__status-circle main__status-circle-${statuses[statusId]?.["statusName"].toLowerCase()}`}
      ></div>
      <span className="main__status-state">
        {statuses[statusId]?.["statusName"].toUpperCase()}
      </span>
    </div>
  );
};

export default NodeStatus;
