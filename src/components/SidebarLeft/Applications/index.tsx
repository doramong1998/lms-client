import React, { FunctionComponent, useState, useEffect } from 'react'
import {
  Button, Popover, OverlayTrigger,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../..'
import { ApplicationState } from '../../../store'
import { actionSaveTypeElement } from '../../../store/sidebarLeft/actions'

export interface Props { }

const Add: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()

  const [createSection, setCreateSection] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const html = useSelector((state: ApplicationState) => state.builder.html)

  useEffect(() => {
    setCreateSection(html?.sections?.length > 0 ? true : false)
  }, [html])

  const listIcons = [
    {
      name: 'Countdown',
      type: 'countdown',
      action: 'create',
    },
    {
      name: 'Spin Lucky',
      type: 'luckySpin',
      action: 'create',
    },
    {
      name: 'Notify',
      type: 'notify',
      action: 'create',
    },
  ]

  const addElement = (type: string) => {
    dispatch(actionSaveTypeElement(type))
  }

  const renderIcon = (data: any) => {
    switch (data) {
      case 'countdown':
        return <i className="hi-icon icon-time-clock" />
      case 'luckySpin':
        return <i className="hi-icon icon-spin-lucky" />
      case 'notify':
        return <i className="hi-icon icon-notify" />
      default:
        return null
    }
  }

  return (
    <>
      <OverlayTrigger
        trigger="focus"
        placement="right"
        overlay={(
          <Popover id="popover-basic" className="sidebar--left__popover">
            <Popover.Content>
              {listIcons.map((item: any, index: number) => {
                if (item.action === 'create') {
                  return (
                    <div key={index}>
                      <Button
                        variant="outline-primary"
                        className="fontSize--14"
                        onClick={() => (createSection ? addElement(item.type) : setVisibleModal(true))}
                      >
                        {renderIcon(item.type)}
                        {' '}
                        {item.name}
                      </Button>
                    </div>
                  )
                }
                if (item.action === 'openModal') {
                  return (
                    <div key={index}>
                      <Button
                        variant="outline-primary"
                        className="fontSize--14"
                        onClick={() => (setVisibleModal(true))}
                      >
                        {renderIcon(item.type)}
                        {' '}
                        {item.name}
                      </Button>
                    </div>
                  )
                }
                return <div />
              })}
            </Popover.Content>
          </Popover>
        )}
      >
        <Button variant="outline-primary" className="py-2">
          <i className="hi-icon icon-app-store" />
          <br />
          <span>Ứng dụng</span>
        </Button>

      </OverlayTrigger>
      <Modal.Sections visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
    </>
  )
}

export default Add
