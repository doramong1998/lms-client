import React, {
  FunctionComponent, useEffect, useState,
} from 'react'
import {
  Button, Modal,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import AceEditor from 'react-ace'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  el?: any
  visible: boolean
  setVisible: (value: boolean) => void
}

const CodeHtml: FunctionComponent<Props> = ({ el, visible, setVisible }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [code, setCode] = useState('')

  useEffect(() => {
    setCode(el?.code || '')
  }, [el])

  const onSave = () => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === el?.id) {
        return {
          ...item,
          code,
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
  }

  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          Chỉnh sửa HTML
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AceEditor
          placeholder="Nhập mã ..."
          mode="html"
          theme="tomorrow"
          fontSize={14}
          showPrintMargin
          showGutter
          highlightActiveLine
          value={code}
          width="100%"
          height="200px"
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          onChange={(val: any) => setCode(val)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => setVisible(false)}>Đóng</Button>
        <Button variant="primary" onClick={onSave}>Lưu</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CodeHtml
