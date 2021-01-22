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
  const [visibleImage, setVisibleImage] = useState(false)
  const [visibleShape, setVisibleShape] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const html = useSelector((state: ApplicationState) => state.builder.html)

  useEffect(() => {
    setCreateSection(html?.sections?.length > 0 ? true : false)
  }, [html])

  const listIcons = [
    {
      name: 'Nút bấm',
      type: 'button',
      action: 'create',
    },
    {
      name: 'Tiêu đề',
      type: 'heading',
      action: 'create',
    },
    {
      name: 'Đường kẻ',
      type: 'line',
      action: 'create',
    },
    {
      name: 'Đoạn văn',
      type: 'paragraph',
      action: 'create',
    },
    {
      name: 'Danh sách',
      type: 'list',
      action: 'create',
    },
    {
      name: 'Hình ảnh',
      type: 'image',
      action: 'openModal',
    },
    {
      name: 'Video',
      type: 'video',
      action: 'create',
    },
    {
      name: 'Form',
      type: 'form',
      action: 'create',
    },
    {
      name: 'Shape',
      type: 'shape',
      action: 'openModal',
    },
    {
      name: 'Box',
      type: 'box',
      action: 'create',
    },
    {
      name: 'Mã HTML',
      type: 'codeHtml',
      action: 'create',
    },
    {
      name: 'Carosel',
      type: 'carosel',
      action: 'create',
    },
    {
      name: 'Gallery',
      type: 'gallery',
      action: 'create',
    },
  ]

  const addElement = (type: string) => {
    dispatch(actionSaveTypeElement(type))
  }

  const renderIcon = (data: any) => {
    switch (data) {
      case 'button':
        return <i className="hi-icon icon-button" />
      case 'heading':
        return <i className="hi-icon icon-text" />
      case 'line':
        return <i className="hi-icon icon-shape-line" />
      case 'paragraph':
        return <i className="hi-icon icon-paragraph" />
      case 'list':
        return <i className="hi-icon icon-list-bullet" />
      case 'image':
        return <i className="hi-icon icon-img" />
      case 'video':
        return <i className="hi-icon icon-video-player" />
      case 'form':
        return <i className="hi-icon icon-form" />
      case 'shape':
        return <i className="hi-icon icon-shape-star" />
      case 'box':
        return <i className="hi-icon icon-shape-rectangle" />
      case 'codeHtml':
        return <i className="hi-icon icon-html" />
      case 'carosel':
        return <i className="hi-icon icon-slider" />
      case 'gallery':
        return <i className="hi-icon icon-gallery" />
      default:
        return null
    }
  }

  const openModal = (item: any) => {
    switch (item?.type) {
      case 'image':
        setVisibleImage(true)
        break
      case 'shape':
        setVisibleShape(true)
        break
      default:
        break
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
                        onClick={() => (createSection ? openModal(item) : setVisibleModal(true))}
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
          <i className="hi-icon icon-c-add" />
          <br />
          <span>Thêm mới</span>
        </Button>

      </OverlayTrigger>
      <Modal.Sections visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
      {visibleImage && <Modal.Images el={null} visible={visibleImage} setVisible={(value: boolean) => setVisibleImage(value)} />}
      {visibleShape && <Modal.Shapes visible={visibleShape} setVisible={(value: boolean) => setVisibleShape(value)} />}
    </>
  )
}

export default Add
