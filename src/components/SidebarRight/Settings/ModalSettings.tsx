import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  Button, Modal, Tabs, Tab, Form,
} from 'react-bootstrap'
import AceEditor from 'react-ace'
import { useDispatch, useSelector } from 'react-redux'

import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/snippets/html'
import 'ace-builds/src-noconflict/ext-beautify'
import 'ace-builds/src-noconflict/ext-code_lens'
import 'ace-builds/src-noconflict/ext-language_tools'

import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  eventKey: number
  visibleModal: boolean
  setVisibleModal: (data: boolean) => void
}

const ModalSettings: FunctionComponent<Props> = ({ eventKey, visibleModal, setVisibleModal }) => {
  const dispatch = useDispatch()
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const [facebookPixelID, setFacebookPixelID] = useState('')
  const [googleAnalyticsID, setGoogleAnalyticsID] = useState('')
  const [googleTagManagerID, setGoogleTagManagerID] = useState('')
  useEffect(() => {
    setFacebookPixelID(html?.conversionCode?.facebookPixelID || '')
    setGoogleAnalyticsID(html?.conversionCode?.googleAnalyticsID || '')
    setGoogleTagManagerID(html?.conversionCode?.googleTagManagerID || '')
  }, [html])

  const changeMeta = (type: string, value: string) => {
    dispatch(actionSaveHTML({
      ...html,
      meta: {
        ...html?.meta,
        [type]: value,
      },
    }))
  }

  const changeConversionCode = (type: string, value: string) => {
    dispatch(actionSaveHTML({
      ...html,
      conversionCode: {
        ...html?.conversionCode,
        [type]: value,
      },
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        conversionCode: {
          ...html?.conversionCode,
          [type]: value,
        },
      },
    ]))
  }

  const changeJsCss = (type: string, value: string) => {
    dispatch(actionSaveHTML({
      ...html,
      code: {
        ...html?.code,
        [type]: value,
      },
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        code: {
          ...html?.code,
          [type]: value,
        },
      },
    ]))
  }

  return (
    <Modal className="modal--publish" show={visibleModal} onHide={() => setVisibleModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Thiết lập trang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey={String(eventKey)}>
          <Tab eventKey="0" title="SEO & SOCIAL" className="mt-3">
            <Form>
              <Form.Group>
                <Form.Label>Tiêu đề trang</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tiêu đề trang (Độ dài tối ưu không vượt quá 70 ký tự)"
                  onChange={e => changeMeta('name', e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mô tả trang</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Nhập mô tả trang (Độ dài tối ưu không vượt quá 160 ký tự)"
                  onChange={e => changeMeta('description', e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Từ khoá về trang</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập từ khoá về trang"
                  onChange={e => changeMeta('keywords', e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Hình ảnh khi chia sẻ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập đường dẫn hình ảnh (Kích thước khuyên dùng 1200x630px)"
                  onChange={e => changeMeta('image', e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Hình ảnh Favicon</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập đường dẫn hình ảnh Favicon (Kích thước khuyên dùng 256x256px)"
                  onChange={e => changeMeta('favicon', e.target.value)}
                />
              </Form.Group>
            </Form>
          </Tab>
          <Tab eventKey="1" title="Mã chuyển đổi" className="mt-3">
            <Form>
              <Form.Group>
                <Form.Label>Facebook Pixel ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập Facebook Pixel ID (Ví dụ: 1520656564722XXX)"
                  onChange={e => changeConversionCode('facebookPixelID', e.target.value)}
                  value={facebookPixelID}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Google Analytics ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập Google Analytics ID (Ví dụ: UA-86097XXX-1)"
                  onChange={e => changeConversionCode('googleAnalyticsID', e.target.value)}
                  value={googleAnalyticsID}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Google Tag Manager ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập Google Tag Manager ID (Ví dụ: GTM-KHSNXXX)"
                  onChange={e => changeConversionCode('googleTagManagerID', e.target.value)}
                  value={googleTagManagerID}
                />
              </Form.Group>
            </Form>
          </Tab>
          <Tab eventKey="2" title="Mã Javascript/CSS" className="mt-3">
            <h6>Trước thẻ &lt;/head&gt;</h6>
            <AceEditor
              placeholder="Nhập mã ..."
              mode="html"
              theme="tomorrow"
              fontSize={14}
              showPrintMargin
              showGutter
              highlightActiveLine
              value={html?.code?.head}
              width="100%"
              height="200px"
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
              onChange={(val: any) => changeJsCss('head', val)}
            />
            <hr />
            <h6>Trước thẻ &lt;/body&gt;</h6>
            <AceEditor
              placeholder="Nhập mã ..."
              mode="html"
              theme="tomorrow"
              fontSize={14}
              showPrintMargin
              showGutter
              highlightActiveLine
              value={html?.code?.body}
              width="100%"
              height="200px"
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
              onChange={(val: any) => changeJsCss('body', val)}
            />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => setVisibleModal(false)}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalSettings
