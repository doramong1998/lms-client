/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FunctionComponent, useCallback, useEffect, useRef, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import {
  EditorState, SelectionState, RichUtils, Entity,
} from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import styles from './styles'
import {
  Toolbar, ToolbarEditText, Event,
} from '../..'
import { actionEditText, actionSaveHTML, actionSelectId } from '../../../store/builder/actions'
import { ApplicationState } from '../../../store'
import { ButtonProps } from '../../../utils/types/templates'

export interface Props {
  el: ButtonProps,
}

const Button: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const resizing = useSelector((state: ApplicationState) => state.event.resizing)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)
  const editingCarosel = useSelector((state: ApplicationState) => state.event.editingCarosel)
  const [hover, setHover] = useState(false)
  const [edit, setEdit] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [borderRadius, setBorderRadius] = useState<any>(null)

  useEffect(() => {
    setTop(el[device]?.top || 0)
    setLeft(el[device]?.left || 0)
    setWidth(el[device]?.width || 0)
    setHeight(el[device]?.height || 0)
    setBorderRadius(el?.borderRadius || null)
  }, [dispatch, el, device])

  const onResize = useCallback((position: { x: number; y: number }, size: { width: number, height: number }) => {
    setTop((el[device]?.top || 0) + position.y)
    setLeft((el[device]?.left || 0) + position.x)
    setWidth(size.width)
    setHeight(size.height)
  }, [device, el])

  const editor: any = useRef(null)

  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(stateFromHTML(el?.text || '')))
  const type = ['heading', 'paragraph', 'list']

  useEffect(() => {
    if (!selectedId || selectedId !== el?.id) {
      setEdit(false)
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

  const selectCurrentText = () => {
    const currentSelection = editorState.getSelection()
    const startKey = currentSelection.getStartKey()
    const endKey = currentSelection.getEndKey()
    const startOffset = currentSelection.getStartOffset()
    const endOffset = currentSelection.getEndOffset()

    const selection = new SelectionState({
      anchorKey: startKey,
      anchorOffset: startOffset,
      focusKey: endKey,
      focusOffset: endOffset,
    })

    return EditorState.forceSelection(editorState, selection)
  }

  useEffect(() => {
    setEditorState(() => EditorState.createWithContent(stateFromHTML(el?.text || '')))
    dispatch(actionEditText(edit))
  }, [dispatch, el, edit])

  useEffect(() => {
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
  }, [dispatch, edit])

  const onToggleStyle = (type: string) => {
    editor.current.focus()
    setEditorState(RichUtils.toggleInlineStyle(selectCurrentText(), type))
  }

  const handleLink = (value: string) => {
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: value })
    setEditorState(RichUtils.toggleLink(
      selectCurrentText(),
      editorState.getSelection(),
      entityKey,
    ))
  }

  const unLink = () => {
    setEditorState(RichUtils.toggleLink(
      selectCurrentText(),
      editorState.getSelection(),
      null,
    ))
  }

  const setBackground = (type: any) => {
    switch (type) {
      case 'color': return { background: el?.backgroundColor }
      case 'gradient': return { backgroundImage: `${el?.typeGradient}(${el?.position ? `${el?.position}deg,` : ''} ${el?.backgroundGradient1}, ${el?.backgroundGradient2})` }
      default: return {}
    }
  }

  const styleBorder = css`
    border-top-left-radius: ${borderRadius?.borderTopLeftRadius}px;
    border-top-right-radius: ${borderRadius?.borderTopRightRadius}px;
    border-bottom-right-radius: ${borderRadius?.borderBottomRightRadius}px;
    border-bottom-left-radius: ${borderRadius?.borderBottomLeftRadius}px;

    ${borderRadius && borderRadius?.borderStyle !== 'none' ? `
      border-style: ${borderRadius?.borderStyle};
      border-color: ${borderRadius?.borderColor};
      border-width: ${borderRadius?.borderWidth}px;
    ` : ''}
  `
  const stylePlace = css`
    padding: 0px ${el?.padding}px;
    line-height: ${el?.lineHeight} !important;
    letter-spacing: ${el?.letterSpacing}px !important;
  `

  const customClass = css`
    .${el?.className}{
      ${el?.classStyle}
    }
  `

  return (
    <>
      <Event.Drag
        el={el}
        disable={
        edit
        || selectedElement?.id === el?.groupId
        || (el?.groupId !== '' && selectedId !== el?.id)
        || (!editingCarosel?.value && el?.caroselId === selectedElement?.id)
        }
      >
        <div
          className={`${styles.element} ${el[device]?.hide ? 'hidden' : ''} ${customClass}`}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
            zIndex: el?.zIndex,
            boxShadow: el?.boxShadow !== 'none' ? `${el?.boxShadowWidth}px ${el?.boxShadowHeight}px ${el?.boxShadowOpacity}px ${el?.boxShadowDark} ${el?.boxShadow}` : '',
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onDoubleClick={() => !el?.lock && setEdit(true)}
          onClick={(e) => {
            e.stopPropagation()
            if (el?.groupId !== '') {
              if (selectedElement?.id === el?.groupId) {
                dispatch(actionSelectId(el?.id || ''))
              } else dispatch(actionSelectId(el?.groupId || ''))
            } else if (el?.caroselId !== '') {
              if (selectedElement?.id === el?.caroselId) {
                dispatch(actionSelectId(el?.id || ''))
              } else dispatch(actionSelectId(el?.caroselId || ''))
            } else {
              dispatch(actionSelectId(el?.id || ''))
            }
          }}
          id={el?.id}
        >
          <div
            className={`${styles.button} ${styleBorder} ${el?.className}`}
            style={{
              opacity: `${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)}`,
              transform: `perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg)`,
              filter: `contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px)`,
            }}
          >
            <div className={styles.background} style={setBackground(el?.typeBackground)} />
            <div className={styles.overlay} style={{ backgroundColor: el?.overlayColor }} />
            <div className={styles.wrapContent}>
              <div
                className={`${styles.content} ${stylePlace}`}
                style={{
                  color: el?.color,
                  fontSize: el[device]?.fontSize,
                  fontFamily: el?.fontFamily,
                  textAlign: el[device]?.textAlign,
                  fontWeight: el?.fontWeight,
                  fontStyle: el?.fontStyle,
                  textDecorationLine: el?.textDecorationLine,
                  textTransform: el?.textTransform,
                }}
              >
                <Event.EditText
                  el={el}
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
          {!edit && <Event.Resize el={el} edit={edit} onResize={onResize} width={width} height={height} />}
        </div>
      </Event.Drag>
      {selectedId === el?.id && !dragging && !resizing && <Toolbar el={el} top={top} left={left} />}
      {edit && !dragging && !resizing && <ToolbarEditText el={el} top={top} left={left} onToggleStyle={onToggleStyle} unLink={unLink} handleLink={handleLink} />}
    </>
  )
}

export default Button
