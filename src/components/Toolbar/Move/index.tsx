/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FunctionComponent, memo, useEffect, useState,
} from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'
import { actionHandleMouseDown } from '../../../store/mouse/actions'

export interface Props { }

const Move: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()

  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const mouseMove = useSelector((state: ApplicationState) => state.mouse.mouseMove)
  const mouseDown = useSelector((state: ApplicationState) => state.mouse.mouseDown)
  const selectedSection = useSelector((state: ApplicationState) => state.builder.selectedSection)

  const [originElement, setOriginElement] = useState<any>()
  const [originElementHasTopLower, setOriginElementHasTopLower] = useState<any>()

  useEffect(() => {
    const section = html?.sections?.find((item: any) => item?.id === selectedSection?.sectionId)
    const element = html?.elements?.find((item: any) => item?.id === selectedId)
    const elementsHasTopLower = html?.elements?.filter((item: any) =>
      item?.sectionId === selectedSection?.sectionId
      && item[device]?.top >= element[device]?.top
      && item[device]?.top < section[device]?.height)
    setOriginElement(element ? element : [])
    setOriginElementHasTopLower(elementsHasTopLower ? elementsHasTopLower : [])
  }, [mouseDown])

  useEffect(() => {
    if (!dragging && mouseDown.status && mouseDown.type === 'move') {
      const elementsHasTopLower: any = []
      if (originElementHasTopLower) {
        for (const item of originElementHasTopLower) {
          elementsHasTopLower.push(item?.id)
        }
      }
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === selectedId) {
          const changeTop = (originElement?.[device]?.top || 0) + mouseMove.pageY - mouseDown.pageY
          return {
            ...item,
            [device]: {
              ...item[device],
              top: changeTop,
            },
          }
        }
        if (elementsHasTopLower.length > 0 && elementsHasTopLower?.indexOf(item?.id) !== -1 && item?.groupId === '') {
          const changeTop = (originElementHasTopLower.find((i: any) => i?.id === item?.id)?.[device]?.top || 0) + mouseMove.pageY - mouseDown.pageY
          return {
            ...item,
            [device]: {
              ...item[device],
              top: changeTop,
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
  }, [dispatch, mouseMove])
  return (
    <Button
      variant="outline-primary"
      className="border-0"
      style={{ cursor: 'row-resize' }}
      onMouseDown={e => {
        e.stopPropagation()
        dispatch(actionHandleMouseDown({
          status: true,
          pageX: e.pageX,
          pageY: e.pageY,
          type: 'move',
        }))
      }}
    >
      <i className="hi-icon icon-cross-vertical" />
    </Button>
  )
}

export default memo(Move)
