import React, { FunctionComponent } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  selectedSection: any
}

const Down: FunctionComponent<Props> = ({ selectedSection }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const onDown = () => {
    let current = 0
    html?.sections?.forEach((item: any, index: number) => {
      if (item?.id === selectedSection?.sectionId) {
        current = index
      }
    })
    const newSections = [...html?.sections]
    const currentSection = newSections.splice(current, 1)
    newSections.splice(current + 1, 0, ...currentSection)
    dispatch(actionSaveHTML({
      ...html,
      sections: newSections,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        sections: newSections,
      },
    ]))
  }

  return (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id={uid(10)}>Xuống dưới</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onDown()}>
        <i className="hi-icon icon-arrow-down" />
      </Button>
    </OverlayTrigger>
  )
}

export default Down
