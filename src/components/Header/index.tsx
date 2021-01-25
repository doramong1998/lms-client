import React from 'react'
import type { FC } from 'react'
import { Tag } from 'antd'
import { SelectLang } from 'umi'
import AvatarDropdown from './AvatarDropdown'
import styles from './styles.less'

type Props = {}

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
}

const Header: FC<Props> = () => {
  return (
    <div className={styles.right}>
      <AvatarDropdown />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <SelectLang className={styles.action} />
    </div>
  )
}

export default Header
