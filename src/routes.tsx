import React, { FunctionComponent } from 'react'
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import {
  Builder, Login, Home
} from './pages'
import { Avatar, Layout, Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import logo from './assets/images/logopage.png'

const { Content, Footer, Header } = Layout

export interface Props { }

const Routes: FunctionComponent<Props> = () => {
  const history = useHistory()
  console.log(history)
  return (
    <Layout style={{ width: '100%' }}>
      <Header style={{ width: '100%', background: '#dfe4ea', position: 'fixed', zIndex: 1000, padding:0 }}>
          <img className='logo-page' src={logo}></img>
        <Menu mode="horizontal" >
          <Menu.Item key="home">
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
      </Header>


      <Content className="site-layout" style={{ padding: 0, marginTop: 66 }}>
        <Switch>
          <Route exact path="/builder">
            <Builder />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path='/'><Redirect to='/home'></Redirect></Route>
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>CODE MASTER</Footer>
    </Layout>
  )
}

export default Routes
