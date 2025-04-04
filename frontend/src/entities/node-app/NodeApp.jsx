import './NodeApp.styles.scss'
import { useSelector } from 'react-redux';
import appIcon from '../../assets/images/app-icon.png'

const NodeApp = ({appId}) => {
  const { appName } = useSelector(state => state.groupsNodes.apps[appId]);

  return (
    <div className="main__node-app">
        <img className="main__node-app-icon" src={appIcon} alt="app icom from flaticon" />
        <span>App: {appName}</span>
    </div>
  )
}

export default NodeApp;