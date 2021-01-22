import React, { FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'
import ColorPicker from '../../../ColorPicker'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
  typeValue: string,
  el: any
}

const BackgroundColor: FunctionComponent<Props> = ({ typeValue, el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedSection = useSelector((state: ApplicationState) => state.builder.selectedSection)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [type, setType] = useState('linear-gradient')
  const [position, setPosition] = useState(0)
  const [visibleColor, setVisibleColor] = useState<any>(false)

  const openColorPicker = (value: string) => {
    setVisibleColor({ type: value, template: typeValue })
  }

  const onChangeValue = (key: string, value: any) => {
    if (typeValue === 'sections') {
      let sections = null
      if (key === 'type') {
        sections = html?.sections?.map((item: any) => {
          if (item?.id === selectedSection?.sectionId) {
            return {
              ...item,
              typeGradient: value,
            }
          }
          return item
        })
        setType(value)
      }
      if (key === 'position') {
        sections = html?.sections?.map((item: any) => {
          if (item?.id === selectedSection?.sectionId) {
            return {
              ...item,
              position: value,
            }
          }
          return item
        })
        setPosition(value)
      }
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
    } else if (typeValue === 'elements') {
      if (el?.type !== 'form') {
        let elements = null
        if (key === 'type') {
          elements = html?.elements?.map((item: any) => {
            if (item?.id === selectedId) {
              return {
                ...item,
                typeGradient: value,
              }
            }
            return item
          })
          setType(value)
        }
        if (key === 'position') {
          elements = html?.elements?.map((item: any) => {
            if (item?.id === selectedId) {
              return {
                ...item,
                position: value,
              }
            }
            return item
          })
          setPosition(value)
        }
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
        let elements = null
        let formItem = null
        if (key === 'type') {
          elements = html?.elements?.map((item: any) => {
            if (item?.id === selectedId) {
              return {
                ...item,
                typeGradient: value,
              }
            }
            return item
          })
          formItem = html?.formItem?.map((item: any) => {
            if (item?.formId === selectedId) {
              return {
                ...item,
                typeGradient: value,
              }
            }
            return item
          })
          setType(value)
        }
        if (key === 'position') {
          elements = html?.elements?.map((item: any) => {
            if (item?.id === selectedId) {
              return {
                ...item,
                position: value,
              }
            }
            return item
          })
          formItem = html?.formItem?.map((item: any) => {
            if (item?.formId === selectedId) {
              return {
                ...item,
                position: value,
              }
            }
            return item
          })
          setPosition(value)
        }
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
    } else {
      let formItem = null
      if (key === 'type') {
        formItem = html?.formItem?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              typeGradient: value,
            }
          }
          return item
        })
        setType(value)
      }
      if (key === 'position') {
        formItem = html?.formItem?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              position: value,
            }
          }
          return item
        })
        setPosition(value)
      }
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

  const colorButton1 = css`
    cursor:pointer;
    background-color: ${el?.backgroundGradient1} !important;  
  `
  const colorButton2 = css`
    cursor:pointer;
    background-color: ${el?.backgroundGradient2} !important;  
  `

  return (
    <>
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
                      onClick={() => onChangeValue('type', 'linear-gradient')}
                    >
                      Linear
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => onChangeValue('type', 'radial-gradient')}
                    >
                      Radial
                    </Button>
                  </ButtonGroup>
                </Popover.Content>
              </Popover>
            )}
          >
            <Button className="__title">
              {type === 'linear-gradient' ? 'Linear' : 'Radial'}
            </Button>
          </OverlayTrigger>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label> Màu gradient 1</label>
        <div className={`__collapse__content ${colorButton1}`} onClick={() => openColorPicker('backgroundGradient1')} />
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label> Màu gradient 2</label>
        <div className={`__collapse__content ${colorButton2}`} onClick={() => openColorPicker('backgroundGradient2')} />
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Tọa độ</label>
        <div className="__collapse__content">
          <input type="number" defaultValue={position} onChange={e => onChangeValue('position', parseInt(e.target.value, 10))} />
        </div>
      </div>
      { visibleColor && <ColorPicker valueColor={visibleColor} top={-200} left={-400} el={el} onClose={() => setVisibleColor(false)} />}
    </>
  )
}

export default BackgroundColor
