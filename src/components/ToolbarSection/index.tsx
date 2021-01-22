import React, {
  useState, FunctionComponent, useEffect, memo,
} from 'react'
import {
  ButtonGroup, Button, OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { css } from 'emotion'
import { useSelector, useDispatch } from 'react-redux'
import './styles.scss'
import uid from 'uid'
import { ApplicationState } from '../../store'
import {
  iconsToolbarSection,
} from '../../utils/iconsToolbar'
import Settings from '../Settings'
import Delete from './Delete'
import Save from './Save'
import Hide from './Hide'
import Up from './Up'
import Down from './Down'
import Duplicate from './Duplicate'
import { common } from '../../utils'

export interface Props { }

const Toolbar: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedSection = useSelector((state: ApplicationState) => state.builder.selectedSection)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const [top, setTop] = useState(0)
  const [visibleToolbar, setVisibleToolbar] = useState(false)
  const [visibleSettings, setVisibleSettings] = useState(false)

  const selectedItem = selectedSection ? html?.sections?.find((item: any) => item?.id === selectedSection.sectionId) : null

  useEffect(() => {
    if (html && selectedSection && selectedSection?.visible) {
      let height = 0
      for (const item of html?.sections) {
        if (item?.id === selectedSection?.sectionId) {
          setTop(height + (parseInt(item[device]?.height, 10) / 2) - 120)
          setVisibleToolbar(true)
        } else height += parseInt(item[device]?.height, 10)
      }
    } else setVisibleToolbar(false)
  }, [html, selectedSection, device])

  useEffect(() => {
    if (!visibleToolbar) {
      setVisibleSettings(false)
    }
  }, [visibleToolbar, dispatch])

  const renderIcon = (data: any) => {
    switch (data.value) {
      case 'settings':
        return (
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip id={uid(10)}>Thiết lập</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => setVisibleSettings(!visibleSettings)}>
              <i className="hi-icon icon-settings" />
            </Button>
          </OverlayTrigger>
        )
      case 'save':
        return <Save selectedSection={selectedSection} />
      case 'up':
        return <Up selectedSection={selectedSection} />
      case 'down':
        return <Down selectedSection={selectedSection} />
      case 'hide':
        return <Hide selectedSection={selectedSection} />
      case 'duplicate':
        return <Duplicate selectedSection={selectedSection} />
      case 'delete':
        return <Delete selectedSection={selectedSection} />
      default:
        return <div />
    }
  }

  const stylesElement = css`
    top: calc(${top}px);
    right: calc((100% - ${common.CalcWidth(device, html)}px) / 2 - 40px);
  `

  return (
    <>
      {visibleToolbar && selectedId === '' && (
        <>
          <ButtonGroup size="sm" className={`toolbarSection ${visibleToolbar ? stylesElement : ''}`}>
            {iconsToolbarSection.map((item: any, index: number) => {
              if (item.type === 'button') {
                return (
                  <div className="toolbar__item" key={index}>
                    {renderIcon(item)}
                  </div>
                )
              }
              return null
            })}
          </ButtonGroup>
          {visibleSettings && selectedItem && (
            <Settings
              onClose={() => {
                setVisibleSettings(false)
              }}
              top={top}
              left={700}
              el={selectedItem}
            />
          )}
        </>
      )}
    </>
  )
}

export default memo(Toolbar)
