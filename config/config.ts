// https://umijs.org/config/
import { defineConfig } from "umi";
import defaultSettings from "./defaultSettings";
import proxy from "./proxy";
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: "browser",
  },
  locale: {
    default: "vi-VN",
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: "@/components/PageLoading",
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: "/",
      component: "@/layouts/BlankLayout",
      routes: [
        {
          path: "/user",
          component: "@/layouts/UserLayout",
          routes: [
            {
              path: "/user",
              redirect: "/user/login",
            },
            {
              name: "Đăng nhập",
              path: "/user/login",
              component: "@/pages/user/login",
            },
            {
              name: "Quên mật khẩu",
              path: "/user/forgot",
              component: "@/pages/user/forgot",
            },
            {
              name: "change",
              path: "/user/change",
              component: "@/pages/user/change",
            },
            {
              component: "404",
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/SecurityLayout',
          routes: [
            {
              path: "/",
              component: "@/layouts/BasicLayout",
              routes: [
                {
                  path: "/",
                  redirect: "/calendar",
                },
                {
                  path: "/calendar",
                  name: "calendar",
                  icon: "CalendarOutlined",
                  component: "@/pages/Calendar",
                  authority: ["1", "2", "3"],
                },
                {
                  name: "enroll",
                  icon: "PlusCircleOutlined",
                  path: "/enroll",
                  authority: ["3"],
                  routes: [
                    {
                      path: "/enroll/asign",
                      name: "enroll",
                      // component: '@/pages/RoleAndPermission/Role',
                      breadcrumbName: "Đăng kí",
                      exact: true,
                      hideInMenu: false,
                    },
                    {
                      path: "/enroll/list",
                      name: "enrollList",
                      // component: '@/pages/RoleAndPermission/Role',
                      breadcrumbName: "Danh sách đăng kí",
                      exact: true,
                      hideInMenu: false,
                    },
                  ],
                },
                {
                  path: "/news",
                  name: "news",
                  icon: "StarOutlined",
                  authority: ["1", "2", "3"],
                },
                {
                  path: "/file",
                  name: "file",
                  icon: "FileOutlined",
                  authority: ["1", "2", "3"],
                  component: "@/pages/Files",
                },
                {
                  path: "/class-teacher",
                  name: "class",
                  icon: "ReadOutlined",
                  authority: ["2"],
                  component: "@/pages/Class/ClassTeacher",
                },
                {
                  path: "/class-student",
                  name: "class",
                  icon: "ReadOutlined",
                  authority: ["3"],
                  component: "@/pages/Class/ClassStudent",
                },
                {
                  path: "/class-manage",
                  name: "class-manage",
                  icon: "GroupOutlined",
                  authority: ["1"],
                  routes: [
                    {
                      path: "/class-manage",
                      name: "list",
                      component: "@/pages/ClassManage/ListClass",
                      exact: true,
                      hideInMenu: true,
                      authority: ["1"]
                    },
                    {
                      path: "/class-manage/:id",
                      name: "detail",
                      component: '@/pages/ClassManage/DetailClass',
                      breadcrumbName: "Chi tiết",
                      exact: true,
                      hideInMenu: true,
                      authority: ["1"]
                    },
                  ]
                },
                {
                  path: "/subject-teacher",
                  name: "subject",
                  icon: "BookOutlined",
                  authority: ["2"],
                  component: "@/pages/Subject/SubjectTeacher",
                },
                {
                  path: "/subject-student",
                  name: "subject",
                  icon: "BookOutlined",
                  authority: ["3"],
                  component: "@/pages/Subject/SubjectStudent",
                },
                {
                  path: "/subject-manage",
                  name: "subject-manage",
                  icon: "BookOutlined",
                  authority: ["1"],
                  routes: [
                    {
                      path: "/subject-manage",
                      name: "list",
                      component: "@/pages/SubjectManage/TableSubject",
                      exact: true,
                      hideInMenu: true,
                      authority: ["1"]
                    },
                    {
                      path: "/subject-manage/:id",
                      name: "detail",
                      component: "@/pages/SubjectManage/DetailSubject",
                      breadcrumbName: "Chi tiết",
                      exact: true,
                      hideInMenu: true,
                      authority: ["1"]
                    },
                  ]
                },
                {
                  path: "/account-manage",
                  name: "account-manage",
                  icon: "UsergroupAddOutlined",
                  component: "@/pages/AccountManage",
                  authority: ["1"],
                },
                {
                  name: "account",
                  icon: "UserOutlined",
                  path: "/account",
                  component: "@/pages/Account",
                  authority: ["1", "2", "3"],
                },
                {
                  name: "message",
                  icon: "MessageOutlined",
                  path: "/message",
                  component: "@/pages/Chat",
                  authority: ["1", "2", "3"],
                },
                {
                  name: "settings",
                  icon: "SettingOutlined",
                  path: "/settings",
                  component: "@/pages/settings",
                  authority: ["1", "2", "3"],
                },
                {
                  component: "404",
                },
              ],
            },
            {
              component: "404",
            },
          ]
        },
        {
          component: "404",
        },
      ],
    },
  ],
  theme: {
    "primary-color": defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || "dev"],
  manifest: {
    basePath: "/",
  },
  exportStatic: {},
  esbuild: {},
});
