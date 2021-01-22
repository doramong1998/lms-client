/* eslint-disable no-unused-expressions */
import React, {
  FunctionComponent, useEffect, useState, useRef,
} from 'react'
import {
  Row, Col, ListGroup, Tabs, Card, Button, Modal, Tab, OverlayTrigger, Popover, ButtonGroup,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import _ from 'lodash'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML, actionSelectId } from '../../../store/builder/actions'
import { actionUploadImage, actionGetImages, actionUploadImageUrl } from '../../../store/api/actions'
import { templates } from '../../../utils'

export interface Props {
  visible: boolean
  setVisible: (value: boolean) => void
  el?: any
  setBackgroundImage?: (value: string) => void
  changeImageGallery?: any
}

const Images: FunctionComponent<Props> = ({
  visible, setVisible, el, setBackgroundImage, changeImageGallery,
}) => {
  const dispatch = useDispatch()
  const inputFileRef = useRef<any>(null)

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const getImages = useSelector((state: ApplicationState) => state.api.getImages)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [activeKey, setActiveKey] = useState('all')
  const [listImage, setListImage] = useState<any>([])
  const [visibleLink, setVisibleLink] = useState(false)
  const [link, setLink] = useState<any>('')
  const selectedImage = listImage?.find((item: any) => item?.selected === true)
  useEffect(() => {
    dispatch(actionGetImages())
  }, [dispatch])
  useEffect(() => {
    setListImage(getImages?.data)
  }, [dispatch, getImages])
  const listSection = [
    {
      name: 'Tất cả',
      id: 'all',
      total: '10',
    },
  ]

  const onAddImage = (value: number) => {
    const listNew = [...listImage]
    if (listNew?.length > 0) {
      if (!el) {
        listNew[value].selected = !listImage[value].selected
      } else {
        for (const item of listNew) {
          item.selected = false
        }
        listNew[value].selected = true
      }
      setListImage(listNew)
    }
  }

  const onFilechange = (e: any) => {
    if (e.target.files) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      dispatch(actionUploadImage(formData))
    }
  }
  const onBtnClick = () => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef?.current.click()
    }
  }

  const onSelectImage = () => {
    if (setBackgroundImage) {
      setBackgroundImage(`http://149.28.158.115:3000/media/${selectedImage._id}`)
    }
    if (!setBackgroundImage) {
      if (el) {
        let elements = []
        if (el.type === 'gallery') {
          if (changeImageGallery) {
            elements = html?.elements?.map((item: any) => {
              if (item?.id === el?.id) {
                const newImage = [...item.images]
                let id = -1
                for (const element in newImage) {
                  if (newImage[element].id === changeImageGallery.id) {
                    id = parseInt(element, 10)
                  }
                }
                if (id !== -1) {
                  changeImageGallery.url = selectedImage._id
                  newImage.splice(id, 1, changeImageGallery)
                }
                return {
                  ...item,
                  images: newImage,
                }
              }
              return item
            })
          } else {
            elements = html?.elements?.map((item: any) => {
              if (item?.id === el?.id) {
                return {
                  ...item,
                  images: [...item.images, { id: item.images.length, url: selectedImage._id }],
                }
              }
              return item
            })
          }
        } else {
          elements = html?.elements?.map((item: any) => {
            if (item?.id === el?.id) {
              return {
                ...item,
                background: selectedImage._id,
                url: selectedImage._id,
              }
            }
            return item
          })
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
      } else {
        let sectionId = ''
        let height = 0
        for (const item of html?.sections) {
          const scrollY = window.scrollY + (window.innerHeight / 2)
          if (height < scrollY && scrollY < item[device]?.height + height) {
            height += item[device]?.height
            sectionId = item.id
          }
          height += item[device]?.height
        }
        let maxIndex = 0
        for (const item of html?.elements) {
          if (item.zIndex > maxIndex) {
            maxIndex = item.zIndex
          }
        }
        const newElements = [...html?.elements]
        for (const item of listImage) {
          if (item.selected) {
            newElements.push({
              ...templates.image,
              id: `id--${`id--${uid(32)}`}`,
              sectionId,
              transform: {
                opacity: 100,
                rotate: 0,
                rotateX: 0,
                rotateY: 0,
                skewX: 0,
                skewY: 0,
                perspective: 1000,
              },
              crop: {
                top: 0,
                left: 0,
                width: 320,
                height: 320,
              },
              clickEventType: 'none',
              url: item._id,
              background: item._id,
              zIndex: maxIndex + 1,
              desktop: {
                top: 320,
                left: 320,
                width: 320,
                height: 320,
              },
              mobile: {
                top: 450,
                left: 450,
                width: 320,
                height: 320,
              },
            })
          }
        }
        dispatch(actionSaveHTML({
          ...html,
          elements: newElements,
        }))
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            elements: newElements,
          },
        ]))
        dispatch(actionSelectId(''))
      }
    }

    setVisible(false)
  }

  const onSendImage = () => {
    dispatch(actionUploadImageUrl({ url: link }))
    setLink('')
    setVisibleLink(false)
  }
  return (
    <>
      <Modal show={visible} onHide={() => setVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            THƯ VIỆN HÌNH ẢNH
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="customSection" id="section-modal">
            <Tab eventKey="customSection" title="Thư viện hình ảnh">
              <Tab.Container id="tab-default-section" activeKey={activeKey}>
                <Row>
                  <Col sm={3}>
                    <ListGroup>
                      {listSection.map((item: any, index: number) => (
                        <ListGroup.Item eventKey={item.id} key={index} onClick={() => setActiveKey(item.id)}>
                          {item.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="all">
                        <div className="section--templates">
                          <div className="row" style={{ overflow: 'auto', height: '60vh' }}>
                            {listImage && listImage.map((item: any, index: number) => (
                              <div className="col-4" key={index} style={{ paddingBottom: '15px', paddingTop: '15px' }}>
                                <Card onClick={() => onAddImage(index)} style={{ overflow: 'hidden' }}>
                                  {item.selected && <div className="section--templates__overlay-icon"><i className="hi-icon icon-d-check" /></div>}
                                  <Card.Img variant="top" className="image" src={`http://149.28.158.115:3000/media/${item._id}`} />
                                  <div className="section--templates__overlay section--templates__cursor" />
                                </Card>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <div className="__collapse__content" style={{ position: 'absolute', left: 0 }}>
            <OverlayTrigger
              trigger="focus"
              placement="top"
              overlay={(
                <Popover id="popover-basic" className="settings__popover">
                  <Popover.Content>
                    <ButtonGroup vertical size="sm">
                      <Button
                        variant="outline-primary"
                        onClick={onBtnClick}
                      >
                        <i
                          className="hi-icon icon-data-upload"
                        />
                        &nbsp; Chọn tệp
                      </Button>
                      <Button
                        variant="outline-primary"
                        onClick={() => setVisibleLink(true)}
                      >
                        <i
                          className="hi-icon icon-hyperlink"
                        />
                        &nbsp;
                        Đường dẫn
                      </Button>
                    </ButtonGroup>
                  </Popover.Content>
                </Popover>
                )}
            >
              <Button variant="primary">
                <i className="hi-icon icon-data-upload" />
                &nbsp;
                Tải ảnh
              </Button>
            </OverlayTrigger>
          </div>

          <input
            type="file"
            style={{ display: 'none' }}
            ref={inputFileRef}
            accept="image/png, image/jpeg"
            onChange={onFilechange}
          />
          <Button variant="outline-secondary" onClick={() => setVisible(false)}>Đóng</Button>
          <Button variant="primary" disabled={(listImage && _.some(listImage, { selected: true })) ? false : true} onClick={onSelectImage}>Sử dụng</Button>
        </Modal.Footer>

      </Modal>
      {visibleLink && (
      <Modal show={visibleLink} onHide={() => setVisibleLink(false)} className="modal-custom-400">
        <Modal.Header closeButton>
          <Modal.Title>
            Đường dẫn ảnh
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="settings__item">
          <div className="__collapse ">
            <div className="__collapse__content">
              <input value={link} placeholder="Nhập đường dẫn ảnh" onChange={e => setLink(e.target.value)} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setVisibleLink(false)}>Đóng</Button>
          <Button variant="primary" onClick={onSendImage}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
      )}
    </>
  )
}

export default Images
