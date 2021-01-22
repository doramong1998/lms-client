import React, {
  FunctionComponent, useState, useEffect,
} from 'react'
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ReactSortable } from 'react-sortablejs'
import { Modal } from '../../..'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
    el?: any
  }

const Images: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [images, setImages] = useState<any>([])
  const [visibleImage, setVisibleImage] = useState(false)
  const [visibleImageAdd, setVisibleImageAdd] = useState(false)
  const [idImage, setIdImage] = useState<any>(null)
  useEffect(() => {
    setImages(el?.images)
  }, [el, device])

  const setList = (values:any) => {
    if (values.length > 0) {
      setImages(values)
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === el?.id) {
          return {
            ...item,
            images: values,
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
  }
  const changeImage = (value: any) => {
    setIdImage(value)
    setVisibleImage(true)
  }
  const onRemoveImage = (value: number) => {
    const newValues = [...images]
    newValues.splice(value, 1)
    setImages(newValues)
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === el?.id) {
        return {
          ...item,
          images: newValues,
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
  return (
    <>
      <div className="align-items-center justify-content-between my-2">
        <label>Danh sách ảnh (click đúp để thay đổi ảnh)</label>
        <ReactSortable style={{ width: '360px', flexWrap: 'wrap', display: 'flex' }} list={images} setList={(e) => setList(e)}>
          {images?.map((item: any, index: number) => (
            <div
              key={index}
              style={{
                width: '55px',
                height: '55px',
                position: 'relative',
                marginTop: '5px',
                marginRight: '5px',
              }}
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="delete">Xóa</Tooltip>}
              >
                <i className="hi-icon icon-e-remove close" onClick={() => onRemoveImage(index)} />
              </OverlayTrigger>
              <img
                key={index}
                src={`http://149.28.158.115:3000/media/${item.url}`}
                alt="thumb"
                width={55}
                height={55}
                onDoubleClick={() => changeImage(item)}
              />
            </div>

          ))}
        </ReactSortable>

        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '5px' }}>
          <Button variant="outline-primary" size="sm" onClick={() => setVisibleImageAdd(true)}>Thêm ảnh</Button>
        </div>

      </div>
      {visibleImageAdd && <Modal.Images el={el} visible={visibleImageAdd} setVisible={(value: boolean) => setVisibleImageAdd(value)} />}
      {visibleImage && <Modal.Images el={el} changeImageGallery={idImage} visible={visibleImage} setVisible={(value: boolean) => setVisibleImage(value)} />}
    </>
  )
}

export default Images
