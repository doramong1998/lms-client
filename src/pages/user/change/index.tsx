import React, { useState } from 'react'
import type { FC } from 'react'
import { Alert, Button, Form, Input } from 'antd'
import type { Dispatch } from 'umi'
import { FormattedMessage, useIntl, history, connect } from 'umi'
import { LockOutlined } from '@ant-design/icons'
import styles from './style.less'
import type { UserAndChange } from './data'

type Props = {
  dispatch: Dispatch
  loading?: boolean
}

const Change: FC<Props> = ({ dispatch, loading }) => {
  const { formatMessage } = useIntl()

  const [confirmPassError, setConfirmPassError] = useState(false)

  const handleSubmit = (values: any) => {
    if (values.newPassword.trim() !== values.confirmPassword.trim()) {
      setConfirmPassError(true)
      return
    }
    dispatch({
      type: 'userAndChange/change',
      payload: {
        data: {
          ...values,
          resetToken: history.location.query?.token,
        },
      },
    })
  }

  return (
    <div className={styles.main}>
      <Form
        layout="vertical"
        initialValues={{ newPassword: '123123', confirmPassword: '123123' }}
        onFinish={handleSubmit}
      >
        <>
          {confirmPassError && (
            <Alert
              style={{
                marginBottom: 24,
              }}
              message={formatMessage({ id: 'change.confirmPassword.error' })}
              type="error"
              showIcon
            />
          )}
        </>
        <Form.Item
          label={formatMessage({ id: 'change.newPassword' })}
          name="newPassword"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.formItem.required.message' }),
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item
          label={formatMessage({ id: 'change.confirmPassword' })}
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.formItem.required.message' }),
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <div>
            <a
              style={{
                float: 'right',
              }}
              onClick={(e) => {
                e.preventDefault()
                history.push('/user/login')
              }}
            >
              <FormattedMessage id="change.backToLogin" />
            </a>
          </div>
        </Form.Item>
        <Form.Item>
          <Button className="w--full"
            loading={loading}
            type="primary"
            htmlType="submit">
            <FormattedMessage id="button.send" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect(
  ({
    userAndChange,
    loading,
  }: {
    userAndChange: UserAndChange
    loading: {
      effects: Record<string, boolean>
    }
  }) => ({
    userAndChange,
    loading: loading.effects['userAndChange/change'],
  }),
)(Change)
