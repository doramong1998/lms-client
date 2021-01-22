import React, { FunctionComponent, useState, useEffect } from 'react'
import { Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import BackgroundTypes from './BackgroundTypes'
import BackgroundColor from './BackgroundColor'
import BackgroundImage from './BackgroundImage'
import BackgroundGradient from './BackgroundGradient'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
  type: string
  el: any
}

const BackgroundSettings: FunctionComponent<Props> = ({ type, el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [event, setEvent] = useState('none')
  const [key, setKey] = useState(false)

  useEffect(() => {
    setEvent(el?.typeBackground)
  }, [el])

  const changeTypeBackground = (value: string) => {
    if (type === 'sections') {
      const sections = html?.sections?.map((item: any) => {
        if (item?.id === el?.id) {
          return {
            ...item,
            typeBackground: value,
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
    if (type === 'elements') {
      if (el.type !== 'form') {
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === el.id) {
            return {
              ...item,
              typeBackground: value,
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
          if (item?.id === el.id) {
            return {
              ...item,
              typeBackground: value,
            }
          }
          return item
        })
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.formId === el.id) {
            return {
              ...item,
              typeBackground: value,
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
      const formItem = html?.formItem?.map((item: any) => {
        if (item?.formId === el.id) {
          return {
            ...item,
            typeBackground: value,
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

  const renderEvent = (value: string) => {
    switch (value) {
      case 'color': return <BackgroundColor typeValue={type} el={el} />
      case 'image': return <BackgroundImage type={type} el={el} />
      case 'gradient': return <BackgroundGradient typeValue={type} el={el} />
      default:
        return null
    }
  }

  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            MÀU & HÌNH NỀN
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <BackgroundTypes event={event} el={el} setEvent={changeTypeBackground} />
          <div>
            {renderEvent(event)}
          </div>
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}
export default BackgroundSettings
