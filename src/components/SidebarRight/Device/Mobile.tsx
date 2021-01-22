import React, { FunctionComponent } from 'react'
import {
  Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import { actionSaveHTML } from '../../../store/builder/actions'
import { actionHandleDevice } from '../../../store/sidebarRight/actions'

export interface Props {}

const Mobile: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const html = useSelector((state: ApplicationState) => state.builder.html)

  const setMobile = () => {
    dispatch(actionHandleDevice('mobile'))
    const elements: any = []
    const sections: any = [...html?.sections]
    let sort = false
    for (const item of sections) {
      item.beauty = true
      let top = 0
      for (const el of html?.elements) {
        if (el?.beauty) {
          top = el?.mobile?.top + el?.mobile?.height
        }
      }
      for (const el of html?.elements) {
        if (el?.sectionId === item?.id) {
          if ((!el?.groupId || el?.groupId === '') && !el?.beauty) {
            sort = true
            elements.push({
              ...el,
              beauty: true,
              mobile: {
                ...el?.mobile,
                top: top + 10,
                left: (375 / 2) - (el?.mobile?.width / 2),
              },
            })
            top = top + 10 + el?.mobile?.height
          } else {
            elements.push(el)
          }
        }
      }

      if (top >= item?.mobile?.height) {
        item.mobile.height = top
      }
    }
    if (sort) {
      dispatch(actionSaveHTML({
        ...html,
        elements,
        sections,
      }))
    }
  }
  return (
    <Button variant="outline-primary" onClick={setMobile} className="py-2">
      <i className="hi-icon icon-mobile" />
      <br />
      Mobile
    </Button>
  )
}

export default Mobile
