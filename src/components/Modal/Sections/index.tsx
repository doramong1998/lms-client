import React, { FunctionComponent } from 'react'
import {
  Button, Modal, Tabs, Tab,
} from 'react-bootstrap'
import DefaultSection from './DefaultSections'

export interface Props {
  visibleModal: boolean
  setVisibleModal: (value: any) => void
  selectedSection?: any
}

const Sections: FunctionComponent<Props> = ({ visibleModal, setVisibleModal, selectedSection }) => (
  <Modal show={visibleModal} onHide={() => setVisibleModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>THÊM MỚI SECTION</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Tabs defaultActiveKey="customSection" id="section-modal">
        <Tab eventKey="customSection" title="Section mẫu">
          <DefaultSection onClose={() => setVisibleModal(false)} selectedSection={selectedSection} />
        </Tab>
      </Tabs>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-secondary" onClick={() => setVisibleModal(false)}>Đóng</Button>
    </Modal.Footer>
  </Modal>
)

export default Sections
