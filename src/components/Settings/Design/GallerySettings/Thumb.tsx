import React, {
  FunctionComponent, useState, useEffect,
} from 'react'
import {
  OverlayTrigger, Popover, ButtonGroup, Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
    el?: any
  }
const placement = [
  {
    key: 'top',
    value: 'Trên cùng',
  },
  {
    key: 'left',
    value: 'Bên trái',
  },
  {
    key: 'right',
    value: 'Bên phải',
  },
  {
    key: 'bottom',
    value: 'Dưới cùng',
  }]
const Thumb: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [showThumb, setShowThumb] = useState(0)
  const [position, setPosition] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [marginGallery, setMarginGallery] = useState(0)
  const [marginThumb, setMarginThumb] = useState(0)

  useEffect(() => {
    setShowThumb(el?.thumb?.show)
    setPosition(el?.thumb?.position)
    setWidth(el?.thumb?.width)
    setHeight(el?.thumb?.height)
    setMarginGallery(el?.thumb?.marginGallery)
    setMarginThumb(el?.thumb?.marginThumb)
  }, [el, device])

  const onChangeValue = (key: string, value: any) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === el?.id) {
        return {
          ...item,
          thumb: {
            ...item?.thumb,
            [key]: value,
          },
        }
      }
      return item
    })
    if (key === 'show') {
      setShowThumb(value)
    } else if (key === 'position') {
      setPosition(value)
    }
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

  return (
    <>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Hiện ảnh Thumb</label>
        <div className="__collapse__content">
          <OverlayTrigger
            trigger="focus"
            placement="bottom"
            overlay={(
              <Popover id="popover-basic" className="settings__popover">
                <Popover.Content>
                  <ButtonGroup vertical size="sm">
                    <Button
                      variant="outline-primary"
                      onClick={() => onChangeValue('show', true)}
                    >
                      Có
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => onChangeValue('show', false)}
                    >
                      Không
                    </Button>
                  </ButtonGroup>
                </Popover.Content>
              </Popover>
            )}
          >
            <Button className="__title">
              {showThumb ? 'Có' : 'Không'}
            </Button>
          </OverlayTrigger>
        </div>
      </div>
      {showThumb && (
        <>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Vị trí Thumb</label>
            <div className="__collapse__content">
              <OverlayTrigger
                trigger="focus"
                placement="bottom"
                overlay={(
                  <Popover id="popover-basic" className="settings__popover">
                    <Popover.Content>
                      <ButtonGroup vertical size="sm">
                        {placement?.map((item:any, index: number) => (
                          <Button
                            key={index}
                            variant="outline-primary"
                            onClick={() => onChangeValue('position', item.key)}
                          >
                            {item.value}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </Popover.Content>
                  </Popover>
            )}
              >
                <Button className="__title">
                  {placement.find((item: any) => item?.key === position)?.value}
                </Button>
              </OverlayTrigger>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Chiều rộng Thumb</label>
            <div className="__collapse__content">
              <input type="number" value={width} onChange={e => onChangeValue('width', e.target.value)} />
              <label style={{ marginRight: '10px', color: '#636e72' }}>px</label>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Chiều cao Thumb</label>
            <div className="__collapse__content">
              <input type="number" value={height} onChange={e => onChangeValue('height', e.target.value)} />
              <label style={{ marginRight: '10px', color: '#636e72' }}>px</label>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>K/cách với Gallery</label>
            <div className="__collapse__content">
              <input type="number" value={marginGallery} onChange={e => onChangeValue('marginGallery', e.target.value)} />
              <label style={{ marginRight: '10px', color: '#636e72' }}>px</label>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>K/cách với Thumb</label>
            <div className="__collapse__content">
              <input type="number" value={marginThumb} onChange={e => onChangeValue('marginThumb', e.target.value)} />
              <label style={{ marginRight: '10px', color: '#636e72' }}>px</label>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Thumb
