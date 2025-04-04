import "./NodeAdmin.styles.scss";
import emailIcon from "../../assets/images/email-icon.png";
import adminIcon from "../../assets/images/admin-icon.png";
import { useSelector } from "react-redux";

const NodeAdmin = ({ adminId }) => {
  const { adminFirstname, adminLastname, adminEmail } = useSelector(
    (state) => state.groupsNodes.admins[adminId],
  );

  return (
    <div className="main__node-admin">
      <div className="main__node-admin-comp">
        <img
          className="main__node-admin-icon"
          src={adminIcon}
          alt="admin icon from flaticon"
        />
        <span className="main__node-admin-text">Admin:</span>
      </div>
      <div className="main__node-admin-name-comp">
        <span className="main__node-admin-fn">{adminFirstname}</span>
        <span className="main__node-admin-ln">{adminLastname}</span>
      </div>
      <div
        className="main__node-admin-email-comp"
        onClick={() => {
          location.href = `mailto:${adminEmail}`;
        }}
      >
        <img
          className="main__node-admin-email-icon"
          src={emailIcon}
          alt="email icon from flaticon"
        />
        <span className="main__node-admin-email">{adminEmail}</span>
      </div>
    </div>
  );
};

export default NodeAdmin;
