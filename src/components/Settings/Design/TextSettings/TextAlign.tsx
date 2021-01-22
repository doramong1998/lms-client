import React, { FunctionComponent, useState, useEffect } from 'react'
import {
  OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
  el?: any
 }

const TextAlign: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const [textAlign, setTextAlign] = useState('')

  useEffect(() => {
    setTextAlign(el?.[device]?.textAlign)
  }, [el, device])

  const onChangeElement = (value: any) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          [device]: {
            ...item[device],
            textAlign: value,
          },
        }
      }
      return item
    })
    const formItem = html?.formItem?.map((item: any) => {
      if (item?.formId === selectedId) {
        return {
          ...item,
          [device]: {
            ...item[device],
            textAlign: value,
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

  return (
    <div className="d-flex align-items-center justify-content-between my-2">
      <label>Căn chỉnh</label>
      <div className="__collapse__content">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="bold">Căn trái</Tooltip>}
        >
          <i
            className={`hi-icon icon-align-left-2 ${styles.iconCustom} ${textAlign === 'left' ? styles.active : ''}`}
            onClick={() => onChangeElement('left')}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="italic">Căn phải</Tooltip>}
        >
          <i
            className={`hi-icon icon-align-right-2 ${styles.iconCustom} ${textAlign === 'right' ? styles.active : ''}`}
            onClick={() => onChangeElement('right')}
          />
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="underline">Căn giữa</Tooltip>}
        >
          <i
            className={`hi-icon icon-align-center ${styles.iconCustom} ${textAlign === 'center' ? styles.active : ''}`}
            onClick={() => onChangeElement('center')}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="strikethrough">Căn đều 2 bên</Tooltip>}
        >
          <i
            className={`hi-icon icon-align-justify ${styles.iconCustom} ${textAlign === 'justify' ? styles.active : ''}`}
            onClick={() => onChangeElement('justify')}
          />
        </OverlayTrigger>
      </div>
    </div>
  )
}
export default TextAlign
