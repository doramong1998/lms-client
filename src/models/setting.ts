import type { DefaultSettings } from '../../config/defaultSettings'
import defaultSettings from '../../config/defaultSettings'

export type Model = {
  namespace: 'settings'
  state: DefaultSettings
}

export default <Model>{
  namespace: 'settings',
  state: defaultSettings,
}
