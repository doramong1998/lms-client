import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fonts } from '../../../../utils'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
  el?: any
}

const FontFamily: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)

  const [fontFamily, setFontFamily] = useState('')

  useEffect(() => {
    setFontFamily(el?.fontFamily)
  }, [el])
  const setFont = (value: string) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          fontFamily: value,
        }
      }
      return item
    })
    const formItem = html?.formItem?.map((item: any) => {
      if (item?.formId === selectedId) {
        return {
          ...item,
          fontFamily: value,
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
      <label>Font chữ</label>
      <div className="__collapse__content">
        <OverlayTrigger
          trigger="focus"
          placement="bottom"
          overlay={(
            <Popover id="popover-basic" className="settings__popover">
              <Popover.Content style={{ maxHeight: '200px', overflow: 'auto' }}>
                <ButtonGroup vertical size="sm">
                  <Button
                    variant="outline-primary"
                    onClick={() => setFont('')}
                    style={{ textAlign: 'center' }}
                  >
                    Không chọn
                  </Button>
                  {fonts.map((font:any, index: number) => (
                    <Button
                      key={index}
                      variant="outline-primary"
                      onClick={() => setFont(font)}
                    >
                      <label style={{ fontFamily: font, marginBottom: 0 }}>{font}</label>
                    </Button>
                  ))}

                </ButtonGroup>
              </Popover.Content>
            </Popover>
          )}
        >
          <Button className="__title">
            {fontFamily !== '' ? <label style={{ fontFamily }}>{fontFamily}</label> : 'Mặc định'}
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  )
}

export default FontFamily
