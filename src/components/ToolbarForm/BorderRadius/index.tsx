import React, {
  useState, FunctionComponent, useEffect, memo,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../styles.scss'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  selectedId: string
}

const BorderRadius: FunctionComponent<Props> = ({ selectedId }) => {
  const dispatch = useDispatch()
  const [borderRadius, setBorderRadius] = useState<any>(null)

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  useEffect(() => {
    for (const item of html?.formItem) {
      if (item?.id === selectedId) {
        setBorderRadius(item.borderRadius)
      }
    }
  }, [html, selectedId])

  const onChangeElement = (value: number) => {
    const formItem = html?.formItem?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          borderRadius: {
            ...item.borderRadius,
            borderAll: value,
            borderTopLeftRadius: value,
            borderTopRightRadius: value,
            borderBottomRightRadius: value,
            borderBottomLeftRadius: value,
          },
        }
      }
      return item
    })
    dispatch(actionSaveHTML({
      ...html,
      formItem,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        formItem,
      },
    ]))
  }

  return (
    <input type="number" min="0" value={borderRadius && borderRadius?.borderAll ? borderRadius?.borderAll : 0} onChange={(data) => onChangeElement(parseInt(data.target.value, 10))} />
  )
}

export default memo(BorderRadius)
