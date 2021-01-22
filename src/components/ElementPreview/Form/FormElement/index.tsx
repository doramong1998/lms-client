import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { ApplicationState } from '../../../../store'
import Button from '../Button'
import Input from '../Input'
import RadioButton from '../RadioButton'
import Checkbox from '../Checkbox'
import Select from '../Select'
import SelectAddress from '../SelectAddress'
import { actionSubmitForm } from '../../../../store/api/actions'

export interface Props {
  el: any
}

const FormElement: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const [formValue, setFormValue] = useState([])
  const [itemsForm, setItemsForm] = useState([])

  useEffect(() => {
    const itemsForm: any = []
    for (const item of html?.formItem) {
      if (item?.formId === el?.id) {
        itemsForm.push(item)
      }
    }
    setItemsForm(itemsForm)
    const newFormValue: any = []
    itemsForm?.forEach((item: any) => {
      if (item?.type !== 'buttonForm') {
        newFormValue.push({
          name: item?.dataName || '',
          value: '',
        })
      }
    })
    setFormValue(newFormValue)
  }, [el, html])

  const onChange = (value: string, name: string) => {
    const newFormValue: any = formValue?.map((item: any) => {
      if (item?.name === name) {
        return {
          name,
          value,
        }
      }
      return item
    })
    setFormValue(newFormValue)
  }

  const onClick = async () => {
    const res: any = await dispatch(actionSubmitForm({
      site: '1',
      data: {
        data: formValue,
      },
    }))
    if (res) {
      swal({
        title: 'Cảm ơn bạn đã gửi thông tin!',
        icon: 'success',
      })
    }
  }

  const renderElement = (item: any, idx: number) => {
    switch (item.tag) {
      case 'input':
        return (
          <Input item={item} key={idx} onChange={onChange} />
        )
      case 'button':
        return (
          <Button item={item} key={idx} onClick={onClick} />
        )
      case 'radio':
        return (
          <RadioButton item={item} key={idx} onChange={onChange} />
        )
      case 'checkbox':
        return (
          <Checkbox item={item} key={idx} onChange={onChange} />
        )
      case 'select':
        return (
          <Select item={item} key={idx} onChange={onChange} />
        )
      case 'selectAddress':
        return (
          <SelectAddress item={item} key={idx} onChange={onChange} />
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
