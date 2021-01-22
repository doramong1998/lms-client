import React, { FunctionComponent, useCallback, useState } from 'react'
import {
  Modal, Button, OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import html2canvas from 'html2canvas'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionSaveSection, actionPostImages64 } from '../../../store/api/actions'

export interface Props {
  selectedSection: any
}

const Save: FunctionComponent<Props> = ({ selectedSection }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)

  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')

  const convertCanvasToImage = (canvas: any) => canvas.toDataURL('image/png')

  const onSaveSection = useCallback(() => {
    const newElements = [...html?.elements]
    const newSections = [...html?.sections]
    const newFormItem = [...html?.formItem]
    const filterElements = newElements.filter(item => item.sectionId === selectedSection.sectionId)
    const filterSections = newSections.filter(item => item.id === selectedSection.sectionId)
    const filterFormItem = newFormItem.filter(item => item.sectionId === selectedSection.sectionId)
    const target = document.getElementById(selectedSection.sectionId)
    if (target) {
      html2canvas(target).then(async (canvas) => {
        const image = await convertCanvasToImage(canvas)
        const res: any = await dispatch(actionPostImages64({
          data: {
            image,
          },
        }))
        dispatch(actionSaveSection({
          image: res?.data?._id,
          name,
          value: JSON.stringify({
            sections: filterSections,
            elements: filterElements,
            formItem: filterFormItem,
          }),
        }))
      })
    }
    setVisible(false)
  }, [dispatch, html, selectedSection, name])

  return (
    <>
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip id={uid(10)}>Lưu section</Tooltip>}
      >
        <Button variant="outline-primary" className="border-0" onClick={() => setVisible(true)}>
          <i className="hi-icon icon-floppy-disk" />
        </Button>
      </OverlayTrigger>
      <Modal show={visible} onHide={() => setVisible(false)} className="modal-custom-400">
        <Modal.Header closeButton>
          <Modal.Title>LƯU SECTION</Modal.Title>
        </Modal.Header>
        <Modal.Body className="settings__item">
          <div className="__collapse ">
            <div className="__collapse__content">
              <input type="text" placeholder="Nhập tên section" onChange={e => setName(e.target.value)} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setVisible(false)}>
            Hủy bỏ
          </Button>
          <Button variant="primary" disabled={!name || name.length === 0} onClick={() => onSaveSection()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Save
