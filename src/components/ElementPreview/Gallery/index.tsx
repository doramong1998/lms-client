import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import ImageGallery from 'react-image-gallery'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { GalleryProps } from '../../../utils/types/templates'

export interface Props {
    el: GalleryProps
  }

const Carosel: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const customClass = css`
      .${el?.className}{
        ${el?.classStyle}
      }
    `
  const classGallery = css`
    .image-gallery-image{
      height: calc(${el?.[device]?.height}px - ${(el?.thumb?.position === 'top' || el?.thumb?.position === 'bottom') ? `${el?.thumb?.height || 0}px - ${el?.thumb?.marginGallery || 0}px` : '0px'}) !important;
      object-fit: cover !important;
    }
  `
  const classThumbnail = css`
    // margin-left: ${el?.thumb?.marginThumb}px !important;
`
  const stylesElement = css`
    top: ${el[device]?.top}px;
    left: ${el[device]?.left}px;
    width: ${el[device]?.width}px;
    height: ${el[device]?.height}px;
    z-index: ${el?.zIndex};
    transform: perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg);
    filter: contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px);
    `

  const getImages = () => {
    const images = []
    if (el?.images.length > 0) {
      for (const item of el?.images) {
        images.push({
          original: `http://149.28.158.115:3000/media/${item.url}`,
          thumbnail: `http://149.28.158.115:3000/media/${item.url}`,
          originalClass: classGallery,
          thumbnailClass: classThumbnail,
        })
      }
    } else {
      images.push({
        original: '',
        thumbnail: '',
      })
    }
    return images
  }

  return (
    <>
      <div
        className={`${styles.element} ${el?.[device]?.hide ? 'hidden' : ''} ${stylesElement} ${customClass}`}
      >
        <div
          className={el?.className}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <ImageGallery
            items={getImages()}
            thumbnailPosition={el?.thumb?.position}
            slideInterval={(el?.timeScroll || 0) * 1000}
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={el?.timeScroll === 0 ? false : true}
            showBullets
            showThumbnails={el?.thumb?.show}
          />
        </div>
      </div>
    </>
  )
}

export default Carosel
