import React, {
  FunctionComponent, useState, useEffect,
} from 'react'
import {
  OverlayTrigger, Popover, ButtonGroup, Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
  el?: any
}

const AutoScroll: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const [timeScroll, setTimeScroll] = useState(0)

  useEffect(() => {
    setTimeScroll(el?.timeScroll)
  }, [el, device])

  const onChangeValue = (value: string) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === el?.id) {
        return {
          ...item,
          timeScroll: parseInt(value, 10),
        }
      }
      return item
    })
    setTimeScroll(parseInt(value, 10))
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
        <label>Tự động chạy</label>
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
                      onClick={() => onChangeValue('5')}
                    >
                      Có
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => onChangeValue('0')}
                    >
                      Không
                    </Button>
                  </ButtonGroup>
                </Popover.Content>
              </Popover>
            )}
          >
            <Button className="__title">
              {timeScroll === 0 ? 'Không' : 'Có'}
            </Button>
          </OverlayTrigger>
        </div>
      </div>
      {timeScroll !== 0 && (
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Thời gian chạy</label>
        <div className="__collapse__content">
          <input type="number" min={0} value={timeScroll} onChange={e => onChangeValue(e.target.value)} />
          <label style={{ marginRight: '10px', color: '#636e72' }}>sec</label>
        </div>
      </div>
      )}
    </>
  )
}

export default AutoScroll
