import React, {
  FunctionComponent, useState, useEffect, useCallback, memo,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Modal, Button,
} from 'react-bootstrap'
import '../styles.scss'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  el: any
}

const SaveData: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [visible, setVisible] = useState(false)
  const [url, setUrl] = useState('')

  useEffect(() => {
    const selectedElement = html?.elements?.find((item: any) => item?.id === el?.id)
    setUrl(selectedElement?.url)
  }, [dispatch, html, el])

  const onSave = useCallback((url: string) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === el?.id) {
        return {
          ...item,
          url,
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
    setVisible(false)
  }, [dispatch, html, el, history])
  return (
    <>
      <Button variant="outline-primary" className="border-0" onClick={() => setVisible(true)}>
        <span className="fontSize--10 p--5 whiteSpace--nowrap">
          LƯU DATA
        </span>
      </Button>
      <Modal show={visible} onHide={() => setVisible(false)} className="modal-custom-400">
        <Modal.Header closeButton>
          <Modal.Title>LƯU DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body className="settings__item">
          <div className="__collapse ">
            <div className="__collapse__content">
              <input type="text" defaultValue={url} onChange={e => setUrl(e.target.value)} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setVisible(false)}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={() => onSave(url)}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default memo(SaveData)
