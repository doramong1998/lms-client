import React, {
  FunctionComponent, useState, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
    el?: any
    type?: string
  }

const HeightSection: FunctionComponent<Props> = ({ el, type }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [widthValue, setWidthValue] = useState(0)

  useEffect(() => {
    setWidthValue(el[device]?.width)
  }, [el, device])

  const changeHeightSection = (height: any) => {
    if (type === 'elements') {
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === el?.id) {
          return {
            ...item,
            [device]: {
              ...item[device],
              width: parseInt(height, 10),
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
      const formItem = html?.formItem?.map((item: any) => {
        if (item?.id === el?.id) {
          return {
            ...item,
            [device]: {
              ...item[device],
              width: parseInt(height, 10),
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
  }

  return (
    <div className="d-flex align-items-center justify-content-between my-2">
      <label>Chiều rộng</label>
      <div className="__collapse__content">
        <input min={0} type="number" value={widthValue} onChange={e => changeHeightSection(e.target.value)} />
        <label style={{ marginRight: '10px', color: '#636e72' }}>px</label>
      </div>
    </div>
  )
}

export default HeightSection
