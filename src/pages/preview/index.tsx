import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
// import ReactPixel from 'react-facebook-pixel'
import ReactGA from 'react-ga'
// import TagManager from 'react-gtm-module'
import InnerHTML from 'dangerously-set-html-content'
import { ElementPreview } from '../../components'
import { ApplicationState } from '../../store'

export interface Props { }

const Builder: FunctionComponent<Props> = () => {
  const html = useSelector((state: ApplicationState) => state.builder.html)

  useEffect(() => {
    // ReactPixel.init(html?.conversionCode?.facebookPixelID)
    ReactGA.initialize(html?.conversionCode?.googleAnalyticsID)
    // TagManager.initialize({
    //   gtmId: html?.conversionCode?.googleTagManagerID,
    // })
  }, [html])

  const renderElement = (el: any, idx: number) => {
    switch (el.type) {
      case 'button':
        return (
          <ElementPreview.Button key={idx} el={el} />
        )
      case 'heading':
        return (
          <ElementPreview.Heading key={idx} el={el} />
        )
      case 'line':
        return (
          <ElementPreview.Line key={idx} el={el} />
        )
      case 'paragraph':
        return (
          <ElementPreview.Paragraph key={idx} el={el} />
        )
      case 'list':
        return (
          <ElementPreview.List key={idx} el={el} />
        )
      case 'video':
        return (
          <ElementPreview.Video key={idx} el={el} />
        )
      case 'image':
        return (
          <ElementPreview.Image key={idx} el={el} />
        )
      case 'form':
        return (
          <ElementPreview.Form key={idx} el={el} />
        )
      case 'shape':
        return (
          <ElementPreview.Shape key={idx} el={el} />
        )
      case 'box':
        return (
          <ElementPreview.Box key={idx} el={el} />
        )
      case 'codeHtml':
        return (
          <ElementPreview.CodeHtml key={idx} el={el} />
        )
      case 'group':
        return (
          <ElementPreview.Group key={idx} el={el} />
        )
      case 'carosel':
        return (
          <ElementPreview.Carosel key={idx} el={el} />
        )
      case 'gallery':
        return (
          <ElementPreview.Gallery key={idx} el={el} />
        )
      case 'countdown':
        return (
          <ElementPreview.Countdown key={idx} el={el} />
        )
      case 'luckySpin':
        return (
          <ElementPreview.LuckySpin key={idx} el={el} />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Helmet>
        <title>{html?.meta?.name}</title>
        <meta name="description" content={html?.meta?.description} />

        <meta itemProp="name" content={html?.meta?.name} />
        <meta itemProp="description" content={html?.meta?.description} />
        <meta itemProp="image" content={html?.meta?.image} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={html?.meta?.name} />
        <meta property="og:description" content={html?.meta?.description} />
        <meta property="og:image" content={html?.meta?.image} />

        <meta name="twitter:card" content={html?.meta?.image} />
        <meta name="twitter:title" content={html?.meta?.name} />
        <meta name="twitter:description" content={html?.meta?.description} />
        <meta name="twitter:image" content={html?.meta?.image} />
      </Helmet>
      <InnerHTML html={html?.code?.head} />
      {html?.sections?.map((item: any, index: number) => (
        <ElementPreview.Section key={index} el={item}>
          {html?.elements?.map((el: any, idx: number) => el?.sectionId === item?.id && (!el?.groupId || el?.groupId === '') && (!el?.caroselId || el?.caroselId === '') && (
            renderElement(el, idx)
          ))}
        </ElementPreview.Section>
      ))}
      <div dangerouslySetInnerHTML={{ __html: html?.code?.body }} />
    </>
  )
}

export default Builder
