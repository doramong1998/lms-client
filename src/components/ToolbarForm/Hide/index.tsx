import React, { FunctionComponent, memo, useCallback } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  el: any
}

const Hide: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const onHide = useCallback(() => {
    const formItem = html?.formItem?.map((item: any) => {
      if (item?.id === el?.id) {
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
      formItem,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        formItem,
      },
    ]))
  }, [dispatch, html, device, el, history])

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={uid(10)}>{el[device]?.hide ? 'Hiện phần tử' : 'Ẩn phần tử'}</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onHide()}>
        <i className={`hi-icon icon-${el[device]?.hide ? 'preview' : 'b-preview'}`} />
      </Button>
    </OverlayTrigger>
  )
}

export default memo(Hide)
