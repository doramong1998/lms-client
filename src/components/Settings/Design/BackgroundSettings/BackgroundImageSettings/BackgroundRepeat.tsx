import React, { FunctionComponent, useState } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../../store/builder/actions'

export interface Props {
  el: any, type: string
}

const BackgroundRepeat: FunctionComponent<Props> = ({ el, type }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [backgroundRepeat, setBackgroundRepeat] = useState(el?.backgroundRepeat)

  const onChangeValue = (value: any) => {
    if (type === 'elements') {
      if (el?.type !== 'form') {
        const elements = html[type]?.map((item: any) => {
          if (item?.id === el?.id) {
            return {
              ...item,
              backgroundRepeat: value,
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
              backgroundRepeat: value,
            }
          }
          return item
        })
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.formId === el?.id) {
            return {
              ...item,
              backgroundRepeat: value,
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
            backgroundRepeat: value,
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
            backgroundRepeat: value,
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
    setBackgroundRepeat(value)
  }
  const renderColor = (value: string) => {
    switch (value) {
      case 'no-repeat': return <>Không lặp</>
      case 'repeat': return <>Lặp tất cả</>
      case 'repeat-x': return <>Lặp ngang</>
      case 'repeat-y': return <>Lặp dọc</>
      default: return null
    }
  }

  return (
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
                    onClick={() => onChangeValue('no-repeat')}
                  >
                    Không lặp
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => onChangeValue('repeat')}
                  >
                    Lặp tất cả
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => onChangeValue('repeat-x')}
                  >
                    Lặp ngang
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => onChangeValue('repeat-y')}
                  >
                    Lặp dọc
                  </Button>
                </ButtonGroup>
              </Popover.Content>
            </Popover>
          )}
        >
          <Button className="__title">
            {renderColor(backgroundRepeat)}
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  )
}

export default BackgroundRepeat
