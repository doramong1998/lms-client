/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FunctionComponent, useEffect, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import { actionSaveHTML } from '../../../store/builder/actions'
import { actionHandleMouseDown } from '../../../store/mouse/actions'
import './styles.scss'

export interface Props {
  el: any
  width?: any
  height?: any
  isFormItem?: boolean
}

const Rotate: FunctionComponent<Props> = ({
  el, width = 0, height = 0, isFormItem,
}) => {
  const dispatch = useDispatch()

  const resizing = useSelector((state: ApplicationState) => state.event.resizing)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const mouseMove = useSelector((state: ApplicationState) => state.mouse.mouseMove)
  const mouseDown = useSelector((state: ApplicationState) => state.mouse.mouseDown)

  const [originRotate, setOriginRotate] = useState(0)

  useEffect(() => {
    const element = html?.elements?.find((item: any) => item?.id === selectedId)
    if (element) {
      setOriginRotate(element?.transform?.rotate)
    }
  }, [selectedId])

  useEffect(() => {
    if (!dragging && mouseDown.status && mouseDown.type === 'rotate') {
      const calX = mouseMove.pageX - mouseDown.pageX
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === selectedId) {
          return {
            ...item,
            transform: {
              ...item.transform,
              rotate: originRotate + calX,
            },
          }
        }

        return item
      })
      // actionAddHistoryError
      dispatch(actionSaveHTML({
        ...html,
        elements,
      }))
    }
  }, [dispatch, mouseMove])

  return (
    <>
      {resizing && selectedId === el?.id && (
        <div style={{
          position: 'absolute',
          top: '100%',
          fontSize: 10,
          padding: '0 2px',
          backgroundColor: '#ffffffab',
          pointerEvents: 'none',
        }}
        >
          {`${width} x ${height}`}
        </div>
      )}
      {el?.id === selectedId && <div className="draggable__active" />}
      {!isFormItem && selectedId === el?.id && el?.lock && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          fontSize: 10,
          padding: '0 2px',
          backgroundColor: '#ffffffab',
          pointerEvents: 'none',
        }}
        >
          Locked
        </div>
      )}
      {!isFormItem && el?.id === selectedId && el?.type !== 'group' && el?.type !== 'luckySpin' && (
        <div
          className="transform--rotate"
          onMouseDown={e => {
            e.stopPropagation()
            dispatch(actionHandleMouseDown({
              status: true,
              pageX: e.pageX,
              pageY: e.pageY,
              type: 'rotate',
            }))
          }}
        >
          <i className="hi-icon icon-refresh" />
          <div className="transform--rotate__number">
            {`${el?.transform?.rotate}`}
            &#176;
          </div>
        </div>
      )}
    </>
  )
}

export default Rotate
