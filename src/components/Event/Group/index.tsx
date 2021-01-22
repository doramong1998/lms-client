import React, {
  FunctionComponent, useState, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GroupElement from './GroupElement'
import styles from './styles'
import { actionSelectId, actionSaveListGroup, actionSelectSection } from '../../../store/builder/actions'
import { ApplicationState } from '../../../store'

export interface Props { }
const Group: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const [topFirst, setTopFirst] = useState(0)
  const [leftFirst, setLeftFirst] = useState(0)
  const [topLast, setTopLast] = useState(0)
  const [leftLast, setLeftLast] = useState(0)
  const [group, setGroup] = useState(false)
  const [move, setMove] = useState(false)
  const [widthFirst, setWidthFirst] = useState(0)
  const [heightFirst, setHeightFirst] = useState(0)
  const [widthLast, setWidthLast] = useState(0)
  const [heightLast, setHeightLast] = useState(0)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const listGroup = useSelector((state: ApplicationState) => state.builder.listGroup)

  useEffect(() => {
    if (!listGroup) {
      setTopLast(0)
      setLeftLast(0)
      setTopFirst(0)
      setLeftFirst(0)
      setWidthFirst(0)
      setHeightFirst(0)
      setWidthLast(0)
      setHeightLast(0)
    }
  }, [listGroup])

  const onMouseUp = (e:any) => {
    if (group && move) {
      setTopLast(e.pageY)
      setLeftLast(e.pageX)
      setWidthFirst(0)
      setHeightFirst(0)
      setGroup(false)
      setMove(false)
    } else {
      setTopLast(0)
      setLeftLast(0)
      setTopFirst(0)
      setLeftFirst(0)
      setWidthFirst(0)
      setHeightFirst(0)
      setWidthLast(0)
      setHeightLast(0)
      setGroup(false)
      setMove(false)
      dispatch(actionSaveListGroup(null))
      let height = 0
      for (const item of html?.sections) {
        if (height < e.pageY && e.pageY < item[device]?.height + height) {
          dispatch(actionSelectSection({ visible: true, sectionId: item.id, height: e.pageY }))
          height += item[device]?.height
        } else height += item[device]?.height
      }
    }
  }

  const onMouseMove = (e:any) => {
    if (group) {
      setMove(true)
      setWidthLast(Math.abs(e.pageX - leftFirst))
      setHeightLast(Math.abs(e.pageY - topFirst))
      setWidthFirst(Math.abs(e.pageX - leftFirst))
      setHeightFirst(Math.abs(e.pageY - topFirst))
      if (e.pageY < topFirst) {
        setTopLast(e.pageY)
      }
      if (e.pageX < leftFirst) {
        setLeftLast(e.pageX)
      }
    }
  }

  const onMouseDown = (e:any) => {
    if (!group && !move) {
      setGroup(true)
      setTopFirst(e.pageY)
      setLeftFirst(e.pageX)
      setTopLast(e.pageY)
      setLeftLast(e.pageX)
    }
    dispatch(actionSelectId(''))
  }

  return (
    <>
      <div
        onMouseUp={(e:any) => onMouseUp(e)}
        onMouseMove={(e:any) => onMouseMove(e)}
        onMouseDown={(e:any) => onMouseDown(e)}
        style={{
          width: '100%', height: '100%', display: 'inline-block', zIndex: group ? 1000 : 'unset',
        }}
        className={styles.container}
      >
        {group && (
        <div
          style={{
            width: `${widthFirst}px`, height: `${heightFirst}px`, position: 'absolute', top: `${topLast}px`, left: `${leftLast}px`,
          }}
          className={styles.groupable}
        />
        )}

      </div>
      {!group && (
        <GroupElement top={topFirst < topLast ? topFirst : topLast} left={leftFirst < leftLast ? leftFirst : leftLast} width={widthLast} height={heightLast} />
      )}
    </>
  )
}

export default Group
