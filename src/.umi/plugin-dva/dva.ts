// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from 'E:/a/Doan/lms-client/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelSetting0 from 'E:/a/Doan/lms-client/src/models/setting.ts';
import ModelModel1 from 'E:/a/Doan/lms-client/src/pages/Account/model.ts';
import ModelModel2 from 'E:/a/Doan/lms-client/src/pages/AccountManage/model.ts';
import ModelModel3 from 'E:/a/Doan/lms-client/src/pages/Calendar/model.ts';
import ModelModel4 from 'E:/a/Doan/lms-client/src/pages/ClassManage/DetailClass/model.ts';
import ModelModel5 from 'E:/a/Doan/lms-client/src/pages/ClassManage/ListClass/model.ts';
import ModelModel6 from 'E:/a/Doan/lms-client/src/pages/Enroll/model.ts';
import ModelModel7 from 'E:/a/Doan/lms-client/src/pages/Files/model.ts';
import ModelModel8 from 'E:/a/Doan/lms-client/src/pages/SubjectManage/model.ts';
import ModelModel9 from 'E:/a/Doan/lms-client/src/pages/themes/model.ts';
import ModelModel10 from 'E:/a/Doan/lms-client/src/pages/user/change/model.ts';
import ModelModel11 from 'E:/a/Doan/lms-client/src/pages/user/forgot/model.ts';
import ModelModel12 from 'E:/a/Doan/lms-client/src/pages/user/login/model.ts';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'setting', ...ModelSetting0 });
app.model({ namespace: 'model', ...ModelModel1 });
app.model({ namespace: 'model', ...ModelModel2 });
app.model({ namespace: 'model', ...ModelModel3 });
app.model({ namespace: 'model', ...ModelModel4 });
app.model({ namespace: 'model', ...ModelModel5 });
app.model({ namespace: 'model', ...ModelModel6 });
app.model({ namespace: 'model', ...ModelModel7 });
app.model({ namespace: 'model', ...ModelModel8 });
app.model({ namespace: 'model', ...ModelModel9 });
app.model({ namespace: 'model', ...ModelModel10 });
app.model({ namespace: 'model', ...ModelModel11 });
app.model({ namespace: 'model', ...ModelModel12 });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (typeof window !== 'undefined') {
      _onCreate();
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
