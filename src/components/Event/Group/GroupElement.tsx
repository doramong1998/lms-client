/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import $ from 'jquery'
import { ApplicationState } from '../../../store'
import styles from './styles'
import Event from '..'
import { ToolbarGroup } from '../..'
import { actionSaveListGroup, actionSelectId } from '../../../store/builder/actions'
import { common } from '../../../utils'

export interface Props {
  top: number
  left: number
  width:number
  height: number
}

const GroupElement: FunctionComponent<Props> = ({
  top, left, width, height,
}) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const listGroup = useSelector((state: ApplicationState) => state.builder.listGroup)
  const [values, setValues] = useState<any>(null)

  const calcGroup = () => {
    let maxHeight = 0
    let maxWidth = 0
    let maxTop = 0
    let maxLeft = 0
    const dataNew = [...html?.elements]
    const elements = dataNew.map((element: any) => {
      let index = 0
      for (const i in html?.sections) {
        if (element.sectionId === html?.sections[i]?.id) {
          index = parseInt(i, 10)
        }
      }
      let heightSectionToTop = 0
      for (let i = 0; i < index; i++) {
        heightSectionToTop += parseInt(html?.sections[i]?.[device]?.height, 10)
      }
      return {
        ...element,
        [device]: {
          ...element[device],
          top: element[device]?.top + heightSectionToTop,
        },
      }
    })

    const newElements:any = []
    for (const item of elements.filter((item: any) => !item?.lock)) {
      if (!item?.groupId || item?.groupId === '') {
        if (item[device].top >= top && item[device].top <= top + height) {
          if (item[device].left + ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) >= left && item[device].left + ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) <= left + width) {
            newElements.push(item)
          } else if (item[device].left + ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) + ($(`#${item?.id}`).width() || 0) >= left && item[device].left + ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) + ($(`#${item?.id}`).width() || 0) <= left + width) {
            newElements.push(item)
          }
        } else if (item[device].top + ($(`#${item?.id}`).height() || 0) >= top && item[device].top + ($(`#${item?.id}`).height() || 0) <= top + height) {
          if (item[device].left + ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) >= left && item[device].left + ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) <= left + width) {
            newElements.push(item)
          } else if (item[device].left + ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) + ($(`#${item?.id}`).width() || 0) >= left && item[device].left + ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) + ($(`#${item?.id}`).width() || 0) <= left + width) {
            newElements.push(item)
          }
        }
      }
    }
    if (newElements.length > 0) {
      for (const item of newElements) {
        let checkHeight = 0
        let checkWidth = 0
        if (item?.type === 'heading' || item?.type === 'paragraph' || item?.type === 'list' || (item?.type === 'line' && item?.direction === 'horizon')) {
          checkHeight = 2
        }
        if (item?.type === 'line' && item?.direction === 'vertical') {
          checkWidth = 2
        }
        if (item[device].top + $(`#${item?.id}`).height() > maxHeight) {
          maxHeight = item[device].top + item[device].height + checkHeight
        }
        if (item[device].left + $(`#${item?.id}`).width() > maxWidth) {
          maxWidth = item[device].left + item[device].width + checkWidth
        }
        if (item[device].top > maxTop) {
          maxTop = item[device].top
        }
        if (item[device].left > maxLeft) {
          maxLeft = item[device].left
        }
      }
      let minTop = maxTop
      let minLeft = maxLeft
      for (const item of newElements) {
        if (item[device].top < minTop) {
          minTop = item[device].top
        }
        if (item[device].left < minLeft) {
          minLeft = item[device].left
        }
      }
      const detectElement = []
      for (const item of newElements) {
        detectElement.push(item?.id)
      }
      setValues({
        top: minTop,
        left: minLeft + (window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4,
        width: maxWidth - minLeft,
        height: maxHeight - minTop,
      })
      if (detectElement.length > 1) {
        dispatch(actionSaveListGroup(detectElement))
      } else dispatch(actionSelectId(detectElement[0]))
    }
  }
  useEffect(() => {
    calcGroup()
  }, [])
  return (
    <>
      <Event.Drag el={null} disable={false} isGroup setValues={setValues} values={values}>
        <div
          className={styles.element}
          style={{
            top: `${values?.top}px`,
            left: `${values?.left}px`,
            width: `${values?.width}px`,
            height: `${values?.height}px`,
            display: `${listGroup ? '' : 'none'}`,
          }}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        />
      </Event.Drag>
      <ToolbarGroup top={values?.top} left={values?.left} width={values?.width} height={values?.height} />
    </>
  )
}
export default GroupElement
