import React, { FunctionComponent } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
 }

const Link: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)

  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)

  const changeUrl = (url: string) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedElement?.id && item?.sectionId === selectedElement?.sectionId) {
        return {
          ...item,
          link: {
            ...selectedElement?.link,
            url,
          },
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

  const changeTarget = (target: string) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedElement?.id && item?.sectionId === selectedElement?.sectionId) {
        return {
          ...item,
          link: {
            ...selectedElement?.link,
            target,
          },
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
        <label>Liên kết</label>
        <div className="__collapse__content">
          <input type="text" defaultValue={selectedElement?.link?.url} onChange={e => changeUrl(e.target.value)} />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Mở liên kết trên</label>
        <div className="__collapse__content">
          <OverlayTrigger
            trigger="focus"
            placement="bottom"
            overlay={(
              <Popover id="popover-basic" className="settings__popover">
                <Popover.Content>
                  <ButtonGroup vertical size="sm">
                    <Button
                      variant="outline-primary"
                      className="border-bottom"
                      onClick={() => changeTarget('_blank')}
                    >
                      Cửa sổ mới
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="border-bottom"
                      onClick={() => changeTarget('_self')}
                    >
                      Trang hiện tại
                    </Button>
                  </ButtonGroup>
                </Popover.Content>
              </Popover>
          )}
          >
            <Button className="__title">{selectedElement?.link?.target === '_blank' ? 'Cửa sổ mới' : 'Trang hiện tại'}</Button>
          </OverlayTrigger>
        </div>
      </div>
    </>
  )
}

export default Link
