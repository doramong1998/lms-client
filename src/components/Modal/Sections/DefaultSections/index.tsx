import React, { FunctionComponent, useState, useEffect } from 'react'
import {
  Row, Col, ListGroup, Tab, Card, Button,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { templates } from '../../../../utils'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'
import { actionGetSection } from '../../../../store/api/actions'

export interface Props {
  onClose: () => void
  selectedSection?: any
}

const DefaultSection: FunctionComponent<Props> = ({ onClose, selectedSection }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const getSection = useSelector((state: ApplicationState) => state.api.getSection)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const [activeKey, setActiveKey] = useState('all')
  const history = useSelector((state: ApplicationState) => state.builder.history)

  useEffect(() => {
    dispatch(actionGetSection())
  }, [dispatch])

  const listSection = [
    {
      name: 'Tất cả',
      id: 'all',
      total: '10',
    },
  ]

  const onAddSection = (value: string) => {
    if (value === 'none') {
      const newSections = [...html?.sections]
      if (selectedSection) {
        let index = 0
        for (const item in html?.sections) {
          if (html?.sections[item].id === selectedSection?.sectionId) {
            index = parseInt(item, 10)
          }
        }
        newSections.splice(index + 1, 0, {
          ...templates.section,
          id: `id--${uid(32)}`,
          type: 'section',
          background: 'rgb(255, 255, 255)',
          desktop: {
            height: 600,
          },
          mobile: {
            height: 600,
          },
        })
      } else {
        newSections.push({
          ...templates.section,
          id: `id--${uid(32)}`,
          type: 'section',
          background: 'rgb(255, 255, 255)',
          desktop: {
            height: 600,
          },
          mobile: {
            height: 600,
          },
        })
      }
      dispatch(actionSaveHTML({
        ...html,
        sections: newSections,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          sections: newSections,
        },
      ]))
    } else {
      const section = getSection?.data?.find((item: any) => item?._id === value)
      const data = JSON.parse(section.value)
      const getFormItem = [...data?.formItem]
      const newIdSection = `id--${uid(32)}`
      const getElements = data?.elements?.map((item: any) => {
        if (item.type === 'form') {
          const newIdElement = `id--${uid(32)}`
          for (const value of getFormItem) {
            if (value.formId === item.id) {
              value.formId = newIdElement
              value.id = `id--${uid(32)}`
              item.sectionId = newIdSection
            }
          }
          return {
            ...item,
            id: newIdElement,
            sectionID: newIdSection,
          }
        }
        return {
          ...item,
          id: `id--${uid(32)}`,
          sectionId: newIdSection,
        }
      })
      const getSections = data?.sections.map((item: any) => ({
        ...item,
        id: newIdSection,
        [device]: {
          ...item[device],
          height: parseInt(item[device]?.height, 10),
        },
      }))
      const newSections = [...html?.sections]
      if (selectedSection) {
        let index = 0
        for (const item in html?.sections) {
          if (html?.sections[item].id === selectedSection?.sectionId) {
            index = parseInt(item, 10)
          }
        }
        newSections.splice(index + 1, 0, getSections[0])
      } else {
        newSections.push(getSections[0])
      }

      dispatch(actionSaveHTML({
        ...html,
        sections: newSections,
        elements: [...html?.elements, ...getElements],
        formItem: [...html?.formItem, ...getFormItem],
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          sections: newSections,
          elements: [...html?.elements, ...getElements],
          formItem: [...html?.formItem, ...getFormItem],
        },
      ]))
    }
    onClose()
  }

  return (
    <Tab.Container id="tab-default-section" activeKey={activeKey}>
      <Row>
        <Col sm={3}>
          <ListGroup>
            {listSection.map((item: any, index: number) => (
              <ListGroup.Item eventKey={item.id} key={index} onClick={() => setActiveKey(item.id)}>
                {item.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="all">
              <div className="section--templates">
                <div className="row" style={{ overflow: 'auto', height: '60vh' }}>
                  <div className="col-4" style={{ paddingBottom: '15px', paddingTop: '15px' }}>
                    <Card>
                      <div className="d-flex align-items-center justify-content-center h--150">
                        SECTION TRẮNG
                      </div>
                      <div className="section--templates__overlay" />
                      <Button variant="light" onClick={() => onAddSection('none')}>Sử dụng</Button>
                    </Card>
                  </div>
                  {getSection?.data?.map((item: any, index: number) => (
                    <div className="col-4" key={index} style={{ paddingBottom: '15px', paddingTop: '15px' }}>
                      <Card>
                        <Card.Img variant="top" className="image" src={`http://149.28.158.115:3000/media/${item.image}`} />
                        <div className="d-flex align-items-center justify-content-center h--150">
                          {item.name}
                        </div>
                        <div className="section--templates__overlay" />
                        <Button variant="light" onClick={() => onAddSection(item._id)}>Sử dụng</Button>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default DefaultSection
