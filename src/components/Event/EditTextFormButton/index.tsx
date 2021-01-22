/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FunctionComponent, useEffect, useRef, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Editor, EditorState, SelectionState,
} from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { ApplicationState } from '../../../store'
import { actionSaveHTML, actionEditText } from '../../../store/builder/actions'
import styles from './styles'

export interface Props {
  el: any
  edit: boolean
  onBlur?: any
}

const EditText: FunctionComponent<Props> = ({
  el, edit, onBlur,
}) => {
  const dispatch = useDispatch()
  const editor: any = useRef(null)

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)

  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(stateFromHTML(el?.text || '')))
  const [height, setHeight] = useState<any>(0)
  const type = ['heading', 'paragraph', 'list']

  useEffect(() => {
    const target = document.getElementById(el?.id)
    setHeight(target?.offsetHeight)
  }, [])

  useEffect(() => {
    if (!selectedId || selectedId !== el?.id) {
      onBlur()
    }
  }, [selectedId])

  const selectAllText = () => {
    const currentContent = editorState.getCurrentContent()
    const firstBlock = currentContent.getBlockMap().first()
    const lastBlock = currentContent.getBlockMap().last()
    const firstBlockKey = firstBlock.getKey()
    const lastBlockKey = lastBlock.getKey()
    const lengthOfLastBlock = lastBlock.getLength()

    const selection = new SelectionState({
      anchorKey: firstBlockKey,
      anchorOffset: 0,
      focusKey: lastBlockKey,
      focusOffset: lengthOfLastBlock,
    })
    return EditorState.forceSelection(editorState, selection)
  }

  useEffect(() => {
    setEditorState(() => EditorState.createWithContent(stateFromHTML(el?.text || '')))
    dispatch(actionEditText(edit))
  }, [dispatch, el, edit])

  useEffect(() => {
    if (selectedId) {
      const htmlRender = stateToHTML(editorState.getCurrentContent(), {
        defaultBlockTag: el?.type === 'list' ? 'li' : 'p',
      })
      if (!edit) {
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === el?.id && item?.sectionId === el?.sectionId) {
            return {
              ...item,
              text: htmlRender,
              [device]: {
                ...item[device],
                height: ((type.indexOf(item?.type) !== -1) && height !== 0) ? height - 2 : item[device]?.height,
              },
            }
          }
          return item
        })
        dispatch(actionSaveHTML({
          ...html,
          elements,
        }))
      } else {
        editor.current.focus()
        setEditorState(selectAllText())
      }
    }
  }, [dispatch, edit])

  const colorStyleMap = {
    red: {
      color: 'red',
    },
  }

  return (
    <>
      <div>
        {edit ? (
          <Editor
            customStyleMap={colorStyleMap}
            ref={editor}
            textAlignment="center"
            editorState={editorState}
            stripPastedStyles
            onChange={(e) => {
              setEditorState(e)
              const target = document.getElementById(el?.id)
              setHeight(target?.offsetHeight)
            }}
          />
        ) : (
          <div className={styles.noMargin} dangerouslySetInnerHTML={{ __html: el?.text ? el?.text : '' }} />
        )}
      </div>
    </>
  )
}

export default EditText
