import React, {
  useState, FunctionComponent, useEffect, memo,
} from 'react'
import {
  OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import '../styles.scss'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  selectedId: string,
  data: any,
}

const BorderRadius: FunctionComponent<Props> = ({ selectedId, data }) => {
  const dispatch = useDispatch()
  const [borderRadius, setBorderRadius] = useState<any>(null)

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  useEffect(() => {
    for (const item of html?.elements) {
      if (item?.id === selectedId) {
        setBorderRadius(item.borderRadius)
      }
    }
  }, [html, selectedId])

  const onChangeElement = (value:number) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          borderRadius: {
            ...item.borderRadius,
            borderAll: value,
            borderTopLeftRadius: value,
            borderTopRightRadius: value,
            borderBottomRightRadius: value,
            borderBottomLeftRadius: value,
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
        <input type="number" min="0" value={borderRadius && borderRadius?.borderAll ? borderRadius?.borderAll : 0} onChange={(data) => onChangeElement(parseInt(data.target.value, 10))} />
      </OverlayTrigger>
    </div>
  )
}

export default memo(BorderRadius)
