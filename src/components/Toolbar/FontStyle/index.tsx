import React, {
  FunctionComponent, useState, useEffect, useCallback, memo,
} from 'react'
import {
  ButtonGroup, Button, Popover, OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import '../styles.scss'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  selectedId: string,
  data: any
}

const FontStyle: FunctionComponent<Props> = ({ selectedId, data }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const [fontStyle, setFontStyle] = useState({
    fontStyle: 'none',
    fontWeight: 'none',
    textDecorationLine: 'none',
    textTransform: 'none',
  })

  useEffect(() => {
    for (const item of html?.elements) {
      if (item?.id === selectedId) {
        setFontStyle({
          fontStyle: item.fontStyle,
          fontWeight: item.fontWeight,
          textDecorationLine: item.textDecorationLine,
          textTransform: item.textTransform,
        })
      }
    }
  }, [html, selectedId, device])

  const onChangeElement = useCallback((value: any) => {
    const fontStyleChange = { ...fontStyle }
    switch (value) {
      case 'bold': {
        if (fontStyle.fontWeight !== 'bold') {
          fontStyleChange.fontWeight = 'bold'
        } else fontStyleChange.fontWeight = 'normal'
        break
      }
      case 'italic': {
        if (fontStyle.fontStyle !== 'italic') {
          fontStyleChange.fontStyle = 'italic'
        } else fontStyleChange.fontStyle = 'normal'
        break
      }
      case 'underline': {
        if (fontStyle.textDecorationLine !== 'underline') {
          fontStyleChange.textDecorationLine = 'underline'
        } else fontStyleChange.textDecorationLine = 'none'
        break
      }
      case 'strikethrough': {
        if (fontStyle.textDecorationLine !== 'line-through') {
          fontStyleChange.textDecorationLine = 'line-through'
        } else fontStyleChange.textDecorationLine = 'none'
        break
      }
      case 'capsAll': {
        if (fontStyle.textTransform !== 'uppercase') {
          fontStyleChange.textTransform = 'uppercase'
        } else fontStyleChange.textTransform = 'none'
        break
      }
      default: break
    }
    setFontStyle(fontStyleChange)
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          fontStyle: fontStyleChange.fontStyle,
          fontWeight: fontStyleChange.fontWeight,
          textDecorationLine: fontStyleChange.textDecorationLine,
          textTransform: fontStyleChange.textTransform,
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
  }, [dispatch, html, fontStyle, selectedId, history])

  return (
    <OverlayTrigger
      trigger="focus"
      placement="bottom"
      key={data.value}
      overlay={(
        <Popover id="popover-basic" className="toolbar__popover">
          <Popover.Content>
            <ButtonGroup vertical size="sm">
              <Button
                variant="outline-primary"
                onClick={() => onChangeElement('bold')}
                active={fontStyle.fontWeight === 'bold'}
              >
                <i className="hi-icon icon-bold" />
                {' '}
                In đậm
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => onChangeElement('italic')}
                active={fontStyle.fontStyle === 'italic'}
              >
                <i className="hi-icon icon-italic" />
                {' '}
                In nghiêng
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => onChangeElement('underline')}
                active={fontStyle.textDecorationLine === 'underline'}
              >
                <i className="hi-icon icon-underline" />
                {' '}
                Gạch chân
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => onChangeElement('strikethrough')}
                active={fontStyle.textDecorationLine === 'line-through'}
              >
                <i className="hi-icon icon-strikethrough" />
                {' '}
                Gạch ngang
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => onChangeElement('capsAll')}
                active={fontStyle.textTransform === 'uppercase'}
              >
                <i className="hi-icon icon-caps-all" />
                {' '}
                In hoa
              </Button>
            </ButtonGroup>
          </Popover.Content>
        </Popover>
      )}
    >
      <div className="toolbar__item">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={data.value}>{data.name}</Tooltip>}
        >
          <Button variant="outline-primary">
            <i className="hi-icon icon-bold" />
          </Button>
        </OverlayTrigger>
      </div>
    </OverlayTrigger>
  )
}

export default memo(FontStyle)
