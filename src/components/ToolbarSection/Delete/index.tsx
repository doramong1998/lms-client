import React, { FunctionComponent, useCallback } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import {
  actionAddHistory, actionSaveHTML, actionSelectId, actionSelectSection,
} from '../../../store/builder/actions'

export interface Props {
  selectedSection: any
}

const Delete: FunctionComponent<Props> = ({ selectedSection }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const onDelete = useCallback(() => {
    const newElements = [...html?.elements]
    const newSections = [...html?.sections]
    const newFormItem = [...html?.formItem]
    const filterElements = newElements.filter(item => item.sectionId !== selectedSection.sectionId)
    const filterSections = newSections.filter(item => item.id !== selectedSection.sectionId)
    const filterFormItem = newFormItem.filter(item => item.sectionId !== selectedSection.sectionId)
    dispatch(actionSaveHTML({
      ...html,
      sections: filterSections,
      elements: filterElements,
      formItem: filterFormItem,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        sections: filterSections,
        elements: filterElements,
        formItem: filterFormItem,
      },
    ]))
    dispatch(actionSelectId(''))
    dispatch(actionSelectSection({ ...selectedSection, visible: false }))
  }, [dispatch, html, selectedSection, history])

  return (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id={uid(10)}>Xóa (Del)</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onDelete()}>
        <i className="hi-icon icon-bin" />
      </Button>
    </OverlayTrigger>
  )
}

export default Delete
