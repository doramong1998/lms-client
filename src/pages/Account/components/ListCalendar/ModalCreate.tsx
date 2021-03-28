import React, {  } from 'react'
import type { FC } from 'react'
import { Badge, Button, DatePicker, Divider, Form, Input, Modal, Select, Space } from 'antd'
import type { Dispatch } from 'umi'
import { connect, FormattedMessage, useIntl } from 'umi'
import { CloseOutlined } from '@ant-design/icons'
import type { UserAndLogin } from '@/pages/user/login/data'

const { Option } = Select

type Props = {
  dispatch: Dispatch
  calendarData: any
  setCalendarData: any
  isVisibleModal: boolean
  setIsVisibleModal: any
}

const ModalCreateOrEdit: FC<Props> = ({
  calendarData,
  setCalendarData,
  isVisibleModal,
  setIsVisibleModal,
}) => {
  const { formatMessage } = useIntl()
  const [form] = Form.useForm()

  const handleFinish = (values: any) => {
    let newData = []
    let value = calendarData.find((item: any) => item.date === values?.date?.format('DD/MM/YYYY'))
    if (value) {
      value.data.push({
        type: values.type,
        content: values.content
      })
      newData = calendarData?.map((item: any) => {
        if (item.date === values.date.format('DD/MM/YYYY')) {
          return value
        }
        return item
      }) || []
    } else {
      const newValue = {
        date: values?.date?.format('DD/MM/YYYY'),
        data: [{
          type: values.type,
          content: values.content
        }]
      }
      newData = [...calendarData, newValue]
    }
    setCalendarData(newData)
    form.resetFields()
    setIsVisibleModal(false)
  }

  return (
    <Modal
      title={formatMessage({
        id: 'button.create',
      })}
      visible={isVisibleModal}
      footer={null}
      closeIcon={<CloseOutlined onClick={() => setIsVisibleModal(false)} />}
      centered
    >
      <Form form={form}
        layout="vertical"
        onFinish={handleFinish}>
        <Form.Item
          name="date"
          label={formatMessage({ id: 'common.date' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.formItem.required.message' }),
            },
          ]}
        >
          <DatePicker className='w--full' format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          name="type"
          label={formatMessage({ id: 'common.type' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.formItem.required.message' }),
            },
          ]}
        >
          <Select placeholder='Chọn loại' className='w--full'>
            <Option value="success"><Badge status="success" /> Success</Option>
            <Option value="error"> <Badge status="error" /> Error</Option>
            <Option value="default"><Badge status="default" /> Default</Option>
            <Option value="processing"><Badge status="processing" /> Processing</Option>
            <Option value="warning"><Badge status="warning" /> Warning</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="content"
          label={formatMessage({ id: 'common.title' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.formItem.required.message' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item className="mb--0">
          <Space className="w--full justify-content--flexEnd">
            <Button onClick={() => setIsVisibleModal(false)}>
              <FormattedMessage id="button.cancel" />
            </Button>
            <Button htmlType="submit"
              type="primary">
              <FormattedMessage
                id='button.create'
              />
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default connect(
  ({
    userAndLogin,
  }: {
    userAndLogin: UserAndLogin
    loading: {
      effects: Record<string, boolean>
    }
  }) => ({
    userAndLogin,
  }),
)(ModalCreateOrEdit)
