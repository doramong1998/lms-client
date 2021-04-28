import type { FC } from 'react'
import { Badge, Button, DatePicker, Divider, Form, Input, Modal, Select, Space } from 'antd'
import { connect, Dispatch } from 'umi'
import { FormattedMessage, useIntl } from 'umi'
import { CloseOutlined } from '@ant-design/icons'
import moment from 'moment'
import { CalendarT } from '../../data'

const { Option } = Select

type Props = {
  dispatch: Dispatch
  isVisibleModal: boolean
  setIsVisibleModal: any
}

const ModalCreateOrEdit: FC<Props> = ({
  dispatch,
  isVisibleModal,
  setIsVisibleModal,
}) => {
  const { formatMessage } = useIntl()
  const [form] = Form.useForm()

  const handleFinish = (values: any) => {
    dispatch({
      type: 'calendar/createCalendar',
      payload: {
        data: {
          name: values?.content,
          type: values?.type,
          time: moment(values?.date).unix(),
          status: true
        }
      }
    }).then((res: any) => {
      form.resetFields()
      setIsVisibleModal(false)
    })
   
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
    calendar,
    loading,
  }: {
    calendar: CalendarT
    loading: {
      effects: Record<string, boolean>
    }
  }) => ({
    dataTable: calendar.dataCalendar,
    creating: loading.effects['calendar/createCalendar'],
  }),
)(ModalCreateOrEdit)
