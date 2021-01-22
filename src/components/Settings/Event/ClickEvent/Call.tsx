import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
 }

const Call: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)

  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)

  const changeNumber = (number: string) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedElement?.id && item?.sectionId === selectedElement?.sectionId) {
        return {
          ...item,
          call: number,
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
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Số điện thoại</label>
        <div className="__collapse__content">
          <input type="text" defaultValue={selectedElement?.call} onChange={e => changeNumber(e.target.value)} />
        </div>
      </div>
    </>
  )
}

export default Call
