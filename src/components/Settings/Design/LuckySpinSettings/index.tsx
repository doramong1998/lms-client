import React, {
  FunctionComponent, useState, useEffect, useRef,
} from 'react'
import { Accordion, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { ApplicationState } from '../../../../store'
import { Modal } from '../../..'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
  el: any
}

const BackgroundSettings: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [listPrize, setListPrize] = useState('')
  const [message, setMessage] = useState('')
  const [background, setBackground] = useState('')
  const [button, setButton] = useState('')
  const [turn, setTurn] = useState(0)
  const [rotateBackground, setBackgroundRotate] = useState(0)
  const [key, setKey] = useState(false)
  const [visibleBackground, setVisibleBackground] = useState(false)
  const [visibleButton, setVisibleButton] = useState(false)

  const debounceChange = useRef(_.debounce((key, value) => { changeData(key, value) }, 300)).current

  useEffect(() => {
    setListPrize(el?.listPrize)
    setMessage(el?.message)
    setTurn(el?.turn)
    setBackgroundRotate(el?.rotateBackground || 0)
    setBackground(el?.background)
    setButton(el?.button)
  }, [el])

  const changeData = (key:string, value: any) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === el?.id) {
        return {
          ...item,
          [key]: value,
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
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            THIẾT LẬP LUCKY SPIN
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <div className="align-items-center justify-content-between my-2">
            <label>
              Danh sách kết quả (Mã Coupon|Chữ|%):
            </label>
            <div className="__collapse__textarea" style={{ width: '100%' }}>
              <textarea rows={5} value={listPrize} onChange={e => { setListPrize(e.target.value); debounceChange('listPrize', e.target.value) }} />
            </div>
          </div>
          <div className="align-items-center justify-content-between my-2">
            <label>
              Định dạng mẫu
              <br />
              Tên mã coupon:
              {'{{ coupon_text }}'}
              <br />
              Mã coupon:
              {'{{ coupon_code }}'}
              <br />
              Số lượt quay còn lại:
              {'{{ spin_turn_left }}'}
              <br />
              Lời nhắn:
            </label>
            <div className="__collapse__textarea" style={{ width: '100%' }}>
              <textarea rows={5} value={message} onChange={e => { setMessage(e.target.value); debounceChange('message', e.target.value) }} />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Số lượt quay tối đa</label>
            <div className="__collapse__content">
              <input type="number" value={turn} onChange={e => changeData('turn', parseInt(e.target.value, 10))} />
            </div>
          </div>
          <>
            <div className="d-flex align-items-center justify-content-between my-2">
              <label>Hình nền</label>
              <div className="__collapse__content">
                <input type="text" value={background} onChange={e => changeData('background', e.target.value)} />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between my-2">
              <label>Thư viện ảnh</label>
              <div className="__collapse__content">
                <Button className="__title" onClick={() => setVisibleBackground(true)}>
                  Chọn ảnh
                </Button>
              </div>
            </div>
          </>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Xoay hình nền</label>
            <div className="__collapse__content">
              <input type="number" value={rotateBackground} onChange={e => changeData('rotateBackground', parseInt(e.target.value, 10))} />
            </div>
          </div>
          <>
            <div className="d-flex align-items-center justify-content-between my-2">
              <label>Nút bắt đầu</label>
              <div className="__collapse__content">
                <input type="text" value={button} onChange={e => changeData('button', e.target.value)} />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between my-2">
              <label>Thư viện ảnh</label>
              <div className="__collapse__content">
                <Button className="__title" onClick={() => setVisibleButton(true)}>
                  Chọn ảnh
                </Button>
              </div>
            </div>
            {visibleBackground && <Modal.Images el={el} visible={visibleBackground} setBackgroundImage={(value: string) => changeData('background', value)} setVisible={(value: boolean) => setVisibleBackground(value)} />}
            {visibleButton && <Modal.Images el={el} visible={visibleButton} setBackgroundImage={(value: string) => changeData('button', value)} setVisible={(value: boolean) => setVisibleButton(value)} />}
          </>
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}
export default BackgroundSettings
