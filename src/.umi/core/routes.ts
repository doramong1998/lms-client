// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/home/x/workspace/lms-client/node_modules/umi/node_modules/@umijs/runtime';
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
            "name": "login",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'@/pages/user/login'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "forgot",
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
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/home/x/workspace/lms-client/src/pages/404'), loading: LoadingComponent}),
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
            "name": "Lịch cá nhân",
            "icon": "CalendarOutlined",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Calendar' */'@/pages/Calendar'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "bannerAds",
            "icon": "PictureOutlined",
            "path": "/banner-ads",
            "exact": true
          },
          {
            "path": "/themes",
            "name": "themes",
            "icon": "LayoutOutlined",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__themes' */'@/pages/themes'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/showcases",
            "name": "showcases",
            "icon": "LayoutOutlined",
            "exact": true
          },
          {
            "name": "dynamic",
            "icon": "PieChartOutlined",
            "path": "/dynamic",
            "exact": true
          },
          {
            "path": "/funnel",
            "name": "funnel",
            "icon": "FilterOutlined",
            "exact": true
          },
          {
            "name": "integrations",
            "icon": "AppstoreAddOutlined",
            "path": "/integrations",
            "exact": true
          },
          {
            "name": "domains",
            "icon": "GlobalOutlined",
            "path": "/domains",
            "exact": true
          },
          {
            "name": "linkBuilder",
            "icon": "LinkOutlined",
            "path": "/link-builder",
            "exact": true
          },
          {
            "name": "settings",
            "icon": "SettingOutlined",
            "path": "/settings",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__settings' */'@/pages/settings'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/home/x/workspace/lms-client/src/pages/404'), loading: LoadingComponent}),
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
