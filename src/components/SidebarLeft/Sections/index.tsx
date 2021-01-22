import React, { FunctionComponent, useState } from 'react'
import {
  Button, Popover, OverlayTrigger,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import $ from 'jquery'
import { ApplicationState } from '../../../store'
import { SectionProps } from '../../../utils/types/templates'
import { Modal } from '../..'

export interface Props {}

const Section: FunctionComponent<Props> = () => {
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const [visibleModal, setVisibleModal] = useState(false)

  const calcTop = (id: any) => {
    let height = 0
    for (const item of html?.sections) {
      if (item?.id !== id) {
        height += item[device]?.height
      } else {
        return height
      }
    }
    return height
  }

  const goToSection = (item: SectionProps) => {
    $('html, body').animate({ scrollTop: calcTop(item?.id) })
  }

  return (
    <>
      <OverlayTrigger
        trigger="focus"
        placement="right"
        overlay={(
          <Popover id="popover-basic" className="sidebar--left__popover">
            <Popover.Title>
              <div>
                <Button variant="outline-primary" onClick={() => setVisibleModal(true)}>
                  <div>
                    <i className="hi-icon icon-c-add" />
                    {' '}
                    <span>Thêm mới</span>
                  </div>
                </Button>
              </div>
            </Popover.Title>
            <Popover.Content>
              {html?.sections?.map((item: any, index: number) => (
                <div key={index}>
                  <Button variant="outline-primary" onClick={() => goToSection(item)}>
                    <i className="hi-icon icon-section" />
                    {' '}
                    Section
                    {' '}
                    {index}
                  </Button>
                </div>
              ))}
            </Popover.Content>
          </Popover>
        )}
      >
        <Button variant="outline-primary" className="py-2">
          <i className="hi-icon icon-section" />
          <br />
          <span>Section</span>
        </Button>
      </OverlayTrigger>
      <Modal.Sections visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
    </>
  )
}

export default Section
