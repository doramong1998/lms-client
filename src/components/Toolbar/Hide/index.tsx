import React, { FunctionComponent, memo, useCallback } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  el: any
}

const Hide: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const callHideGroup = useCallback((newForms: any, newElements: any, id: string, type: string) => {
    if (type === 'group') {
      for (const item of html?.elements) {
        if (item.id === id) { // hide element group
          item[device].hide = !item[device]?.hide
        }
        if (item.groupId === id) { // check element có groupId
          callHideGroup(newForms, newElements, item.id, item.type)
        }
      }
    } else if (type === 'form') {
      for (const item of html?.elements) {
        if (item.id === id) { // hide element form
          item[device].hide = !item[device]?.hide
        }
      }
      for (const item of html?.formItem) {
        if (item.formId === id) { // hide element formItem
          item[device].hide = !item[device]?.hide
        }
      }
    } else { // hide element !== group && !== form
      for (const item of html?.elements) {
        if (item.id === id) {
          item[device].hide = !item[device]?.hide
        }
      }
    }
  }, [html, device])

  const onHide = useCallback(() => {
    if (el?.type === 'group') {
      const newElements = [...html?.elements]
      const newForms = [...html?.formItem]
      for (const item of newElements) {
        if (item?.id === el?.id) {
          item[device].hide = !item[device]?.hide
        }
      }
      for (const item of newElements) {
        if (item.groupId === el?.id) {
          callHideGroup(newForms, newElements, item.id, item.type)
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
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === el?.id) {
          return {
            ...item,
            [device]: {
              ...item[device],
              hide: !item[device]?.hide,
            },
          }
        }
        return item
      })
      dispatch(actionSaveHTML({
        ...html,
        elements,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements,
        },
      ]))
    }
  }, [dispatch, html, device, el, history, callHideGroup])

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={uid(10)}>{el[device]?.hide ? 'Hiện phần tử' : 'Ẩn phần tử'}</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onHide()}>
        <i className={`hi-icon icon-${el[device]?.hide ? 'preview' : 'b-preview'}`} />
      </Button>
    </OverlayTrigger>
  )
}

export default memo(Hide)
