import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from './styles'
import { Toolbar, Event } from '../..'
import { actionSelectId } from '../../../store/builder/actions'
import { ApplicationState } from '../../../store'
import { GalleryProps } from '../../../utils/types/templates'

export interface Props {
  el: GalleryProps
}

const Gallery: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const resizing = useSelector((state: ApplicationState) => state.event.resizing)
  const editingCarosel = useSelector((state: ApplicationState) => state.event.editingCarosel)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)
  const [hover, setHover] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setTop(el[device]?.top || 0)
    setLeft(el[device]?.left || 0)
    setWidth(el[device]?.width || 0)
    setHeight(el[device]?.height || 0)
  }, [dispatch, el, device])

  const onResize = useCallback(
    (position: { x: number; y: number }, size: { width: number; height: number }) => {
      setTop((el[device]?.top || 0) + position.y)
      setLeft((el[device]?.left || 0) + position.x)
      setWidth(size.width)
      setHeight(size.height)
    },
    [device, el],
  )

  const customClass = css`
    .${el?.className} {
      ${el?.classStyle}
    }
  `
  const renderPositionThumb = () => {
    switch (el?.thumb?.position) {
      case 'top':
        return `top: 0; 
                display: flex;
                width: 100%;
                `
      case 'bottom':
        return `bottom: 0;
                display: flex;
                width: 100%;`
      case 'left':
        return `left: 0;
                height:100%;`
      case 'right':
        return `right: 0;
                height:100%;`
      default:
        return ''
    }
  }
  const renderPositionGallery = () => {
    switch (el?.thumb?.position) {
      case 'top':
        return `
          bottom: 0;
          height: calc(100% - ${
            el?.thumb?.show
              ? `${el?.thumb?.height || 0}px - ${el?.thumb?.marginGallery || 0}px`
              : '0px'
});
        `
      case 'bottom':
        return `
          top: 0;
          height: calc(100% - ${
            el?.thumb?.show
              ? `${el?.thumb?.height || 0}px - ${el?.thumb?.marginGallery || 0}px`
              : '0px'
});
        `
      case 'left':
        return `
          right: 0;
          height: 100%;
          width: calc(100% - ${
            el?.thumb?.show
              ? `${el?.thumb?.width || 0}px - ${el?.thumb?.marginGallery || 0}px`
              : '0px'
});
        `
      case 'right':
        return `
          left: 0;
          height: 100%;
          width: calc(100% - ${
            el?.thumb?.show
              ? `${el?.thumb?.width || 0}px - ${el?.thumb?.marginGallery || 0}px`
              : '0px'
});
        `
      default:
        return ''
    }
  }
  const classGallery = css`
    ${renderPositionGallery()}
    position: absolute;
  `

  const classThumb = css`
    ${el?.thumb?.show
    ? `
      height: ${el?.thumb?.height || 0}px;
      ${renderPositionThumb()}
      position: absolute;
      overflow: hidden;
    `
    : ''}
  `

  return (
    <>
      <Event.Drag
        el={el}
        disable={
          selectedElement?.id === el?.groupId
          || (el?.groupId !== '' && selectedId !== el?.id)
          || editingCarosel?.value
        }
      >
        <div
          className={`${styles.element} ${el[device]?.hide ? 'hidden' : ''} ${customClass}`}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
            zIndex: el?.zIndex,
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={(e) => {
            e.stopPropagation()
            if (el?.groupId !== '') {
              if (selectedElement?.id === el?.groupId) {
                dispatch(actionSelectId(el?.id || ''))
              } else dispatch(actionSelectId(el?.groupId || ''))
            } else {
              dispatch(actionSelectId(el?.id || ''))
            }
          }}
          id={el?.id}
        >
          <div
            className={el?.className}
            style={{
              border: '1px solid #000',
              width: '100%',
              height: '100%',
              transform: `perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg)`,
              filter: `contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px)`,
            }}
          >
            <div className={classGallery}>
              {el?.images?.length > 0 ? (
                <img
                  src={`http://149.28.158.115:3000/media/${el?.images[0]?.url}`}
                  alt="Gallery"
                  width="100%"
                  height="100%"
                />
              ) : (
                <div />
              )}
            </div>

            {el?.thumb?.show && (
              <div className={classThumb}>
                {el?.images?.map((item: any, index: number) => (
                  <div key={index}>
                    <img
                      src={`http://149.28.158.115:3000/media/${item?.url}`}
                      style={{
                        marginRight: `${
                          el?.thumb?.position === 'top' || el?.thumb?.position === 'bottom'
                            ? el?.thumb?.marginThumb
                            : 0
                        }px`,
                        marginBottom: `${
                          el?.thumb?.position === 'left' || el?.thumb?.position === 'right'
                            ? el?.thumb?.marginThumb
                            : 0
                        }px`,
                        float: el?.thumb?.position === 'right' ? 'right' : 'none',
                      }}
                      alt="thumb"
                      width={el?.thumb?.width}
                      height={el?.thumb?.height}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {hover && <div className={styles.hover} />}
          <Event.Resize
            el={el}
            onResize={onResize}
            width={width}
            height={height}
            editingCarosel={editingCarosel}
          />
        </div>
      </Event.Drag>
      {selectedId === el?.id && !dragging && !resizing && !editingCarosel?.value && (
        <Toolbar el={el} top={top} left={left} />
      )}
    </>
  )
}

export default Gallery
