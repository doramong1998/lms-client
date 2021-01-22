import React, { FunctionComponent, memo, useCallback } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML, actionSelectId } from '../../../store/builder/actions'

export interface Props {
  el: any
}

const Delete: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const callDeleteGroup = useCallback((newForm:any, newElements: any, id: string, type: string) => {
    if (type === 'group') {
      for (const item in newElements) {
        if (newElements[item]?.groupId === id) {
          const type = newElements[item]?.type
          const id = newElements[item]?.id
          newElements[item] = undefined
          callDeleteGroup(newForm, newElements, id, type)
        }
      }
    } else if (type === 'form') {
      let id = ''
      for (const item in newElements) {
        if (newElements[item]?.groupId === id) {
          id = newElements[item]?.id
          newElements[item] = undefined
        }
      }
      for (const item in newForm) {
        if (newForm[item]?.formId === id) {
          newForm[item] = undefined
        }
      }
    } else { // thêm element !== group && !== form
      for (const item in newElements) {
        if (newElements[item]?.id === id) {
          newElements[item] = undefined
        }
      }
    }
  }, [])
  const onDelete = useCallback(() => {
    const newElements = [...html?.elements]
    const newForms = [...html?.formItem]
    if (el?.type === 'group') {
      for (const item in newElements) {
        if (newElements[item]?.id === el?.id) {
          const type = newElements[item]?.type
          const id = newElements[item]?.id
          newElements[item] = undefined
          callDeleteGroup(newForms, newElements, id, type)
        }
      }
      const newElement = newElements.filter((item: any) => item !== undefined)
      const newForm = newForms.filter((item: any) => item !== undefined)
      dispatch(actionSaveHTML({
        ...html,
        elements: newElement,
        formItem: newForm,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements: newElement,
          formItem: newForm,
        },
      ]))
    } else if (el?.type === 'form') {
      for (const item in newElements) {
        if (newElements[item].id === el?.id) {
          newElements.splice(parseInt(item, 10), 1)
        }
      }
      const formItem = html?.formItem?.map((item: any) => {
        if (item?.formId !== el?.id) {
          return item
        }
      })
      const newFormItem = formItem.filter((item: any) => item !== undefined)
      dispatch(actionSaveHTML({
        ...html,
        elements: newElements,
        formItem: newFormItem,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements: newElements,
          formItem: newFormItem,
        },
      ]))
    } else {
      for (const item in newElements) {
        if (newElements[item].id === el?.id) {
          newElements.splice(parseInt(item, 10), 1)
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
    dispatch(actionSelectId(''))
  }, [dispatch, el, html, history, callDeleteGroup])

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={uid(10)}>Xóa (Del)</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onDelete()}>
        <i className="hi-icon icon-bin" />
      </Button>
    </OverlayTrigger>
  )
}

export default memo(Delete)
