import React, { FunctionComponent, useState, useEffect } from 'react'
import { Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ListOption from './ListOption'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
  el: any
}

const FormSettings: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const [key, setKey] = useState(false)
  const [name, setName] = useState('')
  const [placeholder, setPlaceHolder] = useState('')
  const [defaultValue, setDefaultValue] = useState('')

  useEffect(() => {
    setName(el?.dataName)
    setPlaceHolder(el?.placeholder)
    setDefaultValue(el?.defaultValue)
  }, [el])

  const changeValue = (key: string, value: string) => {
    const formItem = html?.formItem?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          [key]: value,
        }
      }
      return item
    })
    dispatch(actionSaveHTML({
      ...html,
      formItem,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        formItem,
      },
    ]))
  }

  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            THIẾT LẬP FORM
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Tên lấy dữ liệu</label>
            <div className="__collapse__content">
              <input value={name} onChange={e => changeValue('dataName', e.target.value)} />
            </div>
          </div>
          {(el?.type !== 'checkbox' && el?.type !== 'radio') && (
            <div className="d-flex align-items-center justify-content-between my-2">
              <label>Chữ gợi nhắc</label>
              <div className="__collapse__content">
                <input value={placeholder} onChange={e => changeValue('placeholder', e.target.value)} />
              </div>
            </div>
          )}
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Giá trị mặc định</label>
            <div className="__collapse__content">
              <input value={defaultValue} onChange={e => changeValue('defaultValue', e.target.value)} />
            </div>
          </div>
          {(el?.type === 'checkbox' || el?.type === 'radio' || el?.type === 'select') && <ListOption el={el} />}
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}
export default FormSettings
