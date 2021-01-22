import React, { FunctionComponent } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'
import { css } from 'emotion'

export interface Props {
  border: string
  setBorder: any
}

const BorderRadiusStyle: FunctionComponent<Props> = ({ border, setBorder }) => {
  const stylesContent = css`
    border-width: 6px;
    padding: 0;
    height: 0px !important;
    width: calc(100% - 5px);
    top: 5px;
    position: relative;
    display: inline-block;
    padding: 2px 0;
  `

  return (
    <div className="d-flex align-items-center justify-content-between my-2">
      <label>Chọn kiểu</label>
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
                    onClick={() => setBorder('none')}
                    style={{ textAlign: 'center' }}
                  >
                    Không chọn
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => setBorder('solid')}
                  >
                    <label className={stylesContent} style={{ borderStyle: 'solid' }} />
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => setBorder('dashed')}
                  >
                    <label className={stylesContent} style={{ borderStyle: 'dashed' }} />
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => setBorder('dotted')}
                  >
                    <label className={stylesContent} style={{ borderStyle: 'dotted' }} />
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => setBorder('double')}
                  >
                    <label className={stylesContent} style={{ borderStyle: 'double' }} />
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => setBorder('groove')}
                  >
                    <label className={stylesContent} style={{ borderStyle: 'groove' }} />
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => setBorder('outset')}
                  >
                    <label className={stylesContent} style={{ borderStyle: 'outset' }} />
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => setBorder('ridge')}
                  >
                    <label className={stylesContent} style={{ borderStyle: 'ridge' }} />
                  </Button>
                </ButtonGroup>
              </Popover.Content>
            </Popover>
          )}
        >
          <Button className="__title">
            {border !== 'none' ? <label className={stylesContent} style={{ borderStyle: border }} /> : 'Không chọn'}
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  )
}

export default BorderRadiusStyle
