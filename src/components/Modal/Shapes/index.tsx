import React, {
  FunctionComponent, useCallback, useState,
} from 'react'
import {
  Tabs, Button, Modal, Tab, InputGroup, FormControl, Form,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from 'react-hook-form'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML, actionSelectId } from '../../../store/builder/actions'
import { templates, icons } from '../../../utils'

export interface Props {
  visible: boolean
  setVisible: (value:boolean) => void
  selectedId?: any
}

const Shapes: FunctionComponent<Props> = ({ visible, setVisible, selectedId }) => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [listIcons, setListIcons] = useState(icons)
  const [selectedIcon, setSelectedIcon] = useState('')

  const selectIcon = useCallback((item: string) => setSelectedIcon(item), [])
  const onSelectIcon = useCallback(() => {
    if (selectedId) {
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === selectedId) {
          return {
            ...item,
            icon: selectedIcon,
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
    } else {
      let sectionId = ''
      let height = 0
      for (const item of html?.sections) {
        const scrollY = window.scrollY + (window.innerHeight / 2)
        if (height < scrollY && scrollY < item[device]?.height + height) {
          height += item[device]?.height
          sectionId = item.id
        }
        height += item[device]?.height
      }
      let maxIndex = 0
      for (const item of html?.elements) {
        if (item.zIndex > maxIndex) {
          maxIndex = item.zIndex
        }
      }
      const id = `id--${uid(32)}`
      const element = { ...templates.shape }
      const elements = [
        ...html?.elements,
        {
          ...element,
          id,
          sectionId,
          icon: selectedIcon,
          zIndex: maxIndex + 1,
          desktop: {
            ...element.desktop,
            top: Math.floor(Math.random() * 200) + 100,
            left: Math.floor(Math.random() * 600) + 100,
          },
          mobile: {
            ...element.mobile,
            top: Math.floor(Math.random() * 200) + 100,
            left: Math.floor(Math.random() * 600) + 100,
          },
        },
      ]
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

    dispatch(actionSelectId(''))
    setVisible(false)
  }, [dispatch, html, history, selectedIcon, selectedId, setVisible, device])

  const onSearch = (data: any) => {
    const fab = data.icon !== '' && listIcons.fab.filter((item: any) => item.includes(data.icon)).length !== 0 ? listIcons.fab.filter((item: any) => item.includes(data.icon)) : icons.fab
    const far = data.icon !== '' && listIcons.far.filter((item: any) => item.includes(data.icon)).length !== 0 ? listIcons.far.filter((item: any) => item.includes(data.icon)) : icons.far
    const fas = data.icon !== '' && listIcons.fas.filter((item: any) => item.includes(data.icon)).length !== 0 ? listIcons.fas.filter((item: any) => item.includes(data.icon)) : icons.fas
    setListIcons({
      fab,
      far,
      fas,
    })
  }

  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          Quản lý Shape
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSearch)}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Tìm icon"
              size="sm"
              name="icon"
              ref={register}
            />
            <InputGroup.Append>
              <Button type="submit" variant="outline-secondary" size="sm">Tìm kiếm</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <Tabs defaultActiveKey="icons" id="shape-modal">
          <Tab eventKey="icons" title="Icons">
            <div className="d-flex align-items-center flex-wrap" style={{ overflowY: 'auto', height: 350 }}>
              {listIcons.fab.map((item: any, index: number) => (
                <div onClick={() => selectIcon(`fab ${item}`)} key={index} className={`${selectedIcon === `fab ${item}` ? 'active' : ''} shape--icon d-flex align-items-center justify-content-center w--60 h--60 m-2`}>
                  <FontAwesomeIcon icon={['fab', item]} size="3x" />
                </div>
              ))}
              {listIcons.far.map((item: any, index: number) => (
                <div onClick={() => selectIcon(`far ${item}`)} key={index} className={`${selectedIcon === `far ${item}` ? 'active' : ''} shape--icon d-flex align-items-center justify-content-center w--60 h--60 m-2`}>
                  <FontAwesomeIcon icon={['far', item]} size="3x" />
                </div>
              ))}
              {listIcons.fas.map((item: any, index: number) => (
                <div onClick={() => selectIcon(`fas ${item}`)} key={index} className={`${selectedIcon === `fas ${item}` ? 'active' : ''} shape--icon d-flex align-items-center justify-content-center w--60 h--60 m-2`}>
                  <FontAwesomeIcon icon={['fas', item]} size="3x" />
                </div>
              ))}
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => setVisible(false)}>Đóng</Button>
        <Button variant="primary" onClick={onSelectIcon}>Sử dụng</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Shapes
