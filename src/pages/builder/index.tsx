import React, {
  FunctionComponent, useEffect,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { Element, Event } from '../../components'
import ItemElement from './components/ItemElement'
import { ApplicationState } from '../../store'
import { actionAddHistory, actionSaveHTML } from '../../store/builder/actions'
import { actionSaveTypeElement } from '../../store/sidebarLeft/actions'
import { templates, templatesForm } from '../../utils'

export interface Props { }

const Builder: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const typeElement = useSelector((state: ApplicationState) => state.sidebarLeft.typeElement)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  useEffect(() => {
    if (typeElement !== '') {
      if (typeElement === 'section') {
        const section = { ...templates.section }
        const sections = [
          ...html?.sections,
          {
            ...section,
            id: `id--${uid(32)}`,
          },
        ]
        dispatch(actionSaveHTML({
          ...html,
          sections,
        }))
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            sections,
          },
        ]))
        dispatch(actionSaveTypeElement(''))
      } else {
        let element: any = {}
        switch (typeElement) {
          case 'button':
            element = { ...templates.button }
            break
          case 'heading':
            element = { ...templates.heading }
            break
          case 'line':
            element = { ...templates.line }
            break
          case 'paragraph':
            element = { ...templates.paragraph }
            break
          case 'list':
            element = { ...templates.list }
            break
          case 'video':
            element = { ...templates.video }
            break
          case 'image':
            element = { ...templates.image }
            break
          case 'form':
            element = { ...templates.form }
            break
          case 'box':
            element = { ...templates.box }
            break
          case 'codeHtml':
            element = { ...templates.codeHtml }
            break
          case 'carosel':
            element = { ...templates.carosel }
            break
          case 'gallery':
            element = { ...templates.gallery }
            break
          case 'countdown':
            element = { ...templates.countdown }
            break
          case 'luckySpin':
            element = { ...templates.luckySpin }
            break
          default:
            break
        }
        let sectionId = ''
        let height = 0
        for (const item of html?.sections) {
          const scrollY = window.scrollY + (window.innerHeight / 2)
          if (height < scrollY && scrollY < item[device]?.height + height) {
            height += item[device]?.height
            sectionId = item.id
          }
          height += item[device]?.height
        }

        let maxIndex = 0
        for (const item of html?.elements) {
          if (item.zIndex > maxIndex) {
            maxIndex = item.zIndex
          }
        }
        const id = `id--${uid(32)}`
        const elements = [
          ...html?.elements,
          {
            ...element,
            id,
            sectionId,
            zIndex: maxIndex + 1,
            desktop: {
              ...element.desktop,
              top: Math.floor(Math.random() * 100) + 50,
              left: Math.floor(Math.random() * 400) + 100,
            },
            mobile: {
              ...element.mobile,
              top: Math.floor(Math.random() * 100) + 50,
              left: Math.floor(Math.random() * 400) + 100,
            },
          },
        ]
        let formItem = html?.formItem ? [...html?.formItem] : []
        if (typeElement === 'form') {
          formItem = [
            ...html?.formItem,
            {
              ...templatesForm.inputName,
              id: `id--${uid(32)}`,
              sectionId,
              formId: id,
              desktop: {
                top: 0,
                left: 0,
                width: 300,
                height: 35,
              },
              mobile: {
                top: 0,
                left: 0,
                width: 300,
                height: 35,
              },
            },
            {
              ...templatesForm.inputEmail,
              id: `id--${uid(32)}`,
              sectionId,
              formId: id,
              desktop: {
                top: 40,
                left: 0,
                width: 300,
                height: 35,
              },
              mobile: {
                top: 40,
                left: 0,
                width: 300,
                height: 35,
              },
            },
            {
              ...templatesForm.button,
              id: `id--${uid(32)}`,
              sectionId,
              formId: id,
              desktop: {
                top: 165,
                left: 0,
                width: 300,
                height: 35,
              },
              mobile: {
                top: 165,
                left: 0,
                width: 300,
                height: 35,
              },
            },
          ]
        }
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
        dispatch(actionSaveTypeElement(''))
      }
    }
  }, [dispatch, typeElement, html, device, history])

  return (
    <>
      {html?.sections?.map((item: any, index: number) => (
        <Element.Section key={index} el={item}>
          {html?.elements?.map((el: any) => el?.sectionId === item?.id && (!el?.groupId || el?.groupId === '') && (!el?.caroselId || el?.caroselId === '') && (
            <ItemElement el={el} key={el?.id} />
          ))}
        </Element.Section>
      ))}
      <Event.Group />
    </>
  )
}

export default Builder
