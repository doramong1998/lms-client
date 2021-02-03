import React from 'react'
import type { FC } from 'react'
import { GridContent } from '@ant-design/pro-layout'
import { ListLandingPage } from './components'

type Props = {}

const LandingpPage: FC<Props> = () => {
  return (
    <GridContent>
      <div className="layout--main">
        <div className="layout--main__content">
          <ListLandingPage />
        </div>
      </div>
    </GridContent>
  )
}

export default LandingpPage
