import React, {
  FunctionComponent, useState,
} from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from '../styles'
import { ApplicationState } from '../../../../store'
import { SelectAddressProps } from '../../../../utils/types/formTemplates'
import Province from '../../../../utils/dist/tinh_tp.json'
import District from '../../../../utils/dist/quan_huyen.json'
import Commune from '../../../../utils/dist/xa_phuong.json'

export interface Props {
      item: SelectAddressProps
      onChange: any
    }

const SelectAddress: FunctionComponent<Props> = ({ item, onChange }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const [province, setProvince] = useState<any>(null)
  const [district, setDistrict] = useState<any>(null)
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
    opacity: ${(item?.transform?.opacity ? item?.transform?.opacity / 100 : 100)};
    transform: perspective(${item?.transform?.perspective}px) rotate(${item?.transform?.rotate}deg) rotateX(${item?.transform?.rotateX}deg) rotateY(${item?.transform?.rotateY}deg) skewX(${item?.transform?.skewX}deg) skewY(${item?.transform?.skewY}deg);
    filter: contrast(${item?.filter?.contrast}%) brightness(${item?.filter?.brightness}%) saturate(${item?.filter?.saturate}%) sepia(${item?.filter?.sepia}%) grayscale(${item?.filter?.grayscale}%) invert(${item?.filter?.invert}%) hue-rotate(${item?.filter?.hueRotate}deg) blur(${item?.filter?.blur}px);
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
  `

  const getDistrict = (value: any) => Object.values(District).filter((item: any) => item.parent_code === value)
  const getCommune = (value: any) => Object.values(Commune).filter((item: any) => item.parent_code === value)

  return (
    <div
      className={`${styles.element} ${item?.[device]?.hide ? 'hidden' : ''} ${stylesElement}`}
      id={item?.id}
    >
      <select
        className={styleBorder}
        onChange={(e:any) => {
          setProvince(e.target.value)
          const selectedValue = Object.values(Province)?.find((item:any) => e.target.value === item.code)
          onChange(selectedValue?.name_with_type, item?.dataName)
        }}
        style={{ width: '100%' }}
      >
        <option key="none" value="null">Tỉnh / thành</option>
        {Object.values(Province)?.map((value:any, index:number) => (
          <option key={index} value={value.code}>{value.name}</option>
        ))}
      </select>
      <select
        style={{ width: '100%' }}
        className={styleBorder}
        onChange={(e:any) => {
          setDistrict(e.target.value)
          const selectedValue = Object.values(District)?.find((item:any) => e.target.value === item.code)
          onChange(selectedValue?.path_with_type, item?.dataName)
        }}
      >
        <option key="none" value="null">Quận/huyện</option>
        {province && getDistrict(province)?.map((value:any, index:number) => (
          <option key={index} value={value.code}>{value.name}</option>
        ))}
      </select>
      <select
        style={{ width: '100%' }}
        className={styleBorder}
        onChange={(e:any) => {
          onChange(e.target.value, item?.dataName)
        }}
      >
        <option key="none" value="null">Xã/phường</option>
        {district && getCommune(district)?.map((value:any, index:number) => (
          <option key={index} value={value.path_with_type}>{value.name}</option>
        ))}
      </select>
    </div>
  )
}
export default SelectAddress
