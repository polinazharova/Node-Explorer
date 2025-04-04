import "./BadConnection.styles.scss";
import { useSelector } from "react-redux";

const BadConnection = () => {
  const { error } = useSelector((state) => state.groupsNodes);
  console.log(error);
  if (!error) {
    return null;
  }

  return <div id="bad-connection">Не удается получить данные с сервера</div>;
};

export default BadConnection;
