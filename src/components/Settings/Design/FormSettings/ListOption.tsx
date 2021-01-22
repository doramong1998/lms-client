import React, { FunctionComponent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

  const [values, setValues] = useState('')

  useEffect(() => {
    setValues(el?.values)
  }, [el])

  const changeValue = (value: string) => {
    const formItem = html?.formItem?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          values: value,
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
    <div className="d-flex align-items-center justify-content-between my-2">
      <label>Danh sách giá trị</label>
      <div className="__collapse__textarea">
        <textarea value={values} onChange={e => changeValue(e.target.value)} rows={5} />
      </div>
    </div>
  )
}
export default FormSettings
