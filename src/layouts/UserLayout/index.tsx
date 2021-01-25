import React from 'react'
import type { FC } from 'react'
import type { MenuDataItem } from '@ant-design/pro-layout'
import { getMenuData, getPageTitle } from '@ant-design/pro-layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import type { ConnectProps } from 'umi'
import { SelectLang, useIntl, connect } from 'umi'
import styles from './styles.less'

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>
} & Partial<ConnectProps>

const UserLayout: FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props
  const { routes = [] } = route
  const {
    children,
    location = {
      pathname: '',
    },
  } = props
  const { formatMessage } = useIntl()
  const { breadcrumb } = getMenuData(routes)
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  })
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description"
          content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className="layout--main__content">
          <div className={styles.top}>
            <div className={styles.header}>
              <span className={styles.title}>Landing Page</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </HelmetProvider>
  )
}

export default connect(() => ({}))(UserLayout)
