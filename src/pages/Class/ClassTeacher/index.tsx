import type { FC } from 'react'
import { GridContent } from '@ant-design/pro-layout'
import { DetailSubject } from './components'

type Props = {}

const ClassManage: FC<Props> = () => {
  return (
    <GridContent>
      <div className="layout--main">
        <div className="layout--main__content">
          <DetailSubject />
        </div>
      </div>
    </GridContent>
  )
}

export default ClassManage
