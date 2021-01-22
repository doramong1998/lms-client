import React, { FunctionComponent, memo } from 'react'
import {
  ButtonGroup, Button, OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { css } from 'emotion'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import '../Event/Group/styles'
import { ApplicationState } from '../../store'
import { common, templates } from '../../utils'
import { actionAddHistory, actionSaveHTML, actionSaveListGroup } from '../../store/builder/actions'

export interface Props {
  top?: any,
  left?: any,
  width?: any,
  height?: any,
}

const ToolbarGroup: FunctionComponent<Props> = ({
  top, left, width, height,
}) => {
  const dispatch = useDispatch()
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const listGroup = useSelector((state: ApplicationState) => state.builder.listGroup)
  const stylesElement = css`
    top: ${top < 80 ? top + height + 5 : top - 45}px;
    left: ${left}px;
  `

  const generateGroup = () => {
    let maxIndex = 0
    for (const item of html?.elements) {
      if (item.zIndex > maxIndex) {
        maxIndex = item.zIndex
      }
    }
    const id = `id--${uid(32)}`
    let newIdSection = ''
    let heightSectionToTop = 0
    for (let i = 0; i <= html?.sections?.length; i++) {
      if (top > heightSectionToTop + html?.sections[i]?.[device]?.height) {
        heightSectionToTop += html?.sections[i]?.[device]?.height
      } else {
        newIdSection = html?.sections[i]?.id
        break
      }
    }
    const element = {
      ...templates.group,
      zIndex: maxIndex,
      id,
      sectionId: newIdSection,
      element: listGroup,
      desktop: {
        ...templates.group.desktop,
        top: top - heightSectionToTop,
        left: left - ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4),
        width,
        height,
      },
      mobile: {
        ...templates.group.mobile,
        top: top - heightSectionToTop,
        left: left - ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4),
        width,
        height,
      },
    }
    const elements = html?.elements?.map((item: any) => {
      if (listGroup.indexOf(item?.id) !== -1) {
        return {
          ...item,
          groupId: id,
          desktop: {
            ...item[device],
            top: (item[device]?.top - (top - heightSectionToTop)),
            left: (item[device]?.left - left + ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4)),
          },
          mobile: {
            ...item[device],
            top: (item[device]?.top - (top - heightSectionToTop)),
            left: (item[device]?.left - left + ((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4)),
          },
        }
      }
      return item
    })
    dispatch(actionSaveHTML({
      ...html,
      elements: [...elements, element],
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        elements: [...elements, element],
      },
    ]))
    dispatch(actionSaveListGroup(null))
  }

  const deleteGroup = () => {
    const elements = html?.elements?.map((item: any) => {
      if (listGroup.indexOf(item?.id) === -1) {
        return item
      }
    })
    const newElement = elements.filter((item:any) => item !== undefined)
    dispatch(actionSaveHTML({
      ...html,
      elements: newElement,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        elements: newElement,
      },
    ]))
    dispatch(actionSaveListGroup(null))
  }

  return (
    <>
      {!dragging && listGroup && listGroup.length > 1 && (
        <ButtonGroup size="sm" className={`toolbar ${stylesElement}`}>
          <div className="toolbar__item">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="groupDelete">Xóa</Tooltip>}
            >
              <Button variant="outline-primary" className="border-0" onClick={() => deleteGroup()}>
                <i className="hi-icon icon-bin" />
              </Button>
            </OverlayTrigger>
          </div>
          <div className="toolbar__item">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="groupElement">TẠO NHÓM</Tooltip>}
            >
              <Button variant="outline-primary" className="border-0" onClick={() => generateGroup()}>
                <span className="fontSize--10 p--5 whiteSpace--nowrap">TẠO NHÓM</span>
              </Button>
            </OverlayTrigger>
          </div>
        </ButtonGroup>
      )}
    </>
  )
}

export default memo(ToolbarGroup)
