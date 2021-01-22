import React, { FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable'
import { css } from 'emotion'
import $ from 'jquery'
import { ApplicationState } from '../../../store'
import {
  actionAddHistory,
  actionSaveHTML, actionSaveListGroup,
} from '../../../store/builder/actions'
import { actionDragElement, actionGroupDrag } from '../../../store/event/actions'
import { common } from '../../../utils'

export interface Props {
  el: any
  disable?: boolean
  isFormItem?: boolean
  isGroup?: boolean
  values?: any
  setValues?: any
}

const Drag: FunctionComponent<Props> = ({
  el, disable, isFormItem, children, isGroup, values, setValues,
}) => {
  const dispatch = useDispatch()

  const [drag, setDrag] = useState<any>(null)
  const [isDragging, setDragging] = useState(false)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const listGroup = useSelector((state: ApplicationState) => state.builder.listGroup)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const cropping = useSelector((state: ApplicationState) => state.event.cropping)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const editingCarosel = useSelector((state: ApplicationState) => state.event.editingCarosel)
  const numberCarosel = useSelector((state: ApplicationState) => state.event.numberCarosel)
  const [snap, setSnap] = useState<any>(null)
  const [snapLine, setSnapLine] = useState({
    top: false, left: false, bottom: false, right: false, centerHeight: false, centerWidth: false, topSection: false, leftSection: false, rightSection: false, bottomSection: false,
  })
  const selectedSection = html?.sections?.find((item: any) => item?.id === el?.sectionId)
  const handleDragStart = () => {
    if (!isGroup) {
      dispatch(actionSaveListGroup(null))
    }
    setSnapLine({
      top: false, left: false, bottom: false, right: false, centerHeight: false, centerWidth: false, topSection: false, leftSection: false, rightSection: false, bottomSection: false,
    })
  }
  const handleDragStopElement = (position: { x: number; y: number }) => {
    if (snap) position = snap
    if (el?.groupId && el?.groupId !== '' && !cropping) {
      const elementGroup = html?.elements?.filter((item:any) => item?.groupId && item?.groupId === el?.groupId)
      const newElements = elementGroup?.map((item: any) => {
        if (item?.id === el?.id) {
          return {
            ...item,
            [device]: {
              ...item[device],
              top: (item[device]?.top || 0) + position.y,
              left: (item[device]?.left || 0) + position.x,
            },
          }
        }
        return item
      })
      const selectedGroup = html?.elements?.find((item: any) => item?.id === el?.groupId)
      if (selectedGroup) {
        let maxHeight = 0
        let maxWidth = 0
        let maxTop = 0
        let maxLeft = 0

        for (const item of newElements) {
          if (item[device].top + item[device].height > maxHeight) {
            maxHeight = item[device].top + item[device].height
          }
          if (item[device].left + item[device].width > maxWidth) {
            maxWidth = item[device].left + item[device].width
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
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === selectedGroup?.id) {
            return {
              ...item,
              [device]: {
                ...item[device],
                height: maxHeight - minTop,
                width: maxWidth - minLeft,
                top: item[device].top + minTop,
                left: item[device].left + minLeft,
              },
            }
          }
          if (item?.id === el?.id && item?.groupId === el?.groupId) {
            return {
              ...item,
              [device]: {
                ...item[device],
                top: (item[device]?.top || 0) + position.y - minTop,
                left: (item[device]?.left || 0) + position.x - minLeft,
              },
            }
          }
          if (item?.id !== el?.id && item?.groupId === el?.groupId) {
            return {
              ...item,
              [device]: {
                ...item[device],
                top: (item[device]?.top || 0) - minTop,
                left: (item[device]?.left || 0) - minLeft,
              },
            }
          }
          return item
        })
        if (dragging) {
          dispatch(actionAddHistory([
            ...history,
            {
              ...html,
              elements,
            },
          ]))
        }
        dispatch(actionSaveHTML({
          ...html,
          elements,
        }))
      }
    } else if (cropping) {
      if (drag?.x + el?.crop?.left <= 0
        && drag?.y + el?.crop?.top <= 0
        && drag?.y + el?.crop?.top + el?.crop?.height >= el?.[device]?.height
        && drag?.x + el?.crop?.left + el?.crop?.width >= el?.[device]?.width
      ) {
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === el?.id) {
            return {
              ...item,
              crop: {
                ...item.crop,
                crop: true,
                top: (el?.crop?.top || 0) + drag?.y,
                left: (el?.crop?.left || 0) + drag?.x,
              },
            }
          }
          return item
        })
        if (dragging) {
          dispatch(actionAddHistory([
            ...history,
            {
              ...html,
              elements,
            },
          ]))
        }
        dispatch(actionSaveHTML({
          ...html,
          elements,
        }))
      }
    } else {
      const selectedElement = html?.elements?.find((item: any) => item?.id === editingCarosel?.element)
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === el?.id && item?.sectionId === el?.sectionId) {
          return {
            ...item,
            [device]: {
              ...item[device],
              top: (el[device]?.top || 0) + position.y,
              left: (el[device]?.left || 0) + position.x,
            },
          }
        }
        return item
      })
      const selectedSection = html?.sections?.find((item: any) => item?.id === el?.sectionId)
      let index = 0
      for (const i in html?.sections) {
        if (selectedSection.id === html?.sections[i]?.id) {
          index = parseInt(i, 10)
        }
      }
      let heightSectionToTop = 0
      for (let i = 0; i < index; i++) {
        heightSectionToTop += html?.sections[i][device]?.height
      }
      const heightElementToTop = heightSectionToTop + (el[device]?.top || 0) + position.y
      let compareHeight = 0
      let newIdSection = ''
      let newIndex = 0
      for (let i = 0; i <= html?.sections?.length; i++) {
        if (heightElementToTop > compareHeight + html?.sections[i]?.[device]?.height) {
          compareHeight += html?.sections[i][device]?.height
        } else {
          newIdSection = html?.sections[i]?.id
          newIndex = i
          break
        }
      }
      let newHeightSection = 0
      for (let i = 0; i < newIndex; i++) {
        newHeightSection += html?.sections[i][device]?.height
      }
      const elementClone = [...elements]
      const newElements = elementClone?.map((item: any) => {
        if (item?.id === el?.id) {
          if (editingCarosel?.value) {
            if ((!item?.caroselId || item?.caroselId === '') && (item[device]?.top >= selectedElement[device]?.top
            && item[device]?.left >= selectedElement[device]?.left
            && item[device]?.left + item[device]?.width <= selectedElement[device]?.left + selectedElement?.widthElement * selectedElement?.elements?.number
            && item[device]?.top + item[device]?.height <= selectedElement[device]?.top + selectedElement[device]?.height)) {
              return {
                ...item,
                caroselId: selectedElement?.id,
                [device]: {
                  ...item[device],
                  top: item[device]?.top - selectedElement[device]?.top,
                  left: item[device]?.left - selectedElement[device]?.left + numberCarosel * selectedElement?.widthElement,
                },
              }
            }
            if (item?.caroselId && (item[device]?.top < 0
              || item[device]?.left < 0
              || item[device]?.width > selectedElement?.widthElement * selectedElement?.elements?.number
              || item[device]?.height > selectedElement[device]?.height)) {
              return {
                ...item,
                sectionId: newIdSection,
                caroselId: null,
                [device]: {
                  ...item[device],
                  top: item[device]?.top + selectedElement[device]?.top,
                  left: item[device]?.left + selectedElement[device]?.left,
                },
              }
            }
            if (item?.caroselId && (item[device]?.top >= 0
              && item[device]?.left >= 0
              && item[device]?.width <= selectedElement?.widthElement * selectedElement?.elements?.number
              && item[device]?.height <= selectedElement[device]?.height)) {
              return {
                ...item,
                [device]: {
                  ...item[device],
                  top: heightElementToTop,
                  left: item[device]?.left,
                },
              }
            }
          }
          return {
            ...item,
            sectionId: newIdSection,
            [device]: {
              ...item[device],
              top: heightElementToTop - newHeightSection,
            },
          }
        }
        if (el?.type === 'group' && el?.id === item?.groupId) {
          return {
            ...item,
            sectionId: newIdSection,
          }
        }
        return item
      })
      if (dragging) {
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            elements: newElements,
          },
        ]))
      }
      dispatch(actionSaveHTML({
        ...html,
        elements: newElements,
      }))
    }
    dispatch(actionDragElement(false))
    setDrag(null)
    setSnap(null)
  }

  const handleDragStopGroup = (position: { x: number; y: number }) => {
    const elements = html?.elements?.map((item: any) => {
      if (listGroup.indexOf(item?.id) !== -1) {
        return {
          ...item,
          [device]: {
            ...item[device],
            top: (item[device]?.top || 0) + position.y,
            left: (item[device]?.left || 0) + position.x,
          },
        }
      }
      return item
    })
    if (dragging) {
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements,
        },
      ]))
    }
    dispatch(actionSaveHTML({
      ...html,
      elements,
    }))
    dispatch(actionDragElement(false))
    dispatch(actionGroupDrag(null))
    setValues({ ...values, top: values.top + position.y, left: values.left + position.x })
  }

  const handleDragStopFormItem = (position: { x: number; y: number }) => {
    const formItem = html?.formItem?.map((item: any) => {
      if (item?.id === el?.id && item?.formId === el?.formId) {
        return {
          ...item,
          [device]: {
            ...item[device],
            top: (el[device]?.top || 0) + position.y,
            left: (el[device]?.left || 0) + position.x,
          },
        }
      }

      return item
    })
    const selectedItem = formItem?.find((item: any) => item?.id === selectedId)
    const selectedElement = html?.elements?.find((item: any) => item?.id === selectedItem?.formId)
    if (selectedElement) {
      let maxHeight = 0
      let maxWidth = 0
      let maxTop = 0
      let maxLeft = 0
      const itemsForm = []
      for (const item of formItem) {
        if (item.formId === selectedElement?.id) {
          itemsForm.push(item)
        }
      }

      for (const item of itemsForm) {
        if (item[device].top + item[device].height > maxHeight) {
          maxHeight = item[device].top + item[device].height
        }
        if (item[device].left + item[device].width > maxWidth) {
          maxWidth = item[device].left + item[device].width
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

      for (const item of itemsForm) {
        if (item[device].top < minTop) {
          minTop = item[device].top
        }
        if (item[device].left < minLeft) {
          minLeft = item[device].left
        }
      }
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === selectedElement?.id) {
          return {
            ...item,
            [device]: {
              ...item[device],
              height: maxHeight - minTop,
              width: maxWidth - minLeft,
              top: item[device].top + minTop,
              left: item[device].left + minLeft,
            },
          }
        }
        return item
      })
      const newFormItem = formItem?.map((item: any) => {
        if (item?.id === selectedItem?.id && item?.formId === selectedItem?.formId) {
          return {
            ...item,
            [device]: {
              ...item[device],
              top: item[device].top - minTop,
              left: item[device].left - minLeft,
            },
          }
        }
        if (item?.id !== selectedItem?.id && item?.formId === selectedItem?.formId) {
          return {
            ...item,
            [device]: {
              ...item[device],
              top: item[device].top - minTop,
              left: item[device].left - minLeft,
            },
          }
        }
        return item
      })
      if (dragging) {
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            elements,
            formItem: newFormItem,
          },
        ]))
      }
      dispatch(actionSaveHTML({
        ...html,
        elements,
        formItem: newFormItem,
      }))
    }
    dispatch(actionDragElement(false))
  }

  const handleDragStop = (_e: any, position: { x: number; y: number }) => {
    if (isFormItem) {
      handleDragStopFormItem({ x: position.x, y: position.y })
    } else if (isGroup) {
      handleDragStopGroup({ x: position.x, y: position.y })
    } else {
      handleDragStopElement({ x: position.x, y: position.y })
    }
    setDragging(false)
  }

  const onDragging = (_e: any, position: { x: number; y: number }) => {
    setDragging(true)
    dispatch(actionDragElement(true))
    if (cropping) {
      if (position?.x + el?.crop?.left <= 0
        && position?.y + el?.crop?.top <= 0
        && position?.y + el?.crop?.top + el?.crop?.height >= el?.[device]?.height
        && position?.x + el?.crop?.left + el?.crop?.width >= el?.[device]?.width
      ) {
        setDrag(position)
      }
    }
    if (isGroup) dispatch(actionGroupDrag(position))
    const newPosition = { ...position }
    let nearestTop = 50
    let nearestLeft = 50
    let nearestBottom = 50
    let nearestRight = 50
    const snapValue = 5
    // elements
    html?.elements?.forEach((item: any) => {
      if (item?.id !== el?.id && el?.id !== item?.groupId && item?.caroselId === '') {
        if ((el?.[device]?.top + position.y - (item?.[device]?.top + item?.[device]?.height)) > 0
        && (el?.[device]?.top + position.y - (item?.[device]?.top + item?.[device]?.height)) < nearestTop) {
          nearestTop = el?.[device]?.top + position.y - (item?.[device]?.top + item?.[device]?.height)
        }
        if ((item?.[device]?.top - (el?.[device]?.top + el?.[device]?.height + position.y)) > 0
        && (item?.[device]?.top - (el?.[device]?.top + el?.[device]?.height + position.y)) < nearestBottom) {
          nearestBottom = item?.[device]?.top - (el?.[device]?.top + el?.[device]?.height + position.y)
        }
        if ((el?.[device]?.left + position.x - (item?.[device]?.left + item?.[device]?.width)) > 0
        && (el?.[device]?.left + position.x - (item?.[device]?.left + item?.[device]?.width)) < nearestRight) {
          nearestRight = el?.[device]?.left + position.x - (item?.[device]?.left + item?.[device]?.width)
        }
        if ((item?.[device]?.left - (el?.[device]?.left + el?.[device]?.width + position.x)) > 0
        && (item?.[device]?.left - (el?.[device]?.left + el?.[device]?.width + position.x)) < nearestLeft) {
          nearestLeft = item?.[device]?.left - (el?.[device]?.left + el?.[device]?.width + position.x)
        }
        if (el?.[device]?.left - item?.[device]?.left + position.x > 0 && el?.[device]?.left - item?.[device]?.left + position.x < snapValue) {
          nearestRight = position.x + el?.[device]?.left - item?.[device]?.left
        }
        if (item?.[device]?.left + item?.[device]?.width - (el?.[device]?.left + el?.[device]?.width + position.x) > 0
        && item?.[device]?.left + item?.[device]?.width - (el?.[device]?.left + el?.[device]?.width + position.x) < snapValue) {
          nearestLeft = item?.[device]?.left + item?.[device]?.width - (el?.[device]?.left + el?.[device]?.width + position.x)
        }
        if (el?.[device]?.top - item?.[device]?.top + position.y > 0 && el?.[device]?.top - item?.[device]?.top + position.y < snapValue) {
          nearestTop = position.y + el?.[device]?.top - item?.[device]?.top
        }
        if (item?.[device]?.top + item?.[device]?.height - (el?.[device]?.top + el?.[device]?.height + position.y) > 0
        && item?.[device]?.top + item?.[device]?.height - (el?.[device]?.top + el?.[device]?.height + position.y) < snapValue) {
          nearestBottom = item?.[device]?.top + item?.[device]?.height - (el?.[device]?.top + el?.[device]?.height + position.y)
        }
      }
    })
    const snapLineNew = {
      top: false, left: false, right: false, bottom: false, centerHeight: false, centerWidth: false, topSection: false, leftSection: false, rightSection: false, bottomSection: false,
    }
    // check top element
    if (nearestTop < snapValue && nearestTop > 0) {
      newPosition.y = position.y - nearestTop
      snapLineNew.top = true
    }
    if (nearestTop > snapValue) snapLineNew.top = false
    // check bottom element
    if (nearestBottom < snapValue && nearestBottom > 0) {
      newPosition.y = position.y + nearestBottom
      snapLineNew.bottom = true
    }
    if (nearestBottom > snapValue) snapLineNew.bottom = false
    // check right element
    if (nearestLeft < snapValue && nearestLeft > 0) {
      newPosition.x = position.x + nearestLeft
      snapLineNew.right = true
    }
    if (nearestLeft > snapValue) snapLineNew.right = false
    // check left element
    if (nearestRight < snapValue && nearestRight > 0) {
      newPosition.x = position.x - nearestRight
      snapLineNew.left = true
    }
    if (nearestRight > snapValue) snapLineNew.left = false
    // top section
    if (el?.[device]?.top + position.y < snapValue && el?.[device]?.top + position.y > 0) {
      newPosition.y = -el?.[device]?.top
      snapLineNew.topSection = true
    }
    if (el?.[device]?.top + position.y > snapValue) {
      snapLineNew.topSection = false
    }
    // bottom section
    if (Math.abs(el?.[device]?.top + el?.[device]?.height + position.y - selectedSection?.[device]?.height) < snapValue
    && Math.abs(el?.[device]?.top + el?.[device]?.height + position.y - selectedSection?.[device]?.height) > 0
    ) {
      newPosition.y = position.y + Math.abs(el?.[device]?.top + el?.[device]?.height + position.y - selectedSection?.[device]?.height)
      snapLineNew.bottomSection = true
    }
    if (Math.abs(el?.[device]?.top + el?.[device]?.height + position.y - selectedSection?.[device]?.height) > snapValue
    ) {
      snapLineNew.bottomSection = false
    }
    // left section
    if (Math.abs(el?.[device]?.left + position.x + el?.[device]?.width) < snapValue && Math.abs(el?.[device]?.left + position.x + el?.[device]?.width) > 0) {
      newPosition.x = position.x - (el?.[device]?.left + position.x + el?.[device]?.width)
      snapLineNew.leftSection = true
    }
    // right section
    if (Math.abs(el?.[device]?.left + position.x - (common.CalcWidth(device, html))) < snapValue
    && Math.abs(el?.[device]?.left + position.x - (common.CalcWidth(device, html))) > 0) {
      newPosition.x = position.x - (el?.[device]?.left + position.x - (common.CalcWidth(device, html)))
      snapLineNew.rightSection = true
    }
    // left section
    if (Math.abs(el?.[device]?.left + position.x) < snapValue && Math.abs(el?.[device]?.left + position.x) > 0) {
      newPosition.x = -el?.[device]?.left
      snapLineNew.leftSection = true
    }
    if (Math.abs(el?.[device]?.SeleftSection + position.x) > snapValue) {
      snapLineNew.leftSection = false
    }
    // right section
    if (Math.abs(el?.[device]?.left + el?.[device]?.width + position.x - (common.CalcWidth(device, html))) < snapValue
    && Math.abs(el?.[device]?.left + el?.[device]?.width + position.x - (common.CalcWidth(device, html))) > 0) {
      newPosition.x = position.x - (el?.[device]?.left + el?.[device]?.width + position.x - (common.CalcWidth(device, html)))
      snapLineNew.rightSection = true
    }
    // centerheight
    if (Math.abs(((el?.[device]?.top + el?.[device]?.height / 2 + position.y) - selectedSection?.[device]?.height / 2)) < snapValue
    && Math.abs(((el?.[device]?.top + el?.[device]?.height / 2 + position.y) - selectedSection?.[device]?.height / 2)) > 0) {
      newPosition.y = position.y - ((el?.[device]?.top + el?.[device]?.height / 2 + position.y) - selectedSection?.[device]?.height / 2)
      snapLineNew.centerHeight = true
    }
    if (Math.abs(((el?.[device]?.top + el?.[device]?.height / 2 + position.y) - selectedSection?.[device]?.height / 2)) > snapValue) {
      snapLineNew.centerHeight = false
    }
    // centerwidth
    if (Math.abs(el?.[device]?.left + el?.[device]?.width / 2 + position.x - ((common.CalcWidth(device, html)) / 2)) < snapValue
    && Math.abs(el?.[device]?.left + el?.[device]?.width / 2 + position.x - ((common.CalcWidth(device, html)) / 2)) > 0) {
      newPosition.x = position.x - (el?.[device]?.left + el?.[device]?.width / 2 + position.x - ((common.CalcWidth(device, html)) / 2))
      snapLineNew.centerWidth = true
    }
    if (Math.abs(el?.[device]?.left + el?.[device]?.width / 2 + position.x - ((common.CalcWidth(device, html)) / 2)) > snapValue) {
      snapLineNew.centerWidth = false
    }
    setSnapLine(snapLineNew)
    setSnap(newPosition)
  }
  const styleBorder = css`
  ${dragging && !cropping ? `transform: translate(${snap ? snap.x : 0}px, ${snap ? snap.y : 0}px) !important;` : ''}
  ${cropping ? `transform: translate(${drag ? drag.x : 0}px, ${drag ? drag.y : 0}px) !important;` : ''}
  `

  const calcSection = () => $(`#${el?.id}`).position()?.top

  const calcGroupLeft = () => {
    let result = 0
    if (el?.groupId !== '') {
      result = ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4)
    }
    return result
  }

  const styleLineTop = css`
    border: 1px dashed var(--primary);
    position: absolute;
    top: ${calcSection()}px;
    width: 300vw;
    left: -100vw;
    z-index: 1000;
  `
  const styleLineBottom = css`
    border: 1px dashed var(--primary);
    position: absolute;
    top: ${calcSection() + el?.[device]?.height}px;
    width: 300vw;
    left: -100vw;
    z-index: 1000;
  `
  const styleLineLeft = css`
    border: 1px dashed var(--primary);
    position: fixed;
    left: ${((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) + el?.[device]?.left - calcGroupLeft()}px;
    height: 300vh;
    top: -100vh;
    z-index: 1000;
  `
  const styleLineRight = css`
    border: 1px dashed var(--primary);
    position: fixed;
    left: ${((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) + el?.[device]?.left + el?.[device]?.width - calcGroupLeft()}px;
    height: 300vh;
    top: -100vh;
    z-index: 1000;
  `
  const styleLineHeight = css`
    border: 1px dashed var(--primary);
    position: absolute;
    top: ${calcSection() + el?.[device]?.height / 2}px;
    width: 300vw;
    left: -100vw;
    z-index: 1000;
  `
  const styleLineWidth = css`
    border: 1px dashed var(--primary);
    position: fixed;
    left: ${((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) + ((common.CalcWidth(device, html)) / 2)}px;
    height: 300vh;
    top: -100vh;
    z-index: 1000;
  `
  const styleLineTopSection = css`
    border: 1px dashed var(--primary);
    position: absolute;
    top: ${calcSection()}px;
    width: 300vw;
    left: -100vw;
    z-index: 1000;
  `
  const styleLineBottomSection = css`
    border: 1px dashed var(--primary);
    position: absolute;
    top: ${calcSection() + el?.[device]?.height}px;
    width: 300vw;
    left: -100vw;
    z-index: 1000;
  `
  const styleLineLeftSection = css`
    border: 1px dashed var(--primary);
    position: fixed;
    left: ${((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4)}px;
    height: 300vh;
    top: -100vh;
    z-index: 1000;
  `
  const styleLineRightSection = css`
    border: 1px dashed var(--primary);
    position: fixed;
    left: ${((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 8) + (common.CalcWidth(device, html))}px;
    height: 300vh;
    top: -100vh;
    z-index: 1000;
  `
  return (
    <>
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        position={{ x: 0, y: 0 }}
        grid={[1, 1]}
        scale={1}
        defaultClassNameDragging={styleBorder}
        onStart={handleDragStart}
        onDrag={onDragging}
        onStop={handleDragStop}
        disabled={disable || el?.lock}
      >
        {children}
      </Draggable>
      {dragging && isDragging && (
      <>
        {snapLine && snapLine.top && <div className={`${styleLineTop}`} />}
        {snapLine && snapLine.bottom && <div className={`${styleLineBottom}`} />}
        {snapLine && snapLine.left && <div className={`${styleLineLeft} ${styleBorder}`} />}
        {snapLine && snapLine.right && <div className={`${styleLineRight} ${styleBorder}`} />}
        {snapLine && snapLine.centerHeight && <div className={styleLineHeight} />}
        {snapLine && snapLine.centerWidth && <div className={styleLineWidth} />}
        {snapLine && snapLine.topSection && <div className={`${styleLineTopSection}`} />}
        {snapLine && snapLine.bottomSection && <div className={styleLineBottomSection} />}
        {snapLine && snapLine.leftSection && <div className={styleLineLeftSection} />}
        {snapLine && snapLine.rightSection && <div className={styleLineRightSection} />}
      </>
      )}
    </>
  )
}

export default Drag
