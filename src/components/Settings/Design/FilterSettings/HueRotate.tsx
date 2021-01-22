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

const HueRotate: FunctionComponent<Props> = ({ el, type }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [hueRotate, setHueRotate] = useState(el?.filter?.hueRotate)

  const onChangeValue = (value: any) => {
    if (type === 'elements') {
      if (el?.type !== 'form') {
        const elements = html[type]?.map((item: any) => {
          if (item?.id === el?.id) {
            return {
              ...item,
              filter: {
                ...item?.filter,
                hueRotate: value,
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
              filter: {
                ...item?.filter,
                hueRotate: value,
              },
            }
          }
          return item
        })
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.formId === el?.id) {
            return {
              ...item,
              filter: {
                ...item?.filter,
                hueRotate: value,
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
            filter: {
              ...item?.filter,
              hueRotate: value,
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
    if (type === 'sections') {
      const sections = html[type]?.map((item: any) => {
        if (item?.id === el?.id) {
          return {
            ...item,
            filter: {
              ...item?.filter,
              hueRotate: value,
            },
          }
        }
        return item
      })
      dispatch(actionSaveHTML({
        ...html,
        sections,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          sections,
        },
      ]))
    }
    setHueRotate(value)
  }
  return (
    <div className="d-flex align-items-center justify-content-between my-2">
      <label>Hue Rotate</label>
      <div className="__collapse__content">
        <input type="number" value={hueRotate} onChange={e => onChangeValue(e.target.value)} />
        <label style={{ marginRight: '10px', color: '#636e72' }}>deg</label>
      </div>
    </div>
  )
}

export default HueRotate
