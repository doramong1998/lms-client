import React, {
  FunctionComponent, useCallback, useState, memo,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Modal, Button, Popover, OverlayTrigger, ButtonGroup,
} from 'react-bootstrap'
import '../styles.scss'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'
import { templatesForm, listForm } from '../../../utils'

export interface Props {
  el: any
}

const AddField: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState('name')

  const renderValue = (value: string) => {
    let result = ''
    for (const item of listForm) {
      if (item?.value === value) {
        result = item?.name
      }
    }

    return result
  }

  const onAdd = useCallback((type: string) => {
    let element: any = {}
    switch (type) {
      case 'name':
        element = { ...templatesForm.inputName }
        break
      case 'email':
        element = { ...templatesForm.inputEmail }
        break
      case 'phoneNumber':
        element = { ...templatesForm.inputPhoneNumber }
        break
      case 'number':
        element = { ...templatesForm.inputNumber }
        break
      case 'address':
        element = { ...templatesForm.inputAddress }
        break
      case 'date':
        element = { ...templatesForm.inputDate }
        break
      case 'code':
        element = { ...templatesForm.inputCode }
        break
      case 'textArea':
        element = { ...templatesForm.inputTextArea }
        break
      case 'radio':
        element = { ...templatesForm.radio }
        break
      case 'select':
        element = { ...templatesForm.select }
        break
      case 'selectAddress':
        element = { ...templatesForm.selectAddress }
        break
      case 'checkbox':
        element = { ...templatesForm.checkbox }
        break
      default:
        break
    }
    const selectedElement = html?.elements?.find((item: any) => item?.id === el?.id)
    const widthItem = selectedElement[device]?.width
    let top = 0
    let height = 0
    for (const item of html?.formItem) {
      if (item[device].top + item[device].height > top + height && item.tag !== 'button') {
        top = item[device].top
        height = item[device].height
      }
    }
    const formItem = [
      ...html?.formItem,
      {
        ...element,
        id: `id--${uid(32)}`,
        sectionId: selectedElement.sectionId,
        formId: selectedElement.id,
        desktop: {
          ...element.desktop,
          top: top + height + 5,
          width: widthItem,
        },
        mobile: {
          ...element.mobile,
          top: top + height + 5,
          width: widthItem,
        },
      },
    ]
    const newFormItem = formItem.map((item: any) => {
      if (item?.tag === 'button') {
        return {
          ...item,
          [device]: {
            ...item[device],
            top: item[device].top + height + 5,
          },
        }
      }
      return item
    })
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === el?.id) {
        return {
          ...item,
          [device]: {
            ...item[device],
            height: item[device].height + height + 5,
          },
        }
      }
      return item
    })
    dispatch(actionSaveHTML({
      ...html,
      formItem: newFormItem,
      elements,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        elements,
        formItem: newFormItem,
      },
    ]))
    setVisible(false)
  }, [dispatch, device, html, el, history])

  return (
    <>
      <Button variant="outline-primary" className="border-0" onClick={() => setVisible(true)}>
        <span className="fontSize--10 p--5 whiteSpace--nowrap">
          THÊM TRƯỜNG
        </span>
      </Button>
      <Modal show={visible} onHide={() => setVisible(false)} className="modal-custom-400">
        <Modal.Header closeButton>
          <Modal.Title>THÊM TRƯỜNG</Modal.Title>
        </Modal.Header>
        <Modal.Body className="settings__item">
          <div className="__collapse ">
            <div className="__collapse__content">
              <OverlayTrigger
                trigger="focus"
                placement="bottom"
                overlay={(
                  <Popover id="popover-basic" className="settings__popover">
                    <Popover.Content style={{ maxHeight: '200px', overflow: 'auto' }}>
                      <ButtonGroup vertical size="sm">
                        {listForm.map((item: any, index: number) => (
                          <Button
                            key={index}
                            variant="outline-primary"
                            className="border-bottom"
                            onClick={() => setSelected(item.value)}
                          >
                            {item.name}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </Popover.Content>
                  </Popover>
                )}
              >
                <Button className="__title">
                  {renderValue(selected)}
                </Button>
              </OverlayTrigger>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setVisible(false)}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={() => onAdd(selected)}>
            Thêm mới
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default memo(AddField)
