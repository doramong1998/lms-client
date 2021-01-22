/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useState, useEffect } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../../store/builder/actions'

export interface Props {
  el: any, type: string
}

const BackgroundSize: FunctionComponent<Props> = ({ el, type }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [backgroundSize, setBackgroundSize] = useState<any>(null)
  const arraySize = [
    {
      name: 'Mặc định',
      size: '',
      attachment: '',
      origin: '',
    },
    {
      name: 'Khung vừa tự động',
      size: 'cover',
      attachment: 'scroll',
      origin: 'content-box',
    },
    {
      name: 'Khung vừa cao',
      size: 'auto 100%',
      attachment: 'scroll',
      origin: 'content-box',
    },
    {
      name: 'Khung vừa rộng',
      size: '100%',
      attachment: 'scroll',
      origin: 'content-box',
    },
    {
      name: 'Parallax',
      size: 'cover',
      attachment: 'fixed  ',
      origin: '',
    },
  ]

  useEffect(() => {
    const obj1 = {
      size: el?.backgroundSize,
      attachment: el?.backgroundAttachment,
      origin: el?.backgroundOrigin,
    }
    for (const item of arraySize) {
      const obj2 = {
        size: item.size,
        attachment: item.attachment,
        origin: item.origin,
      }
      if (_.isEqual(obj1, obj2)) {
        setBackgroundSize(item)
      }
    }
  }, [])

  const onChangeValue = (value: any) => {
    if (type === 'elements') {
      if (el?.type !== 'form') {
        const elements = html[type]?.map((item: any) => {
          if (item?.id === el?.id) {
            return {
              ...item,
              backgroundSize: value.size,
              backgroundAttachment: value.attachment,
              backgroundOrigin: value.origin,
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
              backgroundSize: value.size,
              backgroundAttachment: value.attachment,
              backgroundOrigin: value.origin,
            }
          }
          return item
        })
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.formId === el?.id) {
            return {
              ...item,
              backgroundSize: value.size,
              backgroundAttachment: value.attachment,
              backgroundOrigin: value.origin,
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
            backgroundSize: value.size,
            backgroundAttachment: value.attachment,
            backgroundOrigin: value.origin,
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
            backgroundSize: value.size,
            backgroundAttachment: value.attachment,
            backgroundOrigin: value.origin,
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
    setBackgroundSize(value)
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
                  {
                    arraySize.map((item: any, index: number) => (
                      <Button
                        variant="outline-primary"
                        onClick={() => onChangeValue(item)}
                        key={index}
                      >
                        {item.name}
                      </Button>
                    ))
                  }
                </ButtonGroup>
              </Popover.Content>
            </Popover>
          )}
        >
          <Button className="__title">
            {backgroundSize ? backgroundSize?.name : ''}
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  )
}

export default BackgroundSize
