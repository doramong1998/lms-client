import React, { FunctionComponent, useState, useEffect } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
  el?: any
 }

const BackgroundTypes: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const [lineHeight, setLineHeight] = useState('')

  useEffect(() => {
    setLineHeight(el?.lineHeight)
  }, [el])
  const onChangeElement = (value: string) => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          lineHeight: value,
        }
      }
      return item
    })
    const formItem = html?.formItem?.map((item: any) => {
      if (item?.formId === selectedId) {
        return {
          ...item,
          lineHeight: value,
        }
      }
      return item
    })
    dispatch(actionSaveHTML({
      ...html,
      elements,
      formItem,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        elements,
        formItem,
      },
    ]))
  }
  return (
    <div className="d-flex align-items-center justify-content-between my-2">
      <label>Khoảng cách dòng</label>
      <div className="__collapse__content">
        <OverlayTrigger
          trigger="focus"
          placement="bottom"
          overlay={(
            <Popover id="popover-basic" className="settings__popover">
              <Popover.Content>
                <ButtonGroup vertical size="sm">
                  <Button
                    className={styles.textCenter}
                    variant="outline-primary"
                    onClick={() => onChangeElement('1')}
                  >
                    1
                  </Button>
                  <Button
                    className={styles.textCenter}
                    variant="outline-primary"
                    onClick={() => onChangeElement('1.2')}
                  >
                    1.2
                  </Button>
                  <Button
                    className={styles.textCenter}
                    variant="outline-primary"
                    onClick={() => onChangeElement('1.4')}
                  >
                    1.4
                  </Button>
                  <Button
                    className={styles.textCenter}
                    variant="outline-primary"
                    onClick={() => onChangeElement('1.6')}
                  >
                    1.6
                  </Button>
                  <Button
                    className={styles.textCenter}
                    variant="outline-primary"
                    onClick={() => onChangeElement('1.8')}
                  >
                    1.8
                  </Button>
                  <Button
                    className={styles.textCenter}
                    variant="outline-primary"
                    onClick={() => onChangeElement('2')}
                  >
                    2
                  </Button>
                </ButtonGroup>
              </Popover.Content>
            </Popover>
          )}
        >
          <Button className="__title" style={{ marginRight: '15px' }}>
            <b>{lineHeight}</b>
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  )
}

export default BackgroundTypes
