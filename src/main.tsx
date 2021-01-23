import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'draft-js/dist/Draft.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import configureStore from './configureStore'
import Routes from './routes'
import './styles/main.scss'
import 'antd/dist/antd.css'


interface MainProps {
}

library.add(fas, far, fab)

const Main: React.FC<MainProps> = () => {
  const store = configureStore()
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider >
  )
}

export default Main
