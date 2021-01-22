import {
  FunctionComponent, memo, useCallback, useEffect, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uid from 'uid'
import $ from 'jquery'
import { useHistory } from 'react-router'
import {
  actionAddHistory,
  actionSaveHistoryIndex,
  actionSaveHTML, actionSaveListGroup, actionSelectId,
} from '../../store/builder/actions'
import { ApplicationState } from '../../store'
import { actionHandleMouseDown, actionHandleMouseMove } from '../../store/mouse/actions'
import { actionSaveLDP } from '../../store/api/actions'

export interface Props {}

const Window: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const historyRouter = useHistory()

  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const editText = useSelector((state: ApplicationState) => state.builder.editText)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const historyIndex = useSelector((state: ApplicationState) => state.builder.historyIndex)
  const listGroup = useSelector((state: ApplicationState) => state.builder.listGroup)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const copyElementId = useSelector((state: ApplicationState) => state.toolbar.copyElementId)
  const newLDPName = useSelector((state: ApplicationState) => state.api.newLDPName)
  const [copy, setCopy] = useState('')

  useEffect(() => {
    setCopy(copyElementId)
  }, [copyElementId])

  const callDuplicateGroup = useCallback((newForms: any, newElements: any, groupId: string, id: string, type: string) => {
    const newId = `id--${uid(32)}`
    if (type === 'group') {
      for (const item of html?.elements) {
        if (item.id === id) { // duplicate element group
          newElements.push({
            ...item,
            id: newId,
            groupId,
          })
        }
        if (item.groupId === id) { // check element có groupId
          callDuplicateGroup(newForms, newElements, newId, item.id, item.type)
        }
      }
    } else if (type === 'form') {
      for (const item of html?.elements) {
        if (item.id === id) { // duplicate element form
          newElements.push({
            ...item,
            id: newId,
            groupId,
          })
        }
      }
      for (const item of html?.formItem) {
        if (item.formId === id) { // duplicate element formItem
          newForms.push({
            ...item,
            id: `id--${uid(32)}`,
            formId: newId,
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
          })
        }
      }
    }
  }, [html])

  const callDeleteGroup = useCallback((newForm:any, newElements: any, id: string, type: string) => {
    if (type === 'group') {
      for (const item in newElements) {
        if (newElements[item]?.groupId === id) {
          const type = newElements[item]?.type
          const id = newElements[item]?.id
          newElements[item] = undefined
          callDeleteGroup(newForm, newElements, id, type)
        }
      }
    } else if (type === 'form') {
      let id = ''
      for (const item in newElements) {
        if (newElements[item]?.groupId === id) {
          id = newElements[item]?.id
          newElements[item] = undefined
        }
      }
      for (const item in newForm) {
        if (newForm[item]?.formId === id) {
          newForm[item] = undefined
        }
      }
    } else { // thêm element !== group && !== form
      for (const item in newElements) {
        if (newElements[item]?.id === id) {
          newElements[item] = undefined
        }
      }
    }
  }, [])

  const handleKeyDown = useCallback((e: any) => {
    if (!editText && !$('input, textarea').is(':focus')) {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (listGroup) {
          const newElements = [...html?.elements]
          let newForms = [...html?.formItem]
          const elements = html?.elements?.filter((item: any) => listGroup.includes(item?.id))
          for (const el of elements) {
            if (el?.type === 'group') {
              for (const item in newElements) {
                if (newElements[item]?.id === el?.id) {
                  const type = newElements[item]?.type
                  const id = newElements[item]?.id
                  newElements[item] = undefined
                  callDeleteGroup(newForms, newElements, id, type)
                }
              }
            } else if (el?.type === 'form') {
              for (const item in newElements) {
                if (newElements?.[item]?.id === el?.id) {
                  newElements[item] = undefined
                }
              }
              newForms = html?.formItem?.map((item: any) => {
                if (item?.formId !== el?.id) {
                  return item
                }
              })
            } else {
              for (const item in newElements) {
                if (newElements?.[item]?.id === el?.id) {
                  newElements[item] = undefined
                }
              }
            }
          }
          const newElement = newElements.filter((item: any) => item !== undefined)
          const newForm = newForms.filter((item: any) => item !== undefined)
          dispatch(actionSaveHTML({
            ...html,
            elements: newElement,
            formItem: newForm,
          }))
          dispatch(actionAddHistory([
            ...history,
            {
              ...html,
              elements: newElement,
              formItem: newForm,
            },
          ]))
          dispatch(actionSaveListGroup(null))
        } else {
          const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)
          const newElements = [...html?.elements]
          const newForms = [...html?.formItem]
          if (selectedElement?.type === 'group') {
            for (const item in newElements) {
              if (newElements[item]?.id === selectedElement?.id) {
                const type = newElements[item]?.type
                const id = newElements[item]?.id
                newElements[item] = undefined
                callDeleteGroup(newForms, newElements, id, type)
              }
            }
            const newElement = newElements.filter((item: any) => item !== undefined)
            const newForm = newForms.filter((item: any) => item !== undefined)
            dispatch(actionSaveHTML({
              ...html,
              elements: newElement,
              formItem: newForm,
            }))
            dispatch(actionAddHistory([
              ...history,
              {
                ...html,
                elements: newElement,
                formItem: newForm,
              },
            ]))
          } else if (selectedElement?.type === 'form') {
            for (const item in newElements) {
              if (newElements[item].id === selectedId) {
                newElements.splice(parseInt(item, 10), 1)
              }
            }
            const formItem = html?.formItem?.map((item: any) => {
              if (item?.formId !== selectedId) {
                return item
              }
            })
            const newFormItem = formItem.filter((item: any) => item !== undefined)
            dispatch(actionSaveHTML({
              ...html,
              elements: newElements,
              formItem: newFormItem,
            }))
            dispatch(actionAddHistory([
              ...history,
              {
                ...html,
                elements: newElements,
                formItem: newFormItem,
              },
            ]))
          } else {
            for (const item in newElements) {
              if (newElements[item].id === selectedId) {
                newElements.splice(parseInt(item, 10), 1)
              }
            }
            dispatch(actionSaveHTML({
              ...html,
              elements: newElements,
            }))
            dispatch(actionAddHistory([
              ...history,
              {
                ...html,
                elements: newElements,
              },
            ]))
          }
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              [device]: {
                ...item[device],
                top: item[device]?.top - 1,
              },
            }
          }

          return item
        })
        dispatch(actionSaveHTML({
          ...html,
          elements,
        }))
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            elements,
          },
        ]))
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              [device]: {
                ...item[device],
                top: item[device]?.top + 1,
              },
            }
          }

          return item
        })
        dispatch(actionSaveHTML({
          ...html,
          elements,
        }))
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            elements,
          },
        ]))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              [device]: {
                ...item[device],
                left: item[device]?.left - 1,
              },
            }
          }

          return item
        })
        dispatch(actionSaveHTML({
          ...html,
          elements,
        }))
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            elements,
          },
        ]))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === selectedId) {
            return {
              ...item,
              [device]: {
                ...item[device],
                left: item[device]?.left + 1,
              },
            }
          }

          return item
        })
        dispatch(actionSaveHTML({
          ...html,
          elements,
        }))
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            elements,
          },
        ]))
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault()
        const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)
        const newElements = [...html?.elements]
        const newId = `id--${uid(32)}`
        if (selectedElement?.type !== 'group') {
          for (const item of newElements) {
            if (item.id === selectedId) {
              newElements.push({
                ...item,
                id: newId,
                [device]: {
                  ...item[device],
                  top: item[device].top + 30,
                  left: item[device].left + 30,
                },
              })
            }
          }
          dispatch(actionSaveHTML({
            ...html,
            elements: newElements,
          }))
          dispatch(actionAddHistory([
            ...history,
            {
              ...html,
              elements: newElements,
            },
          ]))
        } else {
          for (const item of newElements) {
            if (item.id === selectedId) {
              newElements.push({
                ...item,
                id: newId,
                [device]: {
                  ...item[device],
                  top: item[device].top + 30,
                  left: item[device].left + 30,
                },
              })
            }
            if (item.groupId === selectedId) {
              newElements.push({
                ...item,
                id: `id--${uid(32)}`,
                groupId: newId,
              })
            }
          }
          dispatch(actionSaveHTML({
            ...html,
            elements: newElements,
          }))
          dispatch(actionAddHistory([
            ...history,
            {
              ...html,
              elements: newElements,
            },
          ]))
        }

        dispatch(actionSelectId(newId))
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault()
        setCopy(selectedId)
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault()
        if (copy) {
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
          const selectedElement = html?.elements?.find((item: any) => item?.id === copy)
          if (selectedElement?.type === 'group') {
            const newElements = [...html?.elements]
            const newForms = [...html?.formItem]
            newElements.push({
              ...selectedElement,
              id,
              [device]: {
                ...selectedElement?.[device],
                top: selectedElement?.[device]?.top + 30,
                left: selectedElement?.[device]?.left + 30,
              },
            })
            for (const item of html?.elements) {
              if (item.groupId === selectedElement?.id) {
                callDuplicateGroup(newForms, newElements, id, item.id, item.type)
              }
            }
            dispatch(actionSaveHTML({
              ...html,
              elements: newElements,
              formItem: newForms,
            }))
            dispatch(actionAddHistory([
              ...history,
              {
                ...html,
                elements: newElements,
                formItem: newForms,
              },
            ]))
            dispatch(actionSelectId(id))
          } else if (selectedElement?.type === 'form') {
            const newElements = [...html?.elements]
            const newForms = [...html?.formItem]
            for (const item of html?.elements) {
              if (item.id === copy) {
                newElements.push({
                  ...item,
                  id,
                  sectionId,
                  [device]: {
                    ...item[device],
                    top: item[device].top + 30,
                    left: item[device].left + 30,
                  },
                })
                for (const item of html?.formItem) {
                  if (item.formId === copy) {
                    newForms.push({
                      ...item,
                      id: `id--${uid(32)}`,
                      formId: id,
                    })
                  }
                }
              }
            }
            dispatch(actionSaveHTML({
              ...html,
              elements: newElements,
              formItem: newForms,
            }))
            dispatch(actionAddHistory([
              ...history,
              {
                ...html,
                elements: newElements,
                formItem: newForms,
              },
            ]))
            dispatch(actionSelectId(id))
          } else {
            const element = html?.elements.find((item: any) => item?.id === copy)
            if (element) {
              const elements = [
                ...html?.elements,
                {
                  ...element,
                  id,
                  sectionId,
                  zIndex: maxIndex + 1,
                  desktop: {
                    ...element.desktop,
                    top: Math.floor(Math.random() * 200) + 100,
                    left: Math.floor(Math.random() * 600) + 100,
                  },
                  mobile: {
                    ...element.mobile,
                    top: Math.floor(Math.random() * 200) + 100,
                    left: Math.floor(Math.random() * 600) + 100,
                  },
                },
              ]
              dispatch(actionSaveHTML({
                ...html,
                elements,
              }))
              dispatch(actionAddHistory([
                ...history,
                {
                  ...html,
                  elements,
                },
              ]))
              dispatch(actionSelectId(id))
            }
          }
        }
      } else if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
        e.preventDefault()
        if (historyIndex > 0) {
          dispatch(actionSaveHistoryIndex(historyIndex - 1))
          dispatch(actionSaveHTML(history[historyIndex - 1]))
        }
      } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault()
        if (historyIndex < history.length - 1) {
          dispatch(actionSaveHistoryIndex(historyIndex + 1))
          dispatch(actionSaveHTML(history[historyIndex + 1]))
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        const id = historyRouter.location.pathname.indexOf('/builder') !== -1 ? historyRouter.location.pathname.replace('/builder/', '') : ''
        dispatch(actionSaveLDP('save', { id, data: { title: newLDPName, data: JSON.stringify(html) } }))
      }
    }
  }, [dispatch, html, selectedId, device, copy, listGroup, editText, history, historyIndex, historyRouter, newLDPName, callDeleteGroup, callDuplicateGroup])

  const handleMouseMove = useCallback((e: any) => {
    dispatch(actionHandleMouseMove({
      status: true,
      pageX: e.pageX,
      pageY: e.pageY,
    }))
  }, [dispatch])

  const handleMouseUp = useCallback(() => {
    dispatch(actionHandleMouseDown({
      status: false,
      pageX: 0,
      pageY: 0,
      type: '',
    }))
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleMouseMove, handleMouseUp, handleKeyDown])

  useEffect(() => {
    window.onbeforeunload = () => 'Do you really want to close?'
  }, [])

  return null
}

export default memo(Window)
