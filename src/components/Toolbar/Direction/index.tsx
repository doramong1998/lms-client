import React, {
  FunctionComponent, memo, useCallback, useEffect, useState,
} from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  el: any
}

const Direction: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const [direction, setDirection] = useState('')

  useEffect(() => {
    for (const item of html?.elements) {
      if (item?.id === el?.id) {
        setDirection(item.direction)
      }
    }
  }, [html, el])

  const onChangeDirection = useCallback((value: string) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === el?.id && direction === 'horizon') {
        return {
          ...item,
          direction: value,
          [device]: {
            ...item[device],
            top: item[device]?.top + item.borderWidth / 2 - item[device]?.width / 2,
            left: item[device]?.left - item.borderWidth / 2 + item[device]?.width / 2,
            width: item[device]?.height,
            height: item[device]?.width,
          },
        }
      }
      if (item?.id === el?.id && direction === 'vertical') {
        return {
          ...item,
          direction: value,
          [device]: {
            ...item[device],
            top: item[device]?.top - item.borderWidth / 2 + item[device]?.height / 2,
            left: item[device]?.left + item.borderWidth / 2 - item[device]?.height / 2,
            width: item[device]?.height,
            height: item[device]?.width,
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
  }, [dispatch, el, device, direction, html, history])

  return (
    <Button variant="outline-primary" className="border-0" onClick={() => onChangeDirection(direction === 'horizon' ? 'vertical' : 'horizon')}>
      <span className="fontSize--10 p--5 whiteSpace--nowrap">
        {direction === 'horizon' ? 'XOAY DỌC' : 'XOAY NGANG'}
      </span>
    </Button>
  )
}

export default memo(Direction)
