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
              name: 'Đăng nhập',
              path: '/user/login',
              component: '@/pages/user/login',
            },
            {
              name: 'Quên mật khẩu',
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
              redirect: '/calendar',
            },
            {
              path: '/calendar',
              name: 'calendar',
              icon: 'CalendarOutlined',
              component: '@/pages/Calendar',
              visible: ["1","2","3"],
            },
            {
              name: 'enroll',
              icon: 'PlusCircleOutlined',
              path: '/enroll',
              visible: ["3"],
              routes: [
                {
                  path: '/enroll/asign',
                  name: 'enroll',
                  // component: '@/pages/RoleAndPermission/Role',
                  breadcrumbName: 'Đăng kí',
                  exact: true,
                  hideInMenu: false,
                },
                {
                  path: '/enroll/list',
                  name: 'enrollList',
                  // component: '@/pages/RoleAndPermission/Role',
                  breadcrumbName: 'Danh sách đăng kí',
                  exact: true,
                  hideInMenu: false,
                },
              ]
            },
            {
              path: '/news',
              name: 'news',
              icon: 'StarOutlined',
              visible: ["1","2","3"],
            },
            {
              path: '/file',
              name: 'file',
              icon: 'FileOutlined',
              visible: ["1","2","3"],
              component: '@/pages/Files',
            },
            {
              path: '/class',
              name: 'class',
              icon: 'ReadOutlined',
              visible: ["2","3"],
            },
            {
              path: '/class-manage',
              name: 'class-manage',
              icon: 'GroupOutlined',
              component: '@/pages/ClassManage',
              visible: ["1"],
            },
            {
              path: '/account-manage',
              name: 'account-manage',
              icon: 'UsergroupAddOutlined',
              component: '@/pages/AccountManage',
              visible: ["1"],
            },
            {
              name: 'account',
              icon: 'UserOutlined',
              path: '/account',
              component: '@/pages/Account',
              visible: ["1","2","3"],
            },
            {
              name: 'settings',
              icon: 'SettingOutlined',
              path: '/settings',
              component: '@/pages/settings',
              visible: ["1","2","3"],
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
