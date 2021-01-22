import React, { FunctionComponent, useState, useEffect } from 'react'
import { Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import OverlayTypes from './OverlayTypes'
import OverlayColor from './OverlayColor'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
  el: any
  type: string
}

const OverlaySettings: FunctionComponent<Props> = ({ el, type }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [event, setEvent] = useState('color')
  const [key, setKey] = useState(false)

  useEffect(() => {
    setEvent(el?.typeOverlay)
  }, [el])

  const changeTypeBackground = (value: string) => {
    const values = html[type]?.map((item: any) => {
      if (item?.id === el?.id) {
        return {
          ...item,
          typeOverlay: value,
        }
      }
      return item
    })
    dispatch(actionSaveHTML({
      ...html,
      [type]: values,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        [type]: values,
      },
    ]))
  }

  const renderEvent = (value: string) => {
    switch (value) {
      case 'color': return <OverlayColor el={el} type={type} />
      default:
        return null
    }
  }

  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            OVERLAY
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <OverlayTypes event={event} setEvent={changeTypeBackground} />
          <div>
            {renderEvent(event)}
          </div>
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}
export default OverlaySettings
