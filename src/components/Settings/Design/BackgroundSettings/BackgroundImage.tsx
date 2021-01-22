import React, { FunctionComponent, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../..'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'
import BackgroundPosition from './BackgroundImageSettings/BackgroundPosition'
import BackgroundRepeat from './BackgroundImageSettings/BackgroundRepeat'
import BackgroundSize from './BackgroundImageSettings/BackgroundSize'
import Opacity from './BackgroundImageSettings/Opacity'

export interface Props {
  type: string,
  el: any
}

const BackgroundImage: FunctionComponent<Props> = ({ el, type }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const [visibleImage, setVisibleImage] = useState(false)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const changeUrl = (url: string) => {
    const newValues = html[type]?.map((item: any) => {
      if (item?.id === el?.id) {
        return {
          ...item,
          backgroundImage: url,
        }
      }
      return item
    })
    dispatch(actionSaveHTML({
      ...html,
      [type]: newValues,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        [type]: newValues,
      },
    ]))
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Đường dẫn</label>
        <div className="__collapse__content">
          <input type="text" defaultValue={el?.backgroundImage} onChange={e => changeUrl(e.target.value)} />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Thư viện ảnh</label>
        <div className="__collapse__content">
          <Button className="__title" onClick={() => setVisibleImage(true)}>
            Chọn ảnh
          </Button>
        </div>
      </div>
      <BackgroundSize type={type} el={el} />
      <BackgroundPosition type={type} el={el} />
      <BackgroundRepeat type={type} el={el} />
      <Opacity type={type} el={el} />
      {visibleImage && <Modal.Images el={el} visible={visibleImage} setBackgroundImage={(value: string) => changeUrl(value)} setVisible={(value: boolean) => setVisibleImage(value)} />}
    </>
  )
}

export default BackgroundImage
