import React, { FunctionComponent, memo } from 'react'
import {
  ButtonGroup, Button, OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { css } from 'emotion'
import { useDispatch, useSelector } from 'react-redux'
import { actionEditCarosel, actionNumberCarosel } from '../../store/event/actions'
import { ApplicationState } from '../../store'
import { actionSaveHTML, actionAddHistory } from '../../store/builder/actions'

export interface Props {
  top?: any,
  left?: any,
  el?: any,
  setPart?: any
  part?: any
}

const ToolbarCarosel: FunctionComponent<Props> = ({
  top, left, setPart, part, el,
}) => {
  const dispatch = useDispatch()
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const stylesElement = css`
    top: ${top - 45}px;
    left: ${left}px;
  `
  const changePart = (value: string) => {
    if (value === 'next') {
      const newPart = part + 1
      if (newPart < el?.elements?.number) {
        setPart(newPart)
        dispatch(actionNumberCarosel(newPart))
      }
    }
    if (value === 'previous') {
      const newPart = part - 1
      if (newPart >= 0) {
        setPart(newPart)
        dispatch(actionNumberCarosel(newPart))
      }
    }
  }
  const changeItem = (type: string) => {
    if (type === 'add') {
      let number = 0
      const elementsNew = html?.elements?.map((item: any) => {
        if (item?.id === el?.id) {
          number = item?.elements?.number
          return {
            ...item,
            elements: {
              ...item?.elements,
              number: item?.elements?.number + 1,
            },
          }
        }
        return item
      })
      setPart(number)
      dispatch(actionNumberCarosel(number))
      dispatch(actionSaveHTML({
        ...html,
        elements: elementsNew,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements: elementsNew,
        },
      ]))
    }
    if (type === 'remove') {
      let number = 0
      const elementsNew = html?.elements?.map((item: any) => {
        if (item?.id === el?.id) {
          if (item?.elements?.number > 1) {
            number = item?.elements?.number - 1
            return {
              ...item,
              elements: {
                ...item?.elements,
                number: item?.elements?.number - 1,
              },
            }
          }
          number = item?.elements?.number
        }
        return item
      })
      const listCarosel:any = []
      for (const item of elementsNew) {
        if (item?.caroselId === el?.id && item[device]?.left > (el?.widthElement * number)) {
          listCarosel.push(item?.id)
        }
      }
      const elementsDeleted = elementsNew?.map((item: any) => {
        if (listCarosel?.indexOf(item?.id) === -1) {
          return item
        }
      })
      const newElement = elementsDeleted.filter((item:any) => item !== undefined)
      setPart(number - 1)
      dispatch(actionNumberCarosel(number))
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
    }
  }
  return (
    <ButtonGroup size="sm" className={`toolbar ${stylesElement}`}>
      <div className="toolbar__item">
        <Button
          variant="outline-primary"
          className="border-0"
          onClick={() => {
            dispatch(actionNumberCarosel(0))
            dispatch(actionEditCarosel({ value: false, element: '' }))
            setPart(0)
          }}
        >
          <span className="fontSize--10 p--5 whiteSpace--nowrap">XONG</span>
        </Button>
      </div>
      <div className="toolbar__item">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="preItem">Chuyển tới item trước</Tooltip>}
        >
          <Button variant="outline-primary" className="border-0" onClick={() => changePart('previous')}>
            <i className="hi-icon icon-left-arrow" />
          </Button>
        </OverlayTrigger>
      </div>
      <div className="toolbar__item">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="nextItem">Chuyển tới item sau</Tooltip>}
        >
          <Button variant="outline-primary" className="border-0" onClick={() => changePart('next')}>
            <i className="hi-icon icon-right-arrow" />
          </Button>
        </OverlayTrigger>
      </div>
      <div className="toolbar__item">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="addItem">Thêm item</Tooltip>}
        >
          <Button variant="outline-primary" className="border-0" onClick={() => changeItem('add')}>
            <i className="hi-icon icon-c-add" />
          </Button>
        </OverlayTrigger>
      </div>
      <div className="toolbar__item">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="removeItem">Xóa item (cuối cùng)</Tooltip>}
        >
          <Button variant="outline-primary" className="border-0" onClick={() => changeItem('remove')}>
            <i className="hi-icon icon-e-remove" />
          </Button>
        </OverlayTrigger>
      </div>
    </ButtonGroup>
  )
}

export default memo(ToolbarCarosel)
