import { combineReducers } from 'redux'

import sidebarLeftReducer from './sidebarLeft/reducer'
import sidebarLeftStates from './sidebarLeft/states'

import sidebarRightReducer from './sidebarRight/reducer'
import sidebarRightStates from './sidebarRight/states'

import builderReducer from './builder/reducer'
import builderStates from './builder/states'

import mouseReducer from './mouse/reducer'
import mouseStates from './mouse/states'

import toolbarReducer from './toolbar/reducer'
import toolbarStates from './toolbar/states'

import eventReducer from './event/reducer'
import eventStates from './event/states'

import apiReducer from './api/reducer'
import apiStates from './api/states'

export interface ApplicationState {
  sidebarLeft: sidebarLeftStates
  sidebarRight: sidebarRightStates
  builder: builderStates
  mouse: mouseStates
  toolbar: toolbarStates
  event: eventStates
  api: apiStates
}

export const rootReducer = () =>
  combineReducers({
    sidebarLeft: sidebarLeftReducer,
    sidebarRight: sidebarRightReducer,
    builder: builderReducer,
    mouse: mouseReducer,
    toolbar: toolbarReducer,
    event: eventReducer,
    api: apiReducer,
  })
