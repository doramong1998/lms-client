import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import Draggable from 'react-draggable'
import { Tab, Tabs } from 'react-bootstrap'
import { ApplicationState } from '../../store'
import { listSetting } from '../../utils/listEvent'
import './styles.scss'
import Design from './Design'
import Event from './Event'

export interface Props {
  onClose: () => void,
  top?: number,
  left?: number,
  el?:any,
}

const Settings: FunctionComponent<Props> = ({
  onClose, top, el, left,
}) => {
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)

  const renderSettings = (value: string) => {
    switch (value) {
      case 'image': return (
        <>
          <Design.SizeSettings type="elements" el={el} />
          <Design.BoxShadowSettings type="elements" el={el} />
          <Design.BorderRadius type="elements" el={el} />
          <Design.TransformSettings type="elements" el={el} />
          <Design.OverlaySettings type="elements" el={el} />
          <Design.FilterSettings type="elements" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'button': return (
        <>
          <Design.TextSettings el={el} />
          <Design.SizeSettings type="elements" el={el} />
          <Design.BackgroundSettings type="elements" el={el} />
          <Design.BoxShadowSettings type="elements" el={el} />
          <Design.BorderRadius type="elements" el={el} />
          <Design.TransformSettings type="elements" el={el} />
          <Design.OverlaySettings type="elements" el={el} />
          <Design.FilterSettings type="elements" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'box': return (
        <>
          <Design.SizeSettings type="elements" el={el} />
          <Design.BackgroundSettings type="elements" el={el} />
          <Design.BoxShadowSettings type="elements" el={el} />
          <Design.BorderRadius type="elements" el={el} />
          <Design.TransformSettings type="elements" el={el} />
          <Design.OverlaySettings type="elements" el={el} />
          <Design.FilterSettings type="elements" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'line': return (
        <>
          <Design.SizeSettings type="elements" el={el} />
          <Design.TransformSettings type="elements" el={el} />
          <Design.FilterSettings type="elements" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'codeHtml': return (
        <>
          <Design.SizeSettings type="elements" el={el} />
          <Design.TransformSettings type="elements" el={el} />
          <Design.FilterSettings type="elements" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'shape': return (
        <>
          <Design.ShapeSettings el={el} />
          <Design.SizeSettings type="elements" el={el} />
          <Design.TransformSettings type="elements" el={el} />
          <Design.FilterSettings type="elements" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'section': return (
        <>
          <Design.HeightSettings />
          <Design.BackgroundSettings type="sections" el={el} />
          <Design.OverlaySettings type="sections" el={el} />
          <Design.FilterSettings type="sections" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'video': return (
        <>
          <Design.VideoSettings />
          <Design.SizeSettings type="elements" el={el} />
          <Design.BoxShadowSettings type="elements" el={el} />
          <Design.TransformSettings type="elements" el={el} />
          <Design.FilterSettings type="elements" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'form': return (
        <>
          <Design.TextSettings el={el} />
          <Design.SizeSettings type="elements" el={el} />
          <Design.BackgroundSettings type="elements" el={el} />
          <Design.BoxShadowSettings type="elements" el={el} />
          <Design.BorderRadius type="elements" el={el} />
          <Design.TransformSettings type="elements" el={el} />
          <Design.FilterSettings type="elements" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'carosel': return (
        <>
          <Design.CaroselSettings type="elements" el={el} />
          <Design.SizeSettings type="elements" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'gallery': return (
        <>
          <Design.GallerySettings type="elements" el={el} />
          <Design.SizeSettings type="elements" el={el} />
          <Design.TransformSettings type="elements" el={el} />
          <Design.FilterSettings type="elements" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'buttonForm': return (
        <>
          <Design.SizeSettings type="formItem" el={el} />
          <Design.BackgroundSettings type="formItem" el={el} />
          <Design.BoxShadowSettings type="formItem" el={el} />
          <Design.BorderRadius type="formItem" el={el} />
          <Design.TransformSettings type="formItem" el={el} />
          <Design.OverlaySettings type="formItem" el={el} />
          <Design.FilterSettings type="formItem" el={el} />
          <Design.EnhanceSettings type="formItem" el={el} />
        </>
      )
      case 'countdown': return (
        <>
          <Design.CountdownSettings el={el} />
          <Design.TextSettings el={el} />
          <Design.SizeSettings type="elements" el={el} />
          <Design.BackgroundSettings type="elements" el={el} />
          <Design.BoxShadowSettings type="elements" el={el} />
          <Design.BorderRadius type="elements" el={el} />
          <Design.TransformSettings type="elements" el={el} />
          <Design.OverlaySettings type="elements" el={el} />
          <Design.FilterSettings type="elements" el={el} />
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'luckySpin': return (
        <>
          <Design.LuckySpinSettings el={el} />
          <Design.TextSettings el={el} />
        </>
      )
      case 'group': return (
        <>
          <Design.EnhanceSettings type="elements" el={el} />
        </>
      )
      case 'paragraph':
      case 'heading':
      case 'list':
        return (
          <>
            <Design.TextSettings el={el} />
            <Design.SizeSettings type="elements" el={el} />
            <Design.TransformSettings type="elements" el={el} />
            <Design.FilterSettings type="elements" el={el} />
            <Design.EnhanceSettings type="elements" el={el} />
          </>
        )

      case 'textArea':
      case 'number':
      case 'email':
      case 'checkbox':
      case 'radio':
      case 'select':
      case 'selectAddress':
      case 'text': return (
        <>
          <Design.FormSettings el={el} />
          <Design.SizeSettings type="formItem" el={el} />
          <Design.TransformSettings type="formItem" el={el} />
          <Design.FilterSettings type="formItem" el={el} />
          <Design.EnhanceSettings type="formItem" el={el} />
        </>
      )
      default:
        return null
    }
  }

  const renderEvent = (value: string) => {
    switch (value) {
      case 'button':
      case 'box':
      case 'heading':
      case 'paragraph':
      case 'image': return <Event.ClickEvent />
      default:
        return null
    }
  }

  return (
    <>
      {!dragging && (
        <Draggable
          defaultPosition={{ x: el?.hasOwnProperty('formId') ? 150 : (left ? left + 300 : 0), y: top ? top : 50 }}
          handle=".settings__handle"
        >
          <div className="settings">
            <div className="settings__handle">
              <i className="hi-icon icon-dots" />
              <i className="hi-icon icon-e-remove" style={{ right: 0, cursor: 'pointer', position: 'absolute' }} onClick={onClose} />
            </div>
            <div className="settings__layout">
              <Tabs defaultActiveKey="design" id="uncontrolled-tab-example">
                {el && listSetting[el?.type]?.map((item:any, index:number) => (
                  <Tab eventKey={item.value} title={item.name} key={index}>
                    {item.value === 'design' && renderSettings(el?.type)}
                    {item.value === 'event' && renderEvent(el?.type)}
                    {item.value === 'animation' && <div>Hiệu ứng</div>}
                    {item.value === 'advanced' && <div>Nâng cao</div>}
                  </Tab>
                ))}
              </Tabs>
            </div>
          </div>
        </Draggable>
      )}
    </>
  )
}

export default Settings
