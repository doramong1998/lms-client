import React, { FunctionComponent, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rnd } from 'react-rnd'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'
import { actionResizeElement } from '../../../store/event/actions'
import { Event } from '../..'

export interface Props {
  el: any
  edit: boolean
  onResize: any
  width?: any
  height?: any
}

const ResizeFormItem: FunctionComponent<Props> = ({
  el, edit, onResize, width = 0, height = 0,
}) => {
  const dispatch = useDispatch()
  const event: any = useRef()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const resizing = useSelector((state: ApplicationState) => state.event.resizing)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const hanldeResize = (_e: any, direction: any, ref: any, _delta: any, position: { x: number, y: number }) => {
    onResize(
      { x: position.x, y: position.y },
      { width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10) },
      direction,
    )
  }

  const hanldeResizeStart = () => {
    dispatch(actionResizeElement(true))
  }

  const hanldeResizeStop = (_e: any, _direction: any, ref: any, _delta: any, position: { x: number, y: number }) => {
    const selectedItem = html?.formItem?.find((item: any) => item?.id === selectedId)
    const selectedElement = html?.elements?.find((item: any) => item?.id === selectedItem?.formId)
    if (selectedElement) {
      let maxHeight = 0
      let maxWidth = 0
      let maxTop = 0
      let maxLeft = 0

      const formItem = html?.formItem?.map((item: any) => {
        if (item?.id === el?.id && item?.formId === el?.formId) {
          return {
            ...item,
            [device]: {
              ...item[device],
              top: (el[device]?.top || 0) + position.y,
              left: (el[device]?.left || 0) + position.x,
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
            },
          }
        }
        return item
      })

      const itemsForm = []
      for (const item of formItem) {
        if (item.formId === selectedElement?.id) {
          itemsForm.push(item)
        }
      }

      for (const item of itemsForm) {
        if (item[device].top + item[device].height > maxHeight) {
          maxHeight = item[device].top + item[device].height
        }
        if (item[device].left + item[device].width > maxWidth) {
          maxWidth = item[device].left + item[device].width
        }
        if (item[device].top > maxTop) {
          maxTop = item[device].top
        }
        if (item[device].left > maxLeft) {
          maxLeft = item[device].left
        }
      }

      let minTop = maxTop
      let minLeft = maxLeft
      for (const item of itemsForm) {
        if (item[device].top < minTop) {
          minTop = item[device].top
        }
        if (item[device].left < minLeft) {
          minLeft = item[device].left
        }
      }

      const elements = html?.elements?.map((item: any) => {
        if (item?.id === selectedElement?.id) {
          return {
            ...item,
            [device]: {
              ...item[device],
              height: maxHeight - minTop,
              width: maxWidth - minLeft,
              top: item[device].top + minTop,
              left: item[device].left + minLeft,
            },
          }
        }
        return item
      })
      const newFormItem = formItem?.map((item: any) => {
        if (item?.id === selectedItem?.id && item?.formId === selectedItem?.formId) {
          return {
            ...item,
            [device]: {
              ...item[device],
              top: item[device]?.top - minTop,
              left: item[device]?.left - minLeft,
            },
          }
        }
        if (item?.formId === selectedItem?.formId && item?.id !== selectedItem?.id) {
          return {
            ...item,
            [device]: {
              ...item[device],
              top: item[device]?.top - minTop,
              left: item[device]?.left - minLeft,
            },
          }
        }
        return item
      })
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements,
          formItem: newFormItem,
        },
      ]))
      dispatch(actionSaveHTML({
        ...html,
        elements,
        formItem: newFormItem,
      }))
    }
    event.current.updatePosition({ x: 0, y: 0 })
    dispatch(actionResizeElement(false))
  }

  const enableResizing = () => {
    const resize = {
      bottom: true,
      bottomLeft: true,
      bottomRight: true,
      left: true,
      right: true,
      top: true,
      topLeft: true,
      topRight: true,
    }
    return !edit && el?.id === selectedId && !dragging ? resize : false
  }

  return (
    <>
      <Rnd
        ref={event}
        className="draggable"
        size={{ width: el[device]?.width || 0, height: el[device]?.height || 0 }}
        position={{ x: 0, y: 0 }}
        onResize={hanldeResize}
        onResizeStart={hanldeResizeStart}
        onResizeStop={hanldeResizeStop}
        minWidth={15}
        minHeight={15}
        resizeHandleClasses={{
          bottom: 'resize resize--bottom',
          bottomLeft: 'resize resize--bottomLeft',
          bottomRight: 'resize resize--bottomRight',
          left: 'resize resize--left',
          right: 'resize resize--right',
          top: 'resize resize--top',
          topLeft: 'resize resize--topLeft',
          topRight: 'resize resize--topRight',
        }}
        enableResizing={enableResizing()}
        resizeHandleWrapperStyle={{ display: resizing ? 'none' : 'inline-block' }}
      />
      <Event.Rotate el={el} width={width} height={height} isFormItem />
    </>
  )
}

export default ResizeFormItem
