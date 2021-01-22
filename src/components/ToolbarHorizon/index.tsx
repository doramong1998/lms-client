/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState, FunctionComponent, useEffect, memo,
} from 'react'
import { Button } from 'react-bootstrap'
import { css } from 'emotion'
import { useSelector, useDispatch } from 'react-redux'
import './styles.scss'
import { ApplicationState } from '../../store'
import { actionHandleMouseDown } from '../../store/mouse/actions'
import { actionSaveHTML } from '../../store/builder/actions'
import { Modal } from '..'

export interface Props { }

const ToolbarHorizon: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()

  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const mouseMove = useSelector((state: ApplicationState) => state.mouse.mouseMove)
  const mouseDown = useSelector((state: ApplicationState) => state.mouse.mouseDown)
  const selectedSection = useSelector((state: ApplicationState) => state.builder.selectedSection)

  const [top, setTop] = useState(0)
  const [visibleToolbar, setVisibleToolbar] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [originHeight, setOriginHeight] = useState(0)

  useEffect(() => {
    const sections = html?.sections?.find((item: any) => item?.id === selectedSection?.sectionId)
    setOriginHeight(sections?.[device]?.height)
  }, [mouseDown])

  useEffect(() => {
    if (!dragging && mouseDown.status && mouseDown.type === 'move') {
      const arrayElement = html?.elements?.filter((item: any) => item?.sectionId === selectedSection?.sectionId)
      let maxElement = 0
      for (const element of arrayElement) {
        if (element?.[device]?.top + element?.[device]?.height > maxElement) {
          maxElement = element?.[device]?.top + element?.[device]?.height
        }
      }
      const changeHeight = originHeight + mouseMove.pageY - mouseDown.pageY
      const sections = html?.sections?.map((item: any) => {
        if (item?.id === selectedSection?.sectionId) {
          return {
            ...item,
            [device]: {
              ...item[device],
              height: changeHeight > maxElement ? changeHeight : maxElement,
            },
          }
        }
        return item
      })
      dispatch(actionSaveHTML({
        ...html,
        sections,
      }))
      // actionAddHistoryError
    }
  }, [dispatch, mouseMove])

  useEffect(() => {
    if (html && selectedSection && selectedSection?.visible) {
      let height = 0
      for (const item of html?.sections) {
        if (item?.id === selectedSection?.sectionId) {
          setTop(height + (parseInt(item[device]?.height, 10)))
          setVisibleToolbar(true)
        } else height += parseInt(item[device]?.height, 10)
      }
    } else setVisibleToolbar(false)
  }, [html, selectedSection, device])

  const stylesElement = css`
    top: calc(${top - 18}px);
    left: calc((50% - 80px));
  `

  return (
    <>
      {visibleToolbar && selectedId === '' && (
      <div className={`toolbarHorizonSection ${visibleToolbar ? stylesElement : ''}`}>
        <Button variant="outline-primary" onClick={() => setVisibleModal(true)}>
          Thêm mới section
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          style={{ cursor: 'row-resize' }}
          onMouseDown={e => {
            e.stopPropagation()
            dispatch(actionHandleMouseDown({
              status: true,
              pageX: e.pageX,
              pageY: e.pageY,
              type: 'move',
            }))
          }}
        >
          <i className="hi-icon icon-cross-vertical" />
        </Button>
      </div>
      )}
      {visibleModal && <Modal.Sections visibleModal={visibleModal} setVisibleModal={setVisibleModal} selectedSection={selectedSection} />}
    </>
  )
}

export default memo(ToolbarHorizon)
