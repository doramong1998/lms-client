import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  OverlayTrigger, Popover, ButtonGroup, Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { common } from '../../../../utils'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
  onChange: (key: string, value: any) => void
  el: any
}

const ShowTime: FunctionComponent<Props> = ({ onChange, el }) => {
  const dispatch = useDispatch()
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const [type, setType] = useState('minute')
  const [minute, setMinute] = useState(720)
  const [start, setStart] = useState('00:00:00')
  const [stop, setStop] = useState('24:00:00')
  const [end, setEnd] = useState('2021-01-01 00:00:00')

  useEffect(() => {
    setType(el?.countdown?.type)
    setMinute(el?.countdown?.minute)
    setStart(el?.countdown?.start)
    setStop(el?.countdown?.stop)
    setEnd(el?.countdown?.end)
  }, [el])

  const onChangeTime = (key: string, value: any) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          countdown: {
            ...item.countdown,
            [key]: value,
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
        <label>Kiểu</label>
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
                      onClick={() => onChange('type', 'minute')}
                    >
                      Phút
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => onChange('type', 'everydays')}
                    >
                      Hằng ngày
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => onChange('type', 'overtime')}
                    >
                      Thời gian kết thúc
                    </Button>
                  </ButtonGroup>
                </Popover.Content>
              </Popover>
                )}
          >
            <Button className="__title">
              {type === 'minute' ? 'Phút' : (type === 'everydays' ? 'Hằng ngày' : 'Thời gian kết thúc')}
            </Button>
          </OverlayTrigger>
        </div>
      </div>
      {type === 'minute' && (
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Số phút</label>
        <div className="__collapse__content">
          <input type="number" min={0} value={minute} onChange={e => onChangeTime('minute', e.target.value)} />
          <label style={{ marginRight: '10px', color: '#636e72' }}>min</label>
        </div>
      </div>
      )}
      {type === 'everydays' && (
        <>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Bắt đầu</label>
            <div className="__collapse__content">
              <OverlayTrigger
                trigger="focus"
                placement="bottom"
                overlay={(
                  <Popover id="popover-basic" className="settings__popover">
                    <Popover.Content style={{ maxHeight: '200px', overflow: 'auto' }}>
                      <ButtonGroup vertical size="sm">
                        {common.TimesOnDay.map((value:string, index: number) => (
                          <Button
                            key={index}
                            variant="outline-primary"
                            onClick={() => onChangeTime('start', value)}
                          >
                            {value}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </Popover.Content>
                  </Popover>
                )}
              >
                <input value={start} onChange={e => onChangeTime('start', e.target.value)} />
              </OverlayTrigger>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Kết thúc</label>
            <div className="__collapse__content">
              <OverlayTrigger
                trigger="focus"
                placement="bottom"
                overlay={(
                  <Popover id="popover-basic" className="settings__popover">
                    <Popover.Content style={{ maxHeight: '200px', overflow: 'auto' }}>
                      <ButtonGroup vertical size="sm">
                        {common.TimesOnDay.map((value:string, index: number) => (
                          <Button
                            key={index}
                            variant="outline-primary"
                            onClick={() => onChangeTime('stop', value)}
                          >
                            {value}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </Popover.Content>
                  </Popover>
                )}
              >
                <input value={stop} onChange={e => onChangeTime('stop', e.target.value)} />
              </OverlayTrigger>
            </div>
          </div>
        </>
      )}
      {type === 'overtime' && (
        <>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Ngày kết thúc</label>
            <div className="__collapse__content">
              <input value={end} onChange={e => onChangeTime('end', e.target.value)} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ShowTime
