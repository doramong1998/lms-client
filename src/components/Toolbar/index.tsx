/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState, FunctionComponent, useEffect, useCallback,
} from 'react'
import {
  ButtonGroup, Button, OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { css } from 'emotion'
import { useSelector, useDispatch } from 'react-redux'
import './styles.scss'
import $ from 'jquery'
import { ApplicationState } from '../../store'
import {
  iconsToolbarDefault, iconsToolbarCustom, iconsToolbarSettings,
} from '../../utils/iconsToolbar'
import { ColorPicker, Modal } from '..'
import TextAlign from './TextAlign'
import FontSize from './FontSize'
import Delete from './Delete'
import Duplicate from './Duplicate'
import Direction from './Direction'
import Move from './Move'
import Forward from './Forward'
import Backward from './Backward'
import FontStyle from './FontStyle'
import AddField from './AddField'
import SaveData from './SaveData'
import BorderRadius from './BorderRadius'
import Hide from './Hide'
import Lock from './Lock'
import Copy from './Copy'
import Crop from './Crop'
import Settings from '../Settings'
import CancelGroup from './CancelGroup'
import { actionEditCarosel } from '../../store/event/actions'
import { common } from '../../utils'

export interface Props {
  el: any,
  top?: any,
  left?: number
 }

const Toolbar: FunctionComponent<Props> = ({ el, top, left }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const editText = useSelector((state: ApplicationState) => state.builder.editText)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const [visibleSettings, setVisibleSettings] = useState(false)
  const [visibleColor, setVisibleColor] = useState(false)
  const [valueColor, setValueColor] = useState<any>(null)
  const [type, setType] = useState('')
  const [visibleImage, setVisibleImage] = useState(false)
  const [visibleShape, setVisibleShape] = useState(false)
  const [visibleHtml, setVisibleHtml] = useState(false)

  useEffect(() => {
    if (!dragging && html) {
      setType(el.type)
    }
  }, [html, dragging, device])

  const openColorPicker = useCallback((value: string) => {
    setValueColor({ type: value, template: 'elements' })
    setVisibleColor(true)
  }, [])

  const renderIcon = (item: any, index: number) => {
    switch (item.value) {
      case 'color':
        return (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={String(index)}>{item.name}</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => openColorPicker('color')}>
              <i className="hi-icon icon-text-color" />
            </Button>
          </OverlayTrigger>
        )
      case 'background':
        return (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={String(index)}>{item.name}</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => openColorPicker('backgroundColor')}>
              <i className="hi-icon icon-palette" />
            </Button>
          </OverlayTrigger>
        )
      case 'borderColor':
        return (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={String(index)}>{item.name}</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => openColorPicker('borderColor')}>
              <i className="hi-icon icon-palette" />
            </Button>
          </OverlayTrigger>
        )
      case 'direction':
        return <Direction el={el} />
      case 'delete':
        return <Delete el={el} />
      case 'duplicate':
        return <Duplicate el={el} />
      case 'move':
        return <Move />
      case 'forward':
        return <Forward el={el} />
      case 'backward':
        return <Backward el={el} />
      case 'cancelGroup':
        return <CancelGroup el={el} />
      case 'changeImage':
        return (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={String(index)}>{item.name}</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => setVisibleImage(true)}>
              <span className="fontSize--10 p--5 whiteSpace--nowrap">THAY ẢNH</span>
            </Button>
          </OverlayTrigger>
        )
      case 'addImage':
        return (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={String(index)}>{item.name}</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => setVisibleImage(true)}>
              <span className="fontSize--10 p--5 whiteSpace--nowrap">THÊM ẢNH</span>
            </Button>
          </OverlayTrigger>
        )
      case 'changeShape':
        return (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={String(index)}>{item.name}</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => setVisibleShape(true)}>
              <span className="fontSize--10 p--5 whiteSpace--nowrap">THAY SHAPE</span>
            </Button>
          </OverlayTrigger>
        )
      case 'changeHtml':
        return (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={String(index)}>{item.name}</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => setVisibleHtml(true)}>
              <span className="fontSize--10 p--5 whiteSpace--nowrap">SỬA HTML</span>
            </Button>
          </OverlayTrigger>
        )
      case 'copy':
        return <Copy el={el} />
      case 'crop':
        return <Crop />
      case 'editCarosel':
        return (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={String(index)}>Chỉnh sửa</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => dispatch(actionEditCarosel({ value: true, element: el?.id }))}>
              <span className="fontSize--10 p--5 whiteSpace--nowrap">CHỈNH SỬA</span>
            </Button>
          </OverlayTrigger>
        )
      case 'hide':
        return <Hide el={el} />
      case 'lock':
        if (!el?.groupId) {
          return <Lock el={el} />
        }
        return null
      case 'settings':
        return (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={String(index)}>{item.name}</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => setVisibleSettings(!visibleSettings)}>
              <i className="hi-icon icon-settings" />
            </Button>
          </OverlayTrigger>
        )
      case 'addField':
        return <AddField el={el} />
      case 'saveData':
        return <SaveData el={el} />
      default:
        return null
    }
  }

  const calcLeft = () => {
    const widthWindow = window.innerWidth
    const leftCalc = (left ? left : 0) + (widthWindow - (common.CalcWidth(device, html))) / 2
    const center = widthWindow / 2
    if (center > leftCalc) return true
    return false
  }

  const widthElement:any = $(`#${el?.id}`) ? $(`#${el?.id}`).width() : 0
  const widthToolbar:any = $('#toolbarElement') ? $('#toolbarElement').width() : 0
  const heightElement:any = $(`#${el?.id}`) ? $(`#${el?.id}`).height() : 0
  const stylesElement = css`
    top: ${(top > 50 ? (top - 45) : (top + heightElement + 50))}px;
    ${calcLeft()
    ? `left: ${left}px`
    : `left: ${(left ? left : 0) - widthToolbar + widthElement}px`}
  `

  return (
    <>
      <div onClick={(e) => { e.stopPropagation(); e.preventDefault() }}>
        {!editText && (
        <>
          <ButtonGroup size="sm" className={`toolbar ${stylesElement}`} id="toolbarElement">
            {iconsToolbarDefault.map((item: any, index: number) => {
              if (item.type === 'button') {
                return (
                  <div className="toolbar__item" key={index}>
                    {renderIcon(item, index)}
                  </div>
                )
              }
              return null
            })}
            <div className="border-left mx-1" />
            {iconsToolbarCustom[type]?.map((item: any, index: number) => {
              if (item.type === 'popover') {
                if (item.value === 'textAlign') {
                  return <TextAlign data={item} key={index} selectedId={el?.id} />
                }
                if (item.value === 'fontStyle') {
                  return <FontStyle data={item} key={index} selectedId={el?.id} />
                }
              }
              if (item.type === 'input') {
                if (item.value === 'fontSize') {
                  return <FontSize selectedId={el?.id} data={item} key={index} />
                }
                if (item.value === 'borderRadius') {
                  return <BorderRadius selectedId={el?.id} data={item} key={index} />
                }
              }
              if (item.type === 'button') {
                return (
                  <div className="toolbar__item" key={index}>
                    {renderIcon(item, index)}
                  </div>
                )
              }
              return null
            })}
            <div className="border-left mx-1" />
            {iconsToolbarSettings.map((item: any, index: number) => {
              if (item.type === 'button') {
                return (
                  <div className="toolbar__item" key={index}>
                    {renderIcon(item, index)}
                  </div>
                )
              }
              return null
            })}
          </ButtonGroup>
        </>
        )}
      </div>
      {visibleSettings && <Settings onClose={() => setVisibleSettings(false)} el={el} top={top} left={calcLeft() ? left : ((left ? left : 0) - 700)} />}
      {visibleColor && <ColorPicker valueColor={valueColor} top={top} left={calcLeft() ? left : ((left ? left : 0) - 700)} el={el} onClose={() => setVisibleColor(false)} />}
      {visibleImage && <Modal.Images el={el} visible={visibleImage} setVisible={(value: boolean) => setVisibleImage(value)} />}
      {visibleShape && <Modal.Shapes selectedId={el?.id} visible={visibleShape} setVisible={setVisibleShape} />}
      {visibleHtml && <Modal.CodeHtml el={el} visible={visibleHtml} setVisible={setVisibleHtml} />}
    </>
  )
}

export default Toolbar
