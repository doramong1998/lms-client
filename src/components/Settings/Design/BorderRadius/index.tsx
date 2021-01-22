import React, { FunctionComponent, useState, useEffect } from 'react'
import { Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import ColorPicker from '../../../ColorPicker'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'
import BorderRadiusStyle from './BorderRadiusStyle'
import BorderRadius from './BorderRadius'

export interface Props {
  type: string
  el: any
}

const BorderSettings: FunctionComponent<Props> = ({ type, el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)

  const [border, setBorder] = useState('none')
  const [width, setWidth] = useState(0)
  const [key, setKey] = useState(false)
  const [visibleColor, setVisibleColor] = useState<any>(false)

  useEffect(() => {
    setBorder(el?.borderRadius?.borderStyle)
    setWidth(el?.borderRadius?.borderWidth)
  }, [el])

  const colorButton = css`
    cursor:pointer;
    background-color: ${el?.borderRadius?.borderColor} !important;  
  `

  const openColorPicker = (value: string) => {
    setVisibleColor({ type: value, template: type })
  }
  const setBorderRadius = (value: string) => {
    if (type === 'elements') {
      if (el?.type === 'form') {
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              borderRadius: {
                ...item.borderRadius,
                borderStyle: value,
                borderWidth: 4,
              },
            }
          }
          return item
        })
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.formId === selectedId) {
            return {
              ...item,
              borderRadius: {
                ...item.borderRadius,
                borderStyle: value,
                borderWidth: 4,
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
      } else {
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              borderRadius: {
                ...item.borderRadius,
                borderStyle: value,
                borderWidth: 4,
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
    }
    if (type === 'formItem') {
      const formItem = html?.formItem?.map((item: any) => {
        if (item?.id === selectedId) {
          return {
            ...item,
            borderRadius: {
              ...item.borderRadius,
              borderStyle: value,
              borderWidth: 4,
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

  const onChangeValue = (key: string, value: number) => {
    if (type === 'elements') {
      if (el?.type === 'form') {
        if (key === 'borderAll') {
          const elements = html?.elements?.map((item: any) => {
            if (item?.id === selectedId) {
              return {
                ...item,
                borderRadius: {
                  ...item.borderRadius,
                  [key]: value,
                  borderTopLeftRadius: value,
                  borderTopRightRadius: value,
                  borderBottomRightRadius: value,
                  borderBottomLeftRadius: value,
                },
              }
            }
            return item
          })
          const formItem = html?.formItem?.map((item: any) => {
            if (item?.formId === selectedId) {
              return {
                ...item,
                borderRadius: {
                  ...item.borderRadius,
                  [key]: value,
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
        } else if (key === 'borderWidth') {
          const elements = html?.elements?.map((item: any) => {
            if (item?.id === selectedId) {
              return {
                ...item,
                borderRadius: {
                  ...item.borderRadius,
                  [key]: value,
                },
              }
            }
            return item
          })
          const formItem = html?.formItem?.map((item: any) => {
            if (item?.formId === selectedId) {
              return {
                ...item,
                borderRadius: {
                  ...item.borderRadius,
                  [key]: value,
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
        } else {
          const elements = html?.elements?.map((item: any) => {
            if (item?.id === selectedId) {
              return {
                ...item,
                borderRadius: {
                  ...item.borderRadius,
                  [key]: value,
                  borderAll: 0,
                },
              }
            }
            return item
          })
          const formItem = html?.formItem?.map((item: any) => {
            if (item?.formId === selectedId) {
              return {
                ...item,
                borderRadius: {
                  ...item.borderRadius,
                  [key]: value,
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
      } else if (key === 'borderAll') {
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              borderRadius: {
                ...item.borderRadius,
                [key]: value,
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
      } else if (key === 'borderWidth') {
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              borderRadius: {
                ...item.borderRadius,
                [key]: value,
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
          if (item?.id === selectedId) {
            return {
              ...item,
              borderRadius: {
                ...item.borderRadius,
                [key]: value,
                borderAll: 0,
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
    }
    if (type === 'formItem') {
      if (key === 'borderAll') {
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              borderRadius: {
                ...item.borderRadius,
                [key]: value,
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
          formItem,
        }))
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            formItem,
          },
        ]))
      } else if (key === 'borderWidth') {
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              borderRadius: {
                ...item.borderRadius,
                [key]: value,
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
      } else {
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              borderRadius: {
                ...item.borderRadius,
                [key]: value,
                borderAll: 0,
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
  }

  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            VIỀN & BO GÓC
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <BorderRadiusStyle border={border} setBorder={setBorderRadius} />
          {border !== 'none' && (
            <>
              <div className="d-flex align-items-center justify-content-between my-2">
                <label>Màu</label>
                <div className={`__collapse__content ${colorButton}`} onClick={() => openColorPicker('borderRadius')} />
              </div>
              <div className="d-flex align-items-center justify-content-between my-2">
                <label>Kích thước</label>
                <div className="__collapse__content">
                  <input min={0} type="number" defaultValue={width} onChange={e => onChangeValue('borderWidth', parseInt(e.target.value, 10))} />
                </div>
              </div>
            </>
          )}
          <BorderRadius onChangeValue={onChangeValue} el={el} />
        </div>
      </Accordion.Collapse>
      {visibleColor && key && <ColorPicker valueColor={visibleColor} top={-400} left={-400} el={el} onClose={() => setVisibleColor(false)} />}
    </Accordion>
  )
}
export default BorderSettings
