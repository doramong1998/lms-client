import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { FC } from 'react'
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout'
import ProLayout from '@ant-design/pro-layout'
import type { Dispatch } from 'umi'
import { Link, useIntl, connect, history } from 'umi'
import { Result, Button } from 'antd'
import Authorized from '@/utils/Authorized'
import { Header } from '@/components'
import type { ConnectState } from '@/models/connect'
import { getMatchMenu } from '@umijs/route-utils'
import SecurityLayout from '../SecurityLayout'

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Bạn không có quyền truy cập trang này!"
    extra={
      <Button type="primary">
        <Link to="/">Về trang chủ</Link>
      </Button>
    }
  />
)
export type Props = {
  breadcrumbNameMap: Record<string, MenuDataItem>
  route: ProLayoutProps['route'] & {
    authority: string[]
  }
  settings: Settings
  dispatch: Dispatch
} & ProLayoutProps
export type BasicLayoutContext = { [K in 'location']: Props[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>
}

const menuDataRender = (menuList: MenuDataItem[]): any =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    }
      return Authorized.check(item.authority, localItem, null) as MenuDataItem
  })

const BasicLayout: FC<Props> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props
  const { formatMessage } = useIntl()
  const menuDataRef = useRef<MenuDataItem[]>([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      })
    }
    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', resizeWindow)
    return () => {
      window.removeEventListener('resize', resizeWindow)
    }
  }, [dispatch])

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  )
  return (
    <>
      {windowWidth < 768 ? (
        <Result
          status="403"
          title="Sản phẩm của chúng tôi không hỗ trợ trên thiết bị điện thoại!"
          subTitle="Vui lòng sử dụng trên các thiết bị máy tính bảng hoặc máy tính cá nhân."
        />
      ) : (
        <SecurityLayout>
          <ProLayout
            logo="https://www.mu.my/files/uploads/lms-training-background.png"
            formatMessage={formatMessage}
            {...props}
            {...settings}
            onMenuHeaderClick={() => history.push('/')}
            menuItemRender={(menuItemProps, defaultDom) => {
              if (menuItemProps.isUrl || !menuItemProps.path) {
                return defaultDom
              }

              return <Link to={menuItemProps.path}>{defaultDom}</Link>
            }}
            breadcrumbRender={(routers = []) => [
              {
                path: '/',
                breadcrumbName: formatMessage({
                  id: 'menu.home',
                }),
              },
              ...routers,
            ]}
            itemRender={(route, params, routes, paths) => {
              const first = routes.indexOf(route) === 0
              return first ? (
                <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
              ) : (
                <span>{route.breadcrumbName}</span>
              )
            }}
            footerRender={false}
            menuDataRender={menuDataRender}
            rightContentRender={() => <Header />}
            postMenuData={(menuData) => {
              menuDataRef.current = menuData || []
              return menuData || []
            }}
          >
            <Authorized authority={authorized!.authority}
              noMatch={noMatch}>
              {children}
            </Authorized>
          </ProLayout>
        </SecurityLayout>
      )}
    </>
  )
}

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(BasicLayout)
