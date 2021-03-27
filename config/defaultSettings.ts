import { Settings as ProSettings } from '@ant-design/pro-layout'

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean
}

const proSettings: DefaultSettings = {
  "navTheme": "light",
  "primaryColor": "#fa551e",
  "layout": "side",
  "contentWidth": "Fluid",
  "fixedHeader": false,
  "fixSiderbar": true,
  "colorWeak": false,
  "title": "LMS-ACT",
  "pwa": false,
  "iconfontUrl": "",
}

export type { DefaultSettings }

export default proSettings
