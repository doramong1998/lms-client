import React, { FunctionComponent } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  selectedSection: any
}

const Hide: FunctionComponent<Props> = ({ selectedSection }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const getSelectedSection = () => html?.sections?.find((item: any) => item?.id === selectedSection?.sectionId) || ''

  const onHide = () => {
    const sections = html?.sections?.map((item: any) => {
      if (item?.id === selectedSection?.sectionId) {
        return {
          ...item,
          [device]: {
            ...item[device],
            hide: !item[device]?.hide,
          },
        }
      }
      return item
    })
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
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id={uid(10)}>{getSelectedSection()[device]?.hide ? 'Hiện section' : 'Ẩn section'}</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onHide()}>
        <i className={`hi-icon icon-${getSelectedSection()[device]?.hide ? 'preview' : 'b-preview'}`} />
      </Button>
    </OverlayTrigger>
  )
}

export default Hide
