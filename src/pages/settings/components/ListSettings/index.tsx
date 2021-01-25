/* eslint-disable no-underscore-dangle */
import React from 'react'
import type { FC } from 'react'
import {
  Row,
  Divider,
  Tabs,
} from 'antd'
import type { Dispatch } from 'umi'
import { connect, FormattedMessage } from 'umi'
import type { UserAndLogin } from '@/pages/user/login/data'
import General from './General'
import Introduce from './Introduce'

const { TabPane } = Tabs

type Props = {
  dispatch: Dispatch
  userAndLogin: UserAndLogin
}

const ListSettings: FC<Props> = () => {
  return (
    <>
      <div className="layout--main__title">
        <FormattedMessage id="settings.settings" />
      </div>
      <Divider />
      <Row>
        <Tabs className='w--full'>
          <TabPane tab={<FormattedMessage id="settings.tabs.general" />} key="general">
            <General />
          </TabPane>
          <TabPane tab={<FormattedMessage id="settings.tabs.member" />} key="member">
            Member
          </TabPane>
          <TabPane tab={<FormattedMessage id="settings.tabs.team" />} key="team">
            Team
          </TabPane>
          <TabPane tab={<FormattedMessage id="settings.tabs.history" />} key="history">
            History
          </TabPane>
          <TabPane tab={<FormattedMessage id="settings.tabs.introduce" />} key="introduce">
            <Introduce />
          </TabPane>
        </Tabs>
      </Row>
    </>
  )
}

export default connect()(ListSettings)
