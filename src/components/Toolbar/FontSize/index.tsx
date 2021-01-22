import React, {
  useState, FunctionComponent, useEffect, memo,
} from 'react'
import {
  OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import $ from 'jquery'
import { useSelector, useDispatch } from 'react-redux'
import '../styles.scss'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  selectedId: string
  data: any
}

const FontSize: FunctionComponent<Props> = ({ selectedId, data }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)
  const [fontSize, setFontSize] = useState(0)

  useEffect(() => {
    if (!dragging && html && selectedId) {
      for (const item of html?.elements) {
        if (item?.id === selectedId && item.type !== 'line') {
          setFontSize(item?.[device].fontSize)
        }
        if (item?.id === selectedId && item.type === 'line') {
          setFontSize(item.borderWidth)
        }
      }
    }
  }, [html, selectedId, dragging, device])

  const onChangeElement = (key:string, value:number) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedId && item.type !== 'line') {
        return {
          ...item,
          [device]: {
            ...item[device],
            [key]: value,
            height: item?.type !== 'button' ? $(`#${item?.id}`).height() : item[device]?.height,
          },
        }
      }
      if (item?.id === selectedId && item.type === 'line') {
        return {
          ...item,
          borderWidth: value,
          [device]: {
            ...item[device],
            height: selectedElement?.direction === 'horizon' ? parseInt(selectedElement[device]?.height, 10) + value - selectedElement?.borderWidth : parseInt(selectedElement[device]?.height, 10),
            width: selectedElement?.direction === 'horizon' ? parseInt(selectedElement[device]?.width, 10) : parseInt(selectedElement[device]?.width, 10) + value - selectedElement?.borderWidth,
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

  return (
    <div className="toolbar__item" key={data.value}>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={data.value}>{data.name}</Tooltip>}
      >
        <input type="number" min={0} value={fontSize} onChange={(data) => onChangeElement('fontSize', parseInt(data.target.value, 10))} />
      </OverlayTrigger>
    </div>
  )
}

export default memo(FontSize)
