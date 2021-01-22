import React, {
  FunctionComponent, useState, useRef, useEffect, useMemo,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery'
import _ from 'lodash'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props { }

const HeightSection: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const debounceChange = useRef(_.debounce((value) => { changeHeightSection(value) }, 500)).current

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedSection = useSelector((state: ApplicationState) => state.builder.selectedSection)

  const selectedElement = useMemo(() => html?.sections?.find((item: any) => item?.id === selectedSection?.sectionId), [html, selectedSection])

  const [heightValue, setHeightValue] = useState<any>()

  useEffect(() => {
    setHeightValue(selectedElement[device]?.height)
  }, [selectedElement, device])

  const calMinHeight = () => {
    let min: any = 0
    const elements = [...html?.elements]
    for (const item of elements) {
      if (item.sectionId === selectedElement?.id) {
        if (item[device]?.top + (item[device]?.height ? item[device]?.height : $(`#${item?.id}`).height()) > min) {
          min = item[device]?.top + (item[device]?.height ? item[device]?.height : $(`#${item?.id}`).height())
        }
      }
    }
    return min
  }

  const changeHeightSection = (height: any) => {
    const minHeight: any = calMinHeight()
    const sections = html?.sections?.map((item: any) => {
      if (item?.id === selectedSection?.sectionId) {
        return {
          ...item,
          [device]: {
            ...item[device],
            height: parseInt(height, 10) < parseInt(minHeight, 10) ? parseInt(minHeight, 10) : parseInt(height, 10),
          },
        }
      }
      return item
    })
    setHeightValue(height < minHeight ? minHeight : height)
    dispatch(actionSaveHTML({
      ...html,
      sections,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        sections,
      },
    ]))
  }

  return (
    <div className="d-flex align-items-center justify-content-between my-2">
      <label>Chiều cao</label>
      <div className="__collapse__content">
        <input type="number" value={heightValue} onChange={e => { setHeightValue(e.target.value); debounceChange(e.target.value) }} />
        <label style={{ marginRight: '10px', color: '#636e72' }}>px</label>
      </div>
    </div>
  )
}

export default HeightSection
