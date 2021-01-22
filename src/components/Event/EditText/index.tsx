/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FunctionComponent,
} from 'react'
import { useSelector } from 'react-redux'
import Editor from 'draft-js-plugins-editor'
import styles from './styles'
import { ApplicationState } from '../../../store'

export interface Props {
  el: any
  edit: boolean
  editor?: any
  editorState?: any
  setEditorState?: any
  setHeight?: any
}

const EditText: FunctionComponent<Props> = ({
  el, edit, editor, editorState, setEditorState, setHeight,
}) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  return (
    <>
      <div>
        {edit ? (
          <Editor
            ref={editor}
            textAlignment={el[device]?.textAlign}
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
