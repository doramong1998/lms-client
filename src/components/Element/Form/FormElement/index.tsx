import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../../store'
import Button from '../Button'
import Input from '../Input'
import RadioButton from '../RadioButton'
import Checkbox from '../Checkbox'
import Select from '../Select'
import SelectAddress from '../SelectAddress'

export interface Props {
  el: any
  edit: boolean
  setEdit: any
}

const FormElement: FunctionComponent<Props> = ({ el, edit, setEdit }) => {
  const html = useSelector((state: ApplicationState) => state.builder.html)

  const itemsForm = []
  for (const item of html?.formItem) {
    if (item?.formId === el?.id) {
      itemsForm.push(item)
    }
  }
  const renderElement = (item: any, idx: number) => {
    switch (item.tag) {
      case 'input':
        return (
          <Input item={item} key={idx} />
        )
      case 'button':
        return (
          <Button item={item} key={idx} edit={edit} setEdit={setEdit} />
        )
      case 'radio':
        return (
          <RadioButton item={item} key={idx} />
        )
      case 'checkbox':
        return (
          <Checkbox item={item} key={idx} />
        )
      case 'select':
        return (
          <Select item={item} key={idx} />
        )
      case 'selectAddress':
        return (
          <SelectAddress item={item} key={idx} />
        )
      default:
        return null
    }
  }

  return (
    <>
      {itemsForm.length > 0 && itemsForm.map((item: any, idx: number) => (
        renderElement(item, idx)
      ))}
    </>
  )
}

export default FormElement
