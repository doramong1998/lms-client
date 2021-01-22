import { Store, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { ApplicationState, rootReducer } from './store'

export default function configureStore(): Store<ApplicationState, any> {
  const composeEnhancers = composeWithDevTools({})
  const store = createStore(
    rootReducer(),
    {},
    composeEnhancers(applyMiddleware(thunk)),
  )

  return store
}
