import React, { FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from '../styles'
import { ApplicationState } from '../../../../store'
import { CheckboxProps } from '../../../../utils/types/formTemplates'

export interface Props {
  item: CheckboxProps
  onChange?: any
}

const Checkbox: FunctionComponent<Props> = ({ item, onChange }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const [selectedValue, setSelectedValue] = useState<any>([])

  const stylesElement = css`
    top: ${item[device]?.top}px;
    left: ${item[device]?.left}px;
    width: ${item[device]?.width}px;
    height: ${item[device]?.height}px;
    z-index: ${item?.zIndex};
  `

  const styleBorder = css`
    border-top-left-radius: ${item?.borderRadius?.borderTopLeftRadius}px;
    border-top-right-radius: ${item?.borderRadius?.borderTopRightRadius}px;
    border-bottom-right-radius: ${item?.borderRadius?.borderBottomRightRadius}px;
    border-bottom-left-radius: ${item?.borderRadius?.borderBottomLeftRadius}px;
    box-shadow: ${item?.boxShadow !== 'none' ? `${item?.boxShadowWidth}px ${item?.boxShadowHeight}px ${item?.boxShadowOpacity}px ${item?.boxShadowDark} ${item?.boxShadow}` : ''};

    ${item?.typeBackground === 'color' ? `
      background: ${item?.backgroundColor};
    ` : `
      background-image: ${item?.typeGradient}(${item?.position ? `${item?.position}deg,` : ''} ${item?.backgroundGradient1}, ${item?.backgroundGradient2});
    `}

    ${item?.borderRadius && item?.borderRadius?.borderStyle !== 'none' ? `
      border-style: ${item?.borderRadius?.borderStyle};
      border-color: ${item?.borderRadius?.borderColor};
      border-width: ${item?.borderRadius?.borderWidth}px;
    ` : ''};
  `
  const stylePlace = css`
    padding: 0px ${item?.padding}px;
    font-size: ${item?.fontSize}px !important;
    color: ${item?.color} !important;
    line-height: ${item?.lineHeight} !important;
    font-family: ${item?.fontFamily};
    letter-spacing: ${item?.letterSpacing}px !important;
    text-align: ${item?.textAlign};
    font-weight: ${item?.fontWeight};
    font-style: ${item?.fontStyle};
    text-decoration-line: ${item?.textDecorationLine};
    text-transform: ${item?.textTransform};
    opacity: ${(item?.transform?.opacity ? item?.transform?.opacity / 100 : 100)};
    transform: perspective(${item?.transform?.perspective}px) rotate(${item?.transform?.rotate}deg) rotateX(${item?.transform?.rotateX}deg) rotateY(${item?.transform?.rotateY}deg) skewX(${item?.transform?.skewX}deg) skewY(${item?.transform?.skewY}deg);
    filter: contrast(${item?.filter?.contrast}%) brightness(${item?.filter?.brightness}%) saturate(${item?.filter?.saturate}%) sepia(${item?.filter?.sepia}%) grayscale(${item?.filter?.grayscale}%) invert(${item?.filter?.invert}%) hue-rotate(${item?.filter?.hueRotate}deg) blur(${item?.filter?.blur}px);
    `

  return (
    <div
      className={`${styles.element} ${item?.[device]?.hide ? 'hidden' : ''} ${stylesElement}`}
      id={item?.id}
    >
      <div className={styleBorder}>
        {item?.values?.trim().split('\n').map((value:any, index:number) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={selectedValue.find((item: any) => item === value)}
              onChange={() => {
                const newData = [...selectedValue]
                if (selectedValue.find((item: any) => item === value)) {
                  newData.splice(index, 1)
                } else {
                  newData.push(value)
                }
                setSelectedValue(newData)
                onChange(newData.toString(), item?.dataName)
              }}
            />
            &nbsp;
            <label className={stylePlace}>{value}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Checkbox
