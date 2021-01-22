import React, { FunctionComponent, useState, useEffect } from 'react'
import {
  Accordion, Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'
import ColorPicker from '../../../ColorPicker'

export interface Props {
  type: string
  el: any
}

const BoxShadowSettings: FunctionComponent<Props> = ({ type, el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)

  const [visibleColor, setVisibleColor] = useState<any>(false)
  const [event, setEvent] = useState('none')
  const [key, setKey] = useState(false)

  useEffect(() => {
    setEvent(el?.boxShadow)
  }, [el])

  const openColorPicker = (value: string) => {
    setVisibleColor({ type: value, template: type })
  }

  const changeShadow = (value: any) => {
    if (type === 'elements') {
      if (el?.type !== 'form') {
        const elements = html[type]?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              boxShadow: value,
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
          if (item?.id === selectedId) {
            return {
              ...item,
              boxShadow: value,
            }
          }
          return item
        })
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.formId === selectedId) {
            return {
              ...item,
              boxShadow: value,
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
        if (item?.id === selectedId) {
          return {
            ...item,
            boxShadow: value,
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

  const changeValue = (key: string, value: any) => {
    if (type === 'elements') {
      if (el?.type === 'form') {
        const elements = html?.elements?.map((item: any) => {
          if (item?.formId === selectedId) {
            return {
              ...item,
              [key]: value,
            }
          }
          return item
        })
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.formId === selectedId) {
            return {
              ...item,
              [key]: value,
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
      } else {
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              [key]: value,
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
    }
    if (type === 'formItem') {
      const formItem = html?.formItem?.map((item: any) => {
        if (item?.id === selectedId) {
          return {
            ...item,
            [key]: value,
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

  const colorButton = css`
  cursor:pointer;
  background-color: ${el?.boxShadow} !important;  
`

  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            ĐỔ BÓNG
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Chọn kiểu</label>
            <div className="__collapse__content">
              <OverlayTrigger
                trigger="focus"
                placement="bottom"
                overlay={(
                  <Popover id="popover-basic" className="settings__popover">
                    <Popover.Content>
                      <ButtonGroup vertical size="sm">
                        <Button
                          variant="outline-primary"
                          onClick={() => changeShadow('none')}
                        >
                          Không
                        </Button>
                        <Button
                          variant="outline-primary"
                          onClick={() => changeShadow('rgb(0,0,0,1)')}
                        >
                          Có
                        </Button>
                      </ButtonGroup>
                    </Popover.Content>
                  </Popover>
                )}
              >
                <Button className="__title">
                  {event === 'none' ? 'Không' : 'Có'}
                </Button>
              </OverlayTrigger>
            </div>
          </div>
          {event !== 'none'
            && (
              <>
                <div className="d-flex align-items-center justify-content-between my-2">
                  <label>Màu</label>
                  <div className={`__collapse__content ${colorButton}`} onClick={() => openColorPicker('boxShadow')} />
                </div>
                <div className="d-flex align-items-center justify-content-between my-2">
                  <label>Đổ  ngang</label>
                  <div className="__collapse__content">
                    <input type="number" defaultValue={el?.boxShadowWidth} onChange={e => changeValue('boxShadowWidth', e.target.value)} />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between my-2">
                  <label>Đổ  dọc</label>
                  <div className="__collapse__content">
                    <input type="number" defaultValue={el?.boxShadowHeight} onChange={e => changeValue('boxShadowHeight', e.target.value)} />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between my-2">
                  <label>Độ mờ</label>
                  <div className="__collapse__content">
                    <input type="number" defaultValue={el?.boxShadowOpacity} onChange={e => changeValue('boxShadowOpacity', e.target.value)} />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between my-2">
                  <label>Độ tối</label>
                  <div className="__collapse__content">
                    <input type="number" defaultValue={el?.boxShadowDark} onChange={e => changeValue('boxShadowDark', e.target.value)} />
                  </div>
                </div>
              </>
            )}

        </div>

      </Accordion.Collapse>
      { visibleColor && key && <ColorPicker valueColor={visibleColor} top={-200} left={-400} el={el} onClose={() => setVisibleColor(false)} />}
    </Accordion>
  )
}
export default BoxShadowSettings
