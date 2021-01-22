import React, { FunctionComponent, memo, useCallback } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML, actionSelectId } from '../../../store/builder/actions'

export interface Props {
  el: any
}

const Duplicate: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const callDuplicateGroup = useCallback((newForms: any, newElements: any, groupId: string, id: string, type: string) => {
    const newId = `id--${uid(32)}`
    if (type === 'group') {
      for (const item of html?.elements) {
        if (item.id === id) { // duplicate element group
          newElements.push({
            ...item,
            id: newId,
            groupId,
          })
        }
        if (item.groupId === id) { // check element có groupId
          callDuplicateGroup(newForms, newElements, newId, item.id, item.type)
        }
      }
    } else if (type === 'form') {
      for (const item of html?.elements) {
        if (item.id === id) { // duplicate element form
          newElements.push({
            ...item,
            id: newId,
            groupId,
          })
        }
      }
      for (const item of html?.formItem) {
        if (item.formId === id) { // duplicate element formItem
          newForms.push({
            ...item,
            id: `id--${uid(32)}`,
            formId: newId,
          })
        }
      }
    } else { // thêm element !== group && !== form
      for (const item of html?.elements) {
        if (item.id === id) {
          newElements.push({
            ...item,
            id: newId,
            groupId,
          })
        }
      }
    }
  }, [html])

  const onDuplicate = useCallback(() => {
    const newElements = [...html?.elements]
    const newForms = [...html?.formItem]
    const newId = `id--${uid(32)}`
    if (el?.type === 'group') {
      newElements.push({
        ...el,
        id: newId,
        [device]: {
          ...el?.[device],
          top: el?.[device].top + 30,
          left: el?.[device].left + 30,
        },
      })
      for (const item of html?.elements) {
        if (item.groupId === el?.id) {
          callDuplicateGroup(newForms, newElements, newId, item.id, item.type)
        }
      }
      dispatch(actionSaveHTML({
        ...html,
        elements: newElements,
        formItem: newForms,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements: newElements,
          formItem: newForms,
        },
      ]))
    } else if (el?.type === 'form') {
      for (const item of newElements) {
        if (item.id === el?.id) {
          newElements.push({
            ...item,
            id: newId,
            [device]: {
              ...item[device],
              top: item[device].top + 30,
              left: item[device].left + 30,
            },
          })
        }
      }
      for (const item of html?.formItem) {
        if (item.formId === el?.id) {
          newForms.push({
            ...item,
            id: `id--${uid(32)}`,
            formId: newId,
          })
        }
      }
      dispatch(actionSaveHTML({
        ...html,
        elements: newElements,
        formItem: newForms,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements: newElements,
          formItem: newForms,
        },
      ]))
    } else {
      for (const item of newElements) {
        if (item.id === el?.id) {
          newElements.push({
            ...item,
            id: newId,
            [device]: {
              ...item[device],
              top: item[device].top + 30,
              left: item[device].left + 30,
            },
          })
        }
      }
      dispatch(actionSaveHTML({
        ...html,
        elements: newElements,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements: newElements,
        },
      ]))
    }

    dispatch(actionSelectId(newId))
  }, [dispatch, device, html, el, history, callDuplicateGroup])
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={uid(10)}>Nhân bản (Ctrl + D)</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onDuplicate()}>
        <i className="hi-icon icon-duplicate" />
      </Button>
    </OverlayTrigger>
  )
}

export default memo(Duplicate)
