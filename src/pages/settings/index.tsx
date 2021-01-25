import React from 'react'
import type { FC } from 'react'
import { GridContent } from '@ant-design/pro-layout'
import { ListSettings } from './components'

type Props = {}

const News: FC<Props> = () => {
  return (
    <GridContent>
      <div className="layout--main">
        <div className="layout--main__content">
          <ListSettings />
        </div>
      </div>
    </GridContent>
  )
}

export default News
