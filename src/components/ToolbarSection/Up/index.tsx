import React, { FunctionComponent } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  selectedSection: any
}

const Up: FunctionComponent<Props> = ({ selectedSection }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const onUp = () => {
    let current = 0
    html?.sections?.forEach((item: any, index: number) => {
      if (item?.id === selectedSection?.sectionId) {
        current = index
      }
    })
    const newSections = [...html?.sections]
    const currentSection = newSections.splice(current, 1)
    newSections.splice(current - 1, 0, ...currentSection)
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
      overlay={<Tooltip id={uid(10)}>Lên trên</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onUp()}>
        <i className="hi-icon icon-arrow-up" />
      </Button>
    </OverlayTrigger>
  )
}

export default Up
