import React from 'react'
import type { FC } from 'react'
import { Button, Divider, Form, Input, Card, Select } from 'antd'
import { connect, FormattedMessage } from 'umi'

const { Option } = Select

type Props = {
}

const General: FC<Props> = () => {

  const [form] = Form.useForm()
  return (
    <Card>
      <Form form={form}
        layout="vertical"
        initialValues={{
          name: 'Usopp',
          timezone: '+7',
          currency: 'vnd',
        }}
        >
        <Form.Item
          name="name"
          label={<FormattedMessage id="settings.general.storeName" />}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="form.formItem.required.message" />,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="timezone"
          label={<FormattedMessage id="settings.general.timezone" />}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="form.formItem.required.message" />,
            },
          ]}
        >
          <Select>
            <Option value="+7">UTC+07:00</Option>
            <Option value="+8">UTC+08:00</Option>
            <Option value="+9">UTC+09:00</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="currency"
          label={<FormattedMessage id="settings.general.currency" />}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="form.formItem.required.message" />,
            },
          ]}
        >
          <Select>
            <Option value="vnd">VNĐ</Option>
            <Option value="usd">USD</Option>
            <Option value="eur">EUR</Option>
          </Select>
        </Form.Item>
        <Divider />
        <Form.Item className="mb--0">
          <Button htmlType="submit"
            type="primary">
            <FormattedMessage
              id='button.update'
              />
          </Button>
        </Form.Item>
      </Form>
    </Card>

  )
}

export default connect()(General)
