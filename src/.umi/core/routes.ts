// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'E:/a/Doan/lms-client/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'@/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'@/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/user",
            "redirect": "/user/login",
            "exact": true
          },
          {
            "name": "Đăng nhập",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'@/pages/user/login'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "Quên mật khẩu",
            "path": "/user/forgot",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__forgot' */'@/pages/user/forgot'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "change",
            "path": "/user/change",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__change' */'@/pages/user/change'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'E:/a/Doan/lms-client/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'@/layouts/BasicLayout'), loading: LoadingComponent}),
        "Routes": [
          "src/pages/Authorized"
        ],
        "routes": [
          {
            "path": "/index.html",
            "redirect": "/calendar",
            "exact": true
          },
          {
            "path": "/",
            "redirect": "/calendar",
            "exact": true
          },
          {
            "path": "/calendar",
            "name": "calendar",
            "icon": "CalendarOutlined",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Calendar' */'@/pages/Calendar'), loading: LoadingComponent}),
            "visible": [
              "1",
              "2",
              "3"
            ],
            "exact": true
          },
          {
            "name": "enroll",
            "icon": "PlusCircleOutlined",
            "path": "/enroll",
            "visible": [
              "3"
            ],
            "routes": [
              {
                "path": "/enroll/asign",
                "name": "enroll",
                "breadcrumbName": "Đăng kí",
                "exact": true,
                "hideInMenu": false
              },
              {
                "path": "/enroll/list",
                "name": "enrollList",
                "breadcrumbName": "Danh sách đăng kí",
                "exact": true,
                "hideInMenu": false
              }
            ]
          },
          {
            "path": "/news",
            "name": "news",
            "icon": "StarOutlined",
            "visible": [
              "1",
              "2",
              "3"
            ],
            "exact": true
          },
          {
            "path": "/file",
            "name": "file",
            "icon": "FileOutlined",
            "visible": [
              "1",
              "2",
              "3"
            ],
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Files' */'@/pages/Files'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/class",
            "name": "class",
            "icon": "ReadOutlined",
            "visible": [
              "2",
              "3"
            ],
            "exact": true
          },
          {
            "path": "/class-manage",
            "name": "class-manage",
            "icon": "GroupOutlined",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ClassManage' */'@/pages/ClassManage'), loading: LoadingComponent}),
            "visible": [
              "1"
            ],
            "exact": true
          },
          {
            "path": "/account-manage",
            "name": "account-manage",
            "icon": "UsergroupAddOutlined",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AccountManage' */'@/pages/AccountManage'), loading: LoadingComponent}),
            "visible": [
              "1"
            ],
            "exact": true
          },
          {
            "name": "account",
            "icon": "UserOutlined",
            "path": "/account",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Account' */'@/pages/Account'), loading: LoadingComponent}),
            "visible": [
              "1",
              "2",
              "3"
            ],
            "exact": true
          },
          {
            "name": "settings",
            "icon": "SettingOutlined",
            "path": "/settings",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__settings' */'@/pages/settings'), loading: LoadingComponent}),
            "visible": [
              "1",
              "2",
              "3"
            ],
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'E:/a/Doan/lms-client/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
