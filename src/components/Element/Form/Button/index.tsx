/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FunctionComponent, useCallback, useEffect, useState, useRef,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import {
  EditorState, SelectionState, // RichUtils, Entity,
} from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import styles from '../styles'
import { Event } from '../../..' // ToolbarEditText
import { actionEditText, actionSaveHTML, actionSelectId } from '../../../../store/builder/actions'
import { ApplicationState } from '../../../../store'
import { ButtonProps } from '../../../../utils/types/formTemplates'

export interface Props {
  item: ButtonProps
  edit: boolean
  setEdit: any
}

const Button: FunctionComponent<Props> = ({ item, edit, setEdit }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  // const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  // const resizing = useSelector((state: ApplicationState) => state.event.resizing)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId) || html?.formItem?.find((item: any) => item?.id === selectedId)
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(stateFromHTML(item?.text || '')))
  const [hover, setHover] = useState(false)

  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [borderRadius, setBorderRadius] = useState<any>()
  const [zIndex, setZIndex] = useState(0)
  const editor: any = useRef(null)
  useEffect(() => {
    setTop(item[device]?.top || 0)
    setLeft(item[device]?.left || 0)
    setWidth(item[device]?.width || 0)
    setHeight(item[device]?.height || 0)
    setBorderRadius(item?.borderRadius || null)
    setZIndex(item?.zIndex || 0)
  }, [dispatch, item, device])
  useEffect(() => {
    setEditorState(() => EditorState.createWithContent(stateFromHTML(item?.text || '')))
    dispatch(actionEditText(edit))
  }, [dispatch, item, edit])
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

  // const selectCurrentText = () => {
  //   const currentSelection = editorState.getSelection()
  //   const startKey = currentSelection.getStartKey()
  //   const endKey = currentSelection.getEndKey()
  //   const startOffset = currentSelection.getStartOffset()
  //   const endOffset = currentSelection.getEndOffset()

  //   const selection = new SelectionState({
  //     anchorKey: startKey,
  //     anchorOffset: startOffset,
  //     focusKey: endKey,
  //     focusOffset: endOffset,
  //   })

  //   return EditorState.forceSelection(editorState, selection)
  // }
  const onResize = useCallback((position: { x: number; y: number }, size: { width: number, height: number }) => {
    setTop((item[device]?.top || 0) + position.y)
    setLeft((item[device]?.left || 0) + position.x)
    setWidth(size.width)
    setHeight(size.height)
  }, [device, item])
  useEffect(() => {
    const htmlRender = stateToHTML(editorState.getCurrentContent(), {
      defaultBlockTag: 'p',
    })
    if (!edit) {
      const formItem = html?.formItem?.map((el: any) => {
        if (el?.id === item?.id) {
          return {
            ...item,
            text: htmlRender,
          }
        }
        return el
      })
      dispatch(actionSaveHTML({
        ...html,
        formItem,
      }))
    } else {
      editor.current.focus()
      setEditorState(selectAllText())
    }
  }, [dispatch, edit])
  // const onToggleStyle = (type: string) => {
  //   editor.current.focus()
  //   setEditorState(RichUtils.toggleInlineStyle(selectCurrentText(), type))
  // }

  // const handleLink = (value: string) => {
  //   const entityKey = Entity.create('LINK', 'MUTABLE', { url: value })
  //   setEditorState(RichUtils.toggleLink(
  //     selectCurrentText(),
  //     editorState.getSelection(),
  //     entityKey,
  //   ))
  // }

  // const unLink = () => {
  //   setEditorState(RichUtils.toggleLink(
  //     selectCurrentText(),
  //     editorState.getSelection(),
  //     null,
  //   ))
  // }
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
  const setBackground = (type: any) => {
    switch (type) {
      case 'color': return { background: item?.backgroundColor }
      case 'gradient': return { backgroundImage: `${item?.typeGradient}(${item?.position ? `${item?.position}deg,` : ''} ${item?.backgroundGradient1}, ${item?.backgroundGradient2})` }
      default: return {}
    }
  }

  const stylePlace = css`
    opacity: ${(item?.transform?.opacity ? item?.transform?.opacity / 100 : 100)};
    transform: perspective(${item?.transform?.perspective}px) rotate(${item?.transform?.rotate}deg) rotateX(${item?.transform?.rotateX}deg) rotateY(${item?.transform?.rotateY}deg) skewX(${item?.transform?.skewX}deg) skewY(${item?.transform?.skewY}deg);
    box-shadow: ${item?.boxShadow !== 'none' ? `${item?.boxShadowWidth}px ${item?.boxShadowHeight}px ${item?.boxShadowOpacity}px ${item?.boxShadowDark} ${item?.boxShadow}` : 'none'};
    filter: contrast(${item?.filter?.contrast}%) brightness(${item?.filter?.brightness}%) saturate(${item?.filter?.saturate}%) sepia(${item?.filter?.sepia}%) grayscale(${item?.filter?.grayscale}%) invert(${item?.filter?.invert}%) hue-rotate(${item?.filter?.hueRotate}deg) blur(${item?.filter?.blur}px),
  `

  return (
    <>
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
          onDoubleClick={() => setEdit(true)}
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
          <div className={`${styles.button} ${styleBorder} ${stylePlace}`}>
            <div className={styles.background} style={setBackground(item?.typeBackground)} />
            <div className={styles.overlay} />
            <div className={styles.wrapContent}>
              <div
                className={styles.content}
                style={{
                  color: item?.color,
                  textAlign: 'center',
                  fontFamily: item?.fontFamily,
                  fontSize: item[device]?.fontSize,
                  fontWeight: item?.fontWeight,
                  fontStyle: item?.fontStyle,
                  textDecorationLine: item?.textDecorationLine,
                  textTransform: item?.textTransform,
                }}
              >
                <Event.EditText
                  el={item}
                  edit={edit}
                  editor={editor}
                  editorState={editorState}
                  setEditorState={setEditorState}
                  setHeight={setHeight}
                />
              </div>
            </div>
          </div>
          {hover && <div className={styles.hover} />}
          <Event.ResizeFormItem el={item} edit={edit} onResize={onResize} width={width} height={height} />
        </div>
      </Event.Drag>
      {/* {edit && !dragging && !resizing && <ToolbarEditText el={item} top={top} left={left} onToggleStyle={onToggleStyle} unLink={unLink} handleLink={handleLink} />} */}
    </>
  )
}

export default Button
