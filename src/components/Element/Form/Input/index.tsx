import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from '../styles'
import { Event } from '../../..'
import { ApplicationState } from '../../../../store'
import { InputProps } from '../../../../utils/types/formTemplates'
import { actionSelectId } from '../../../../store/builder/actions'

export interface Props {
  item: InputProps

}

const Input: FunctionComponent<Props> = ({ item }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId) || html?.formItem?.find((item: any) => item?.id === selectedId)
  const [hover, setHover] = useState(false)
  const [edit, setEdit] = useState(false)

  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [zIndex, setZIndex] = useState(0)
  const [borderRadius, setBorderRadius] = useState<any>(null)

  useEffect(() => {
    setTop(item[device]?.top || 0)
    setLeft(item[device]?.left || 0)
    setWidth(item[device]?.width || 0)
    setHeight(item[device]?.height || 0)
    setZIndex(item?.zIndex || 0)
    setBorderRadius(item?.borderRadius || null)
  }, [dispatch, item, device])

  const onResize = useCallback((position: { x: number; y: number }, size: { width: number, height: number }) => {
    setTop((item[device]?.top || 0) + position.y)
    setLeft((item[device]?.left || 0) + position.x)
    setWidth(size.width)
    setHeight(size.height)
  }, [device, item])

  const setBackground = (type: any) => {
    switch (type) {
      case 'color': return { background: item?.backgroundColor }
      case 'gradient': return { backgroundImage: `${item?.typeGradient}(${item?.position ? `${item?.position}deg,` : ''} ${item?.backgroundGradient1}, ${item?.backgroundGradient2})` }
      default: return {}
    }
  }

  const styleBorder = css`
    border-top-left-radius: ${borderRadius?.borderTopLeftRadius}px;
    border-top-right-radius: ${borderRadius?.borderTopRightRadius}px;
    border-bottom-right-radius: ${borderRadius?.borderBottomRightRadius}px;
    border-bottom-left-radius: ${borderRadius?.borderBottomLeftRadius}px;
    ${borderRadius && borderRadius?.borderStyle !== 'none' ? `
      border-style: ${borderRadius?.borderStyle};
      border-color: ${borderRadius?.borderColor};
      border-width: ${borderRadius?.borderWidth}px;
    ` : ''};
  `
  const stylePlace = css`
    padding: 0px ${item?.padding}px;
    font-size: ${item?.[device]?.fontSize}px !important;
    text-align: ${item?.textAlign};
    font-family: ${item?.fontFamily};
    font-weight: ${item?.fontWeight};
    font-style: ${item?.fontStyle};
    text-decoration-line: ${item?.textDecorationLine};
    text-transform: ${item?.textTransform};
    box-shadow: ${item?.boxShadow !== 'none' ? `${item?.boxShadowWidth}px ${item?.boxShadowHeight}px ${item?.boxShadowOpacity}px ${item?.boxShadowDark} ${item?.boxShadow}` : 'none'};
    &::placeholder {
      color: ${item?.color} !important;
      line-height: ${item?.lineHeight} !important;
      letter-spacing: ${item?.letterSpacing}px !important;
    }
  `

  return (
    <Event.Drag el={item} isFormItem disable={selectedElement?.id === item?.formId || selectedId !== item?.id}>
      <div
        className={`${styles.element} ${item[device]?.hide ? 'hidden' : ''}`}
        style={{
          top: `${top}px`,
          left: `${left}px`,
          width: `${width}px`,
          height: `${height}px`,
          zIndex,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={(e) => {
          e.stopPropagation()
          if (selectedElement?.id === item?.formId || selectedElement?.formId === item?.formId) {
            setEdit(false)
            dispatch(actionSelectId(item?.id || ''))
          } else dispatch(actionSelectId(item?.formId || ''))
        }}
        onBlur={() => {
          setEdit(false)
        }}
        id={item?.id}
      >
        <input
          className={`${styleBorder} ${stylePlace}`}
          id={item?.id}
          placeholder={item?.placeholder}
          type={item?.type}
          defaultValue={item?.defaultValue !== '' ? item?.defaultValue : undefined}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            opacity: `${(item?.transform?.opacity ? item?.transform?.opacity / 100 : 100)}`,
            transform: `perspective(${item?.transform?.perspective}px) rotate(${item?.transform?.rotate}deg) rotateX(${item?.transform?.rotateX}deg) rotateY(${item?.transform?.rotateY}deg) skewX(${item?.transform?.skewX}deg) skewY(${item?.transform?.skewY}deg)`,
            ...setBackground(item?.typeBackground),
          }}
        />

        {hover && <div className={styles.hover} />}
        <Event.ResizeFormItem el={item} edit={edit} onResize={onResize} width={width} height={height} />
      </div>
    </Event.Drag>
  )
}

export default Input
