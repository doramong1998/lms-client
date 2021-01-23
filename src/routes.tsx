import React, { FunctionComponent } from 'react'
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import {
  Builder, Login, Home
} from './pages'
import { Avatar, Layout, Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'

const { Content, Footer } = Layout

export interface Props { }

const Routes: FunctionComponent<Props> = () => {
  const history = useHistory()
  console.log(history)
  return (
    <Layout style={{ width: '100%' }}>
     
      <Menu mode="horizontal" style={{ width: '100%', background: '#dfe4ea' }}>
        <Menu.Item key="mail">
          <Link to='/home' >Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to='/builder' >Giáo viên</Link>
        </Menu.Item>
        <SubMenu key="SubMenu" title="Khóa học">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="account">
          <Link to='/login' >Tài khoản</Link>

        </Menu.Item>
        <SubMenu key="userSetting" title={<><Avatar size={32} icon={<UserOutlined />} className='mr--10' />Tran Huy</>} style={{ float: 'right' }}>
          <Menu.Item key="user" icon={<UserOutlined />}>Cá nhân</Menu.Item>
          <Menu.Item key="setting" icon={<SettingOutlined />}>Cài đặt</Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>Đăng xuất</Menu.Item>
        </SubMenu>
      </Menu>

      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Switch>
          <Route exact path="/builder">
            <Builder />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/home">
          {history.location.pathname === '/home' && <div className='banner-page' style={{ backgroundImage: 'url(https://i.imgur.com/JR8ilHf.jpg)' }}>
      </div>}
            <Home />
          </Route>
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>CODE MASTER</Footer>
    </Layout>
  )
}

export default Routes
