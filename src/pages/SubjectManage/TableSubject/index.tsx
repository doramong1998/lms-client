import type { FC } from 'react'
import { GridContent } from '@ant-design/pro-layout'
import { ListSubject } from './components'

type Props = {}

const LandingpPage: FC<Props> = () => {
  return (
    <GridContent>
      <div className="layout--main">
        <div className="layout--main__content">
          <ListSubject />
        </div>
      </div>
    </GridContent>
  )
}

export default LandingpPage
