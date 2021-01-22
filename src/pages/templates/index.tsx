import React, { FunctionComponent, useState } from 'react'
import {
  Card, Button, Col, Nav, Row, Tab,
} from 'react-bootstrap'
import './styles.scss'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../../store'
import { actionSaveHTML } from '../../store/builder/actions'

export interface Props {}

const Template: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const ldpId = useSelector((state: ApplicationState) => state.api.ldpId)
  const history = useHistory()
  const [searchValue, setSearchValue] = useState('')
  const data: any = []

  function onAddSection(data: any) {
    if (data === 'none') {
      history.push({
        pathname: `/builder/${ldpId.data.ldpId}`,
        state: {
          id: ldpId.data.ldpId,
        },
      })
    } else {
      dispatch(actionSaveHTML({
        ...html,
        sections: data.sections,
        elements: data.elements,
        formItem: data.formItem,
      }))
      history.push({
        pathname: `/builder/${ldpId.data.ldpId}`,
        state: {
          id: ldpId.data.ldpId,
        },
      })
    }
  }
  return (
    <div>
      <div className="form__item">
        <div className="__heading">LANDING PAGE TEMPLATES</div>
        <Tab.Container defaultActiveKey="all">
          <Row>
            <Col sm={3} style={{ overflow: 'auto', height: '80vh' }}>
              <div className="d-flex align-items-center my-2">
                <div className="__collapse__content w-100">
                  <input value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                </div>
                <Button variant="primary">Search</Button>
              </div>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="all">Tất cả</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} style={{ overflow: 'auto', height: '80vh' }}>
              <div className="main-modal row select--templates">
                <div className="col-3" style={{ paddingBottom: '15px', paddingTop: '15px' }}>
                  <Card>
                    <div className="d-flex align-items-center justify-content-center h--175">
                      TEMPLATE TRẮNG
                    </div>
                    <div className="select--templates__overlay" />
                    <Button variant="light" style={{ position: 'absolute' }} onClick={() => onAddSection('none')}>
                      Sử dụng
                    </Button>
                  </Card>
                </div>
                {data.length > 0 && data?.map((el: any, index: number) => (
                  <div
                    className="col-3"
                    key={index}
                    style={{ paddingBottom: '15px', paddingTop: '15px' }}
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        className="image h--175"
                        src={`http://149.28.158.115:3000/media/${el.image}`}
                      />
                      <div className="d-flex align-items-center justify-content-center">{el.name}</div>
                      <div className="select--templates__overlay" />
                      <div className="template--button">
                        <Button variant="light" onClick={() => onAddSection(el.data)}>
                          Sử dụng
                        </Button>
                        &nbsp;
                        <Button variant="light" onClick={() => onAddSection(el.data)}>
                          Xem trước
                        </Button>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  )
}

export default Template
