import React from 'react'
import type { FC } from 'react'
import { GridContent } from '@ant-design/pro-layout'
import { ListTheme } from './components'

type Props = {}

const Themes: FC<Props> = () => {
  return (
    <GridContent>
      <div className="layout--main">
        <div className="layout--main__content">
          <ListTheme />
        </div>
      </div>
    </GridContent>
  )
}

export default Themes
