import React, { FunctionComponent, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rnd } from 'react-rnd'
import $ from 'jquery'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'
import { actionGroupResize, actionResizeElement, actionFormResize } from '../../../store/event/actions'
import { Event } from '../..'

export interface Props {
  el: any
  edit?: boolean
  onResize: any
  width?: any
  height?: any
  cropImage?: boolean
  editingCarosel?: any
}

const Resize: FunctionComponent<Props> = ({
  el, edit, onResize, width = 0, height = 0, cropImage, editingCarosel,
}) => {
  const dispatch = useDispatch()
  const event: any = useRef()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const resizing = useSelector((state: ApplicationState) => state.event.resizing)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const [size, setSize] = useState<any>(null)

  const hanldeResize = (_e: any, direction: any, ref: any, _delta: any, position: { x: number, y: number }) => {
    if (el?.type === 'group') {
      const percentWidth = (parseInt(ref.style.width, 10) / (el[device]?.width)) * 100
      const percentHeight = (parseInt(ref.style.height, 10) / (el[device]?.height)) * 100
      dispatch(actionGroupResize({ percentWidth, percentHeight }))
      onResize(
        { x: position.x, y: position.y },
        { width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10) },
        direction,
      )
    } else if (el?.type === 'form') {
      const percentWidth = (parseInt(ref.style.width, 10) / (el[device]?.width)) * 100
      const percentHeight = (parseInt(ref.style.height, 10) / (el[device]?.height)) * 100
      dispatch(actionFormResize({ percentWidth, percentHeight }))
      onResize(
        { x: position.x, y: position.y },
        { width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10) },
        direction,
      )
    } else if (cropImage) {
      if (position.x <= 0
          && position.y <= 0
          && parseInt(ref.style.width, 10) >= el?.[device]?.width - el?.crop?.left
          && parseInt(ref.style.height, 10) >= el?.[device]?.height - el?.crop?.top
      ) {
        setSize({
          x: position.x, y: position.y, width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10),
        })
        onResize(
          { x: position.x, y: position.y },
          { width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10) },
          direction,
        )
      }
    } else {
      onResize(
        { x: position.x, y: position.y },
        { width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10) },
        direction,
      )
    }
  }

  const hanldeResizeStart = () => {
    dispatch(actionResizeElement(true))
    dispatch(actionGroupResize(null))
    dispatch(actionFormResize(null))
  }

  const hanldeResizeStop = (_e: any, _direction: any, ref: any, _delta: any, position: { x: number, y: number }) => {
    const percentWidth = (parseInt(ref.style.width, 10) / (el[device]?.width)) * 100
    const percentHeight = (parseInt(ref.style.height, 10) / (el[device]?.height)) * 100
    if (el?.groupId && el?.groupId !== '') {
      const newElements = html?.elements?.map((item: any) => {
        if (item?.id === el?.id && item?.sectionId === el?.sectionId && item?.type !== 'line') {
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
        if (item?.id === el?.id && item?.sectionId === el?.sectionId && item?.type === 'line') {
          if (item?.direction === 'horizon') {
            return {
              ...item,
              [device]: {
                ...item[device],
                top: (el[device]?.top || 0) + position.y,
                left: (el[device]?.left || 0) + position.x,
                width: parseInt(ref.style.width, 10),
              },
            }
          }
          return {
            ...item,
            [device]: {
              ...item[device],
              top: (el[device]?.top || 0) + position.y,
              left: (el[device]?.left || 0) + position.x,
              width: parseInt(ref.style.height, 10),
            },
          }
        }
        return item
      })
      const selectedGroup = html?.elements?.find((item: any) => item?.id === el?.groupId)
      if (selectedGroup) {
        let maxHeight = 0
        let maxWidth = 0
        let maxTop = 0
        let maxLeft = 0

        const itemsGroup = []
        for (const item of newElements) {
          if (item.groupId === selectedGroup?.id) {
            itemsGroup.push(item)
          }
        }

        for (const item of itemsGroup) {
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
        for (const item of itemsGroup) {
          if (item[device].top < minTop) {
            minTop = item[device].top
          }
          if (item[device].left < minLeft) {
            minLeft = item[device].left
          }
        }
        const elements = newElements?.map((item: any) => {
          if (item?.id === selectedGroup?.id) {
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
        let resultElement = []
        let resultFormItem = [...html?.formItem]
        if (el?.type === 'group') {
          resultElement = elements?.map((item: any) => {
            if (item?.groupId === el?.groupId) {
              return {
                ...item,
                [device]: {
                  ...item[device],
                  top: item[device]?.top - minTop,
                  left: item[device]?.left - minLeft,
                },
              }
            }
            if (item?.groupId === el?.id) {
              return {
                ...item,
                [device]: {
                  ...item[device],
                  top: ((item[device]?.top - minTop) * percentHeight) / 100,
                  left: ((item[device]?.left - minLeft) * percentWidth) / 100,
                  width: (item[device]?.width * percentWidth) / 100,
                  height: (item[device]?.height * percentHeight) / 100,
                },
              }
            }
            return item
          })
        } else if (el?.type === 'form') {
          resultElement = elements?.map((item: any) => {
            if (item?.id === el?.id) {
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
          resultFormItem = html?.formItem?.map((item: any) => {
            if (item?.formItem === el?.id) {
              return {
                ...item,
                [device]: {
                  ...item[device],
                  top: (item[device]?.top * percentHeight) / 100,
                  left: (item[device]?.left * percentWidth) / 100,
                  width: (item[device]?.width * percentWidth) / 100,
                  height: (item[device]?.height * percentHeight) / 100,
                },
              }
            }
            return item
          })
        } else {
          resultElement = elements?.map((item: any) => {
            if (item?.groupId === el?.groupId) {
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
        }
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            elements: resultElement,
            formItem: resultFormItem,
          },
        ]))
        dispatch(actionSaveHTML({
          ...html,
          elements: resultElement,
          formItem: resultFormItem,
        }))
      }
    } else if (cropImage && size) {
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === selectedId) {
          return {
            ...item,
            crop: {
              ...item.crop,
              top: size?.y,
              left: size?.x,
              width: size?.width,
              height: size?.height,
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
        },
      ]))
      dispatch(actionSaveHTML({
        ...html,
        elements,
      }))
    } else {
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === el?.id && item?.sectionId === el?.sectionId && item?.type !== 'line' && item?.type !== 'image' && item?.type !== 'luckySpin') {
          return {
            ...item,
            [device]: {
              ...item[device],
              top: (el[device]?.top || 0) + position.y,
              left: (el[device]?.left || 0) + position.x,
              width: parseInt(ref.style.width, 10),
              height: (el?.type === 'paragraph' || el?.type === 'list' || el?.type === 'heading') ? $(`#${item?.id}`).height() : parseInt(ref.style.height, 10),
            },
          }
        }
        if (item?.id === el?.id && item?.sectionId === el?.sectionId && item?.type === 'line') {
          if (item?.direction === 'horizon') {
            return {
              ...item,
              [device]: {
                ...item[device],
                top: (el[device]?.top || 0) + position.y,
                left: (el[device]?.left || 0) + position.x,
                width: parseInt(ref.style.width, 10),
              },
            }
          }
          return {
            ...item,
            [device]: {
              ...item[device],
              top: (el[device]?.top || 0) + position.y,
              left: (el[device]?.left || 0) + position.x,
              width: parseInt(ref.style.height, 10),
            },
          }
        }
        if (item?.id === el?.id && item?.sectionId === el?.sectionId && item?.type === 'image') {
          return {
            ...item,
            crop: {
              ...item.crop,
              width: (item.crop.width * percentWidth) / 100,
              height: (item.crop.height * percentHeight) / 100,
            },
            [device]: {
              ...item[device],
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
            },
          }
        }
        if (item?.id === el?.id && item?.sectionId === el?.sectionId && item?.type === 'luckySpin') {
          return {
            ...item,
            [device]: {
              ...item[device],
              top: (el[device]?.top || 0) + position.y,
              left: (el[device]?.left || 0) + position.x,
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.width, 10),
            },
          }
        }
        if (el?.type === 'group' && el?.id === item?.groupId) {
          return {
            ...item,
            [device]: {
              ...item[device],
              top: (item[device]?.top * percentHeight) / 100,
              left: (item[device]?.left * percentWidth) / 100,
              width: (item[device]?.width * percentWidth) / 100,
              height: (item[device]?.height * percentHeight) / 100,
            },
          }
        }
        return item
      })
      const formItem = html?.formItem?.map((item: any) => {
        if (item?.formId === el?.id) {
          return {
            ...item,
            [device]: {
              ...item[device],
              top: (item[device]?.top * percentHeight) / 100,
              left: (item[device]?.left * percentWidth) / 100,
              width: (item[device]?.width * percentWidth) / 100,
              height: (item[device]?.height * percentHeight) / 100,
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
          formItem,
        },
      ]))
      dispatch(actionSaveHTML({
        ...html,
        elements,
        formItem,
      }))
    }
    if (!cropImage) event.current.updatePosition({ x: 0, y: 0 })
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
    switch (el?.type) {
      case 'button':
        break
      case 'heading':
      case 'list':
      case 'paragraph':
        resize.bottom = false
        resize.bottomLeft = false
        resize.bottomRight = false
        resize.top = false
        resize.topLeft = false
        resize.topRight = false
        break
      case 'line':
        if (el?.direction === 'horizon') {
          resize.bottom = false
          resize.bottomLeft = false
          resize.bottomRight = false
          resize.top = false
          resize.topLeft = false
          resize.topRight = false
        } else {
          resize.left = false
          resize.bottomLeft = false
          resize.bottomRight = false
          resize.right = false
          resize.topLeft = false
          resize.topRight = false
        }
        break
      case 'luckySpin':
        resize.topLeft = false
        resize.topRight = false
        resize.bottom = false
        resize.top = false
        resize.left = false
        resize.right = false
        break
      default:
        break
    }
    if (editingCarosel?.value) {
      return {
      }
    }
    return !edit && !el?.lock && el?.id === selectedId && !dragging ? resize : false
  }

  const renderWidth = () => {
    if (cropImage) {
      return el?.crop?.width
    }
    if (editingCarosel?.value) {
      return $(`#${el?.id}`).width()
    }
    return el[device]?.width
  }
  return (
    <>
      <Rnd
        ref={event}
        className={`${!cropImage ? 'draggable' : ''} ${(el?.type === 'heading' || el?.type === 'paragraph' || el?.type === 'list' || el?.type === 'line') ? 'resize--custom' : ''}`}
        size={{ width: renderWidth(), height: cropImage ? el?.crop?.height : el[device]?.height }}
        position={{ x: cropImage ? el?.crop?.left : 0, y: cropImage ? el?.crop?.top : 0 }}
        onResize={hanldeResize}
        onResizeStart={hanldeResizeStart}
        onResizeStop={hanldeResizeStop}
        disableDragging
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
      {!cropImage && <Event.Rotate el={el} width={width} height={height} />}
    </>
  )
}

export default Resize
