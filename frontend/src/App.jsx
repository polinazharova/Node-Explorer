import './App.scss'
import { Provider } from 'react-redux';
import { store } from './app/store'
import Header from './layouts/header/Header'
import NodeExplorer from './features/node-explorer/ui/NodeExplorer'
import Footer from './layouts/footer/Footer'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <NodeExplorer />
        <Footer />
      </Provider>
    </>
  )
}

export default App;