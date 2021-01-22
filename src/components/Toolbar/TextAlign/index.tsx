import React, {
  FunctionComponent, memo, useCallback, useEffect, useState,
} from 'react'
import {
  ButtonGroup, Button, Popover, OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import '../styles.scss'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  selectedId: string
  data: any
}

const TextAlign: FunctionComponent<Props> = ({ selectedId, data }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const [textAlign, setTextAlign] = useState('center')

  useEffect(() => {
    for (const item of html?.elements) {
      if (item?.id === selectedId) {
        setTextAlign(item[device]?.textAlign)
      }
    }
  }, [html, selectedId, device])

  const onChangeTextAlign = useCallback((value: any) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          [device]: {
            ...item[device],
            textAlign: value,
          },
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
  }, [dispatch, html, device, selectedId, history])

  const renderIcon = () => {
    if (textAlign === 'center') {
      return <i className="hi-icon icon-align-center" />
    }
    if (textAlign === 'left') {
      return <i className="hi-icon icon-align-left-2" />
    }
    if (textAlign === 'right') {
      return <i className="hi-icon icon-align-right-2" />
    }
    if (textAlign === 'justify') {
      return <i className="hi-icon icon-align-justify" />
    }
    return null
  }

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
                onClick={() => onChangeTextAlign('left')}
                active={textAlign === 'left'}
              >
                <i className="hi-icon icon-align-left-2" />
                {' '}
                Căn trái
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => onChangeTextAlign('right')}
                active={textAlign === 'right'}
              >
                <i className="hi-icon icon-align-right-2" />
                {' '}
                Căn phải
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => onChangeTextAlign('center')}
                active={textAlign === 'center'}
              >
                <i className="hi-icon icon-align-center" />
                {' '}
                Căn giữa
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => onChangeTextAlign('justify')}
                active={textAlign === 'justify'}
              >
                <i className="hi-icon icon-align-justify" />
                {' '}
                Căn đều 2 bên
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
            {renderIcon()}
          </Button>
        </OverlayTrigger>
      </div>
    </OverlayTrigger>
  )
}

export default memo(TextAlign)
