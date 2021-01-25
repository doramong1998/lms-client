import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout'

export type Loading = {
  effects: Record<string, boolean | undefined>
  models: {
    user?: boolean
  }
}

export type ConnectState = {
  loading: Loading
  settings: ProSettings
}

export type Route = {
  routes?: Route[]
} & MenuDataItem
