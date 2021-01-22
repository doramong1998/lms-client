import React, { FunctionComponent, useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Event from './Event'
import Link from './Link'
import Call from './Call'
import Mail from './Mail'
import ChangeSection from './ChangeSection'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props { }

const ClickEvent: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)

  const [event, setEvent] = useState('none')

  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)

  useEffect(() => {
    setEvent(selectedElement?.clickEventType)
  }, [selectedElement])
  const changeEvent = (clickEventType: string) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedElement?.id && item?.sectionId === selectedElement?.sectionId) {
        return {
          ...item,
          clickEventType,
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

  const renderEvent = (value:string) => {
    switch (value) {
      case 'openLink': return <Link />
      case 'openCall': return <Call />
      case 'openMail': return <Mail />
      case 'changeSection': return <ChangeSection />
      default:
        return null
    }
  }
  return (
    <Accordion defaultActiveKey="0" className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0">
        Sự kiện nhấp chuột
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <Event event={event} setEvent={changeEvent} />
          <div>
            {renderEvent(event)}
          </div>
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default ClickEvent
