import React, { FunctionComponent } from 'react'
import {
  Button, Modal, Tabs, Tab,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'

export interface Props {
  visibleModal: boolean
  setVisibleModal: (data: boolean) => void
}

const ModalPublic: FunctionComponent<Props> = ({ visibleModal, setVisibleModal }) => {
  const urlPublic = useSelector((state: ApplicationState) => state.sidebarRight.urlPublic)

  return (
    <Modal className="modal--publish" show={visibleModal} onHide={() => setVisibleModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Xuất bản Landing Page</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="customSection" id="section-modal">
          <Tab eventKey="customSection" title="Xuất bản">
            <p className="mt-3">*Lưu ý: Đường dẫn xuất bản sẽ hết hạn truy cập sau 5 phút.</p>
            <h6>Trang của bạn</h6>
            <div className="modal--publish__link border rounded-lg p-2">
              <a href={urlPublic?.address} target="_blank" rel="noopener noreferrer">{urlPublic?.address}</a>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => setVisibleModal(false)}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalPublic
