import { Settings as ProSettings } from '@ant-design/pro-layout'

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean
}

const proSettings: DefaultSettings = {
  "navTheme": "dark",
  "primaryColor": "#1890ff",
  "layout": "side",
  "contentWidth": "Fluid",
  "fixedHeader": true,
  "fixSiderbar": true,
  "title": "Landing Page",
  "pwa": false,
  "iconfontUrl": "",
  "footerRender": false
}

export type { DefaultSettings }

export default proSettings
