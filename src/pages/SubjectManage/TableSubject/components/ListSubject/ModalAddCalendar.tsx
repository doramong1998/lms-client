import type { FC } from 'react'
import { Badge, Button, DatePicker, Divider, Form, Input, Modal, Select, Space } from 'antd'
import { connect } from 'umi'
import { FormattedMessage, useIntl } from 'umi'
import { CloseOutlined } from '@ant-design/icons'
import moment from 'moment'

const { Option } = Select

type Props = {
  isVisibleModal: boolean
  setIsVisibleModal: any
  setCalendar: any
}

const ModalCreateOrEdit: FC<Props> = ({
  isVisibleModal,
  setIsVisibleModal,
  setCalendar
}) => {
  const { formatMessage } = useIntl()
  const [form] = Form.useForm()

  const handleFinish = (values: any) => {
    setCalendar({
      shift: values?.shift,
      type: values?.type,
      time: moment(values?.date).unix(),
      content: values?.content
    })
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
          initialValue='success'
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
          name="shift"
          label='Ca học'
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.formItem.required.message' }),
            },
          ]}
        >
          <Select placeholder='Chọn ca học' className='w--full'>
            <Option value="(7h - 9h)">Ca 1 (7h - 9h)</Option>
            <Option value="(9h15 - 12h15)">Ca 2 (9h15 - 12h15)</Option>
            <Option value="(13h - 15h)">Ca 3 (13h - 15h)</Option>
            <Option value="(15h15 - 17h15)">Ca 4 (15h15 - 17h15)</Option>
            <Option value="(18h - 21h)">Ca 5 (18h - 21h)</Option>
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

export default connect()(ModalCreateOrEdit)
