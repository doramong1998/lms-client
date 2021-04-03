import type { FC } from 'react'
import { GridContent } from '@ant-design/pro-layout'
import { ListAccount } from './components'

type Props = {}

const LandingpPage: FC<Props> = () => {
  return (
    <GridContent>
      <div className="layout--main">
        <div className="layout--main__content">
          <ListAccount />
        </div>
      </div>
    </GridContent>
  )
}

export default LandingpPage
