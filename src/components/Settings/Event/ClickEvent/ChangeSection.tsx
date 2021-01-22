import React, { FunctionComponent } from 'react'
import {
  OverlayTrigger, Popover, ButtonGroup, Button,
} from 'react-bootstrap'
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

  const changeSec = (changeSection: string) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedElement?.id && item?.sectionId === selectedElement?.sectionId) {
        return {
          ...item,
          changeSection,
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
        <label>Chọn Section</label>
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
                      onClick={() => changeSec('')}
                    >
                      Không chọn
                    </Button>
                    {html?.sections?.map((item:any, index: number) => (
                      <Button
                        key={index}
                        variant="outline-primary"
                        className="border-bottom"
                        onClick={() => changeSec(index.toString())}
                      >
                        {`Section ${index}`}
                      </Button>
                    ))}

                  </ButtonGroup>
                </Popover.Content>
              </Popover>
          )}
          >
            <Button className="__title">{(selectedElement?.changeSection && selectedElement?.changeSection !== '') ? `Section ${selectedElement?.changeSection}` : 'Không chọn' }</Button>
          </OverlayTrigger>
        </div>
      </div>
    </>
  )
}

export default Call
