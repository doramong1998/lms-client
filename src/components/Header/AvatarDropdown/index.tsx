import { useEffect } from 'react'
import type { FC } from 'react'
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import type { Dispatch } from 'umi'
import { history, connect, FormattedMessage } from 'umi'
import classNames from 'classnames'
import styles from '../styles.less'
import { Account,AccountT } from '@/pages/Account/data'

type Props = {
  dispatch: Dispatch
  accountInfo: Account
}

const AvatarDropdown: FC<Props> = ({ dispatch, accountInfo }) => {
  useEffect(() => {
    dispatch({
      type: 'account/getAccount',
    })
  }, [])

  const onMenuClick = (e: any) => {
    if (e.key === 'logout') {
      if (dispatch) {
        dispatch({
          type: 'userAndLogin/logout',
        })
      }

      return
    }

    history.push(`/settings`)
  }

  return (
    <Dropdown
      overlayClassName={classNames(styles.container)}
      overlay={
        <Menu className={styles.menu}
          selectedKeys={[]}
          onClick={onMenuClick}>
          <Menu.Item key="account">
            <SettingOutlined />
            <FormattedMessage id="header.avatar.account"
              defaultMessage="Account" />
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout">
            <LogoutOutlined />
            <FormattedMessage id="header.avatar.logout"
              defaultMessage="Logout" />
          </Menu.Item>
        </Menu>
      }
    >
      <span className={`${styles.action} ${styles.account}`}>
        {/* {accountInfo?.data?.avatar ? (
                  <Avatar
                      size="small"
                      className={styles.avatar}
                      alt="avatar"
                      src={accountInfo?.data?.avatar?.url}
          />
              ) : (
                  <Avatar
                      size="small"
                      className={styles.avatar}
                      alt="avatar"
                      style={{ backgroundColor: '#f56a00' }}
          >
                      {accountInfo?.data?.firstName?.split('')[0]}
                  </Avatar>
              ) */}
        <Avatar
          size="small"
          className={styles.avatar}
          alt="avatar"
          src={accountInfo?.data?.avatar}
          />
        <span className="anticon">{accountInfo?.data?.lastName}</span>
      </span>
    </Dropdown>
  )
}

export default connect(
  ({ account }: { account: AccountT }) => ({
    accountInfo: account.detailAccount,
  })
)(AvatarDropdown)
