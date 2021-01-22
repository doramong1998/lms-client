import React, {
  FunctionComponent, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
    el: any
    type: string
 }

const Opacity: FunctionComponent<Props> = ({ el, type }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const [opacity, setOpacity] = useState(el?.transform?.opacity)

  const onChangeValue = (value: any) => {
    if (type === 'elements') {
      if (el?.type !== 'form') {
        const elements = html[type]?.map((item: any) => {
          if (item?.id === el?.id) {
            return {
              ...item,
              transform: {
                ...item?.transform,
                opacity: value,
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
      } else {
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === el?.id) {
            return {
              ...item,
              transform: {
                ...item?.transform,
                opacity: value,
              },
            }
          }
          return item
        })
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.formId === el?.id) {
            return {
              ...item,
              transform: {
                ...item?.transform,
                opacity: value,
              },
            }
          }
          return item
        })
        dispatch(actionSaveHTML({
          ...html,
          elements,
          formItem,
        }))
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            elements,
            formItem,
          },
        ]))
      }
    }
    if (type === 'formItem') {
      const formItem = html[type]?.map((item: any) => {
        if (item?.id === el?.id) {
          return {
            ...item,
            transform: {
              ...item?.transform,
              opacity: value,
            },
          }
        }
        return item
      })
      dispatch(actionSaveHTML({
        ...html,
        formItem,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          formItem,
        },
      ]))
    }
    setOpacity(value)
  }
  return (
    <div className="d-flex align-items-center justify-content-between my-2">
      <label>Trong suốt</label>
      <div className="__collapse__content">
        <input type="number" value={opacity} onChange={e => onChangeValue(e.target.value)} />
        <label style={{ marginRight: '10px', color: '#636e72' }}>%</label>
      </div>
    </div>
  )
}

export default Opacity
