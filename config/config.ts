// https://umijs.org/config/
import { defineConfig } from 'umi'
import defaultSettings from './defaultSettings'
import proxy from './proxy'
const { REACT_APP_ENV } = process.env
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    default: 'vi-VN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '@/layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '@/layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              path: '/user/login',
              component: '@/pages/user/login',
            },
            {
              name: 'forgot',
              path: '/user/forgot',
              component: '@/pages/user/forgot',
            },
            {
              name: 'change',
              path: '/user/change',
              component: '@/pages/user/change',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '@/layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          routes: [
            {
              path: '/',
              redirect: '/landing-page',
            },
            {
              path: '/landing-page',
              name: 'landingPages',
              icon: 'SolutionOutlined',
              component: '@/pages/landingPages'
            },
            {
              name: 'bannerAds',
              icon: 'PictureOutlined',
              path: '/banner-ads',
            },
            {
              path: '/themes',
              name: 'themes',
              icon: 'LayoutOutlined',
              component: '@/pages/themes'
            },
            {
              path: '/showcases',
              name: 'showcases',
              icon: 'LayoutOutlined',
            },
            {
              name: 'dynamic',
              icon: 'PieChartOutlined',
              path: '/dynamic',
            },
            {
              path: '/funnel',
              name: 'funnel',
              icon: 'FilterOutlined',
            },
            {
              name: 'integrations',
              icon: 'AppstoreAddOutlined',
              path: '/integrations',
            },
            {
              name: 'domains',
              icon: 'GlobalOutlined',
              path: '/domains',
            },
            {
              name: 'linkBuilder',
              icon: 'LinkOutlined',
              path: '/link-builder',
            },
            {
              name: 'settings',
              icon: 'SettingOutlined',
              path: '/settings',
              component: '@/pages/settings'
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  exportStatic: {},
  esbuild: {},
})
