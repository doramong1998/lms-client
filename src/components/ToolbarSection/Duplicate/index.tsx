import React, { FunctionComponent, useCallback } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  selectedSection: any
}

const Duplicate: FunctionComponent<Props> = ({ selectedSection }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const callDuplicateSection = useCallback((sectionId: string, newForms: any, newElements: any, groupId: string, id: string, type: string) => {
    const newId = `id--${uid(32)}`
    if (type === 'group') {
      for (const item of html?.elements) {
        if (item.id === id) { // duplicate element group
          newElements.push({
            ...item,
            id: newId,
            groupId,
            sectionId,
          })
        }
        if (item.groupId === id) { // check element có groupId
          callDuplicateSection(sectionId, newForms, newElements, newId, item.id, item.type)
        }
      }
    } else if (type === 'form') {
      for (const item of html?.elements) {
        if (item.id === id) { // duplicate element form
          newElements.push({
            ...item,
            id: newId,
            groupId,
            sectionId,
          })
        }
      }
      for (const item of html?.formItem) {
        if (item.formId === id) { // duplicate element formItem
          newForms.push({
            ...item,
            id: `id--${uid(32)}`,
            formId: newId,
            sectionId,
          })
        }
      }
    } else { // thêm element !== group && !== form
      for (const item of html?.elements) {
        if (item.id === id) {
          newElements.push({
            ...item,
            id: newId,
            groupId,
            sectionId,
          })
        }
      }
    }
  }, [html])

  const onDuplicate = () => {
    let current = 0
    html?.sections?.forEach((item: any, index: number) => {
      if (item?.id === selectedSection?.sectionId) {
        current = index
      }
    })
    const newSections = [...html?.sections]
    const currentSection = newSections?.find((item: any) => item?.id === selectedSection?.sectionId)
    const newSectionId = `id--${uid(32)}`
    const newCurrent = {
      ...currentSection,
      id: newSectionId,
    }
    newSections.splice(current + 1, 0, newCurrent)
    const elements = html?.elements?.filter((item: any) => item?.sectionId === selectedSection?.sectionId)
    const newElements = [...html?.elements]
    const newForms = [...html?.formItem]
    for (const el of elements) {
      if (el?.groupId === '') {
        const newId = `id--${uid(32)}`
        if (el?.type === 'group') {
          newElements.push({
            ...el,
            id: newId,
            sectionId: newSectionId,
          })
          for (const item of html?.elements) {
            if (item.groupId === el?.id) {
              callDuplicateSection(newSectionId, newForms, newElements, newId, item.id, item.type)
            }
          }
        } else if (el?.type === 'form') {
          for (const item of newElements) {
            if (item.id === el?.id) {
              newElements.push({
                ...item,
                id: newId,
                sectionId: newSectionId,
              })
            }
          }
          for (const item of html?.formItem) {
            if (item.formId === el?.id) {
              newForms.push({
                ...item,
                id: `id--${uid(32)}`,
                formId: newId,
                sectionId: newSectionId,
              })
            }
          }
        } else {
          for (const item of newElements) {
            if (item.id === el?.id) {
              newElements.push({
                ...item,
                id: newId,
                sectionId: newSectionId,
              })
            }
          }
        }
      }
    }
    dispatch(actionSaveHTML({
      ...html,
      elements: newElements,
      formItem: newForms,
      sections: newSections,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        elements: newElements,
        formItem: newForms,
        sections: newSections,
      },
    ]))
  }

  return (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id={uid(10)}>Nhân đôi (Ctrl + D)</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onDuplicate()}>
        <i className="hi-icon icon-duplicate" />
      </Button>
    </OverlayTrigger>
  )
}

export default Duplicate
