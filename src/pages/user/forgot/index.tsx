import React from 'react'
import type { FC } from 'react'
import { Alert, Button, Form, Input } from 'antd'
import type { Dispatch } from 'umi'
import { connect, FormattedMessage, useIntl, history } from 'umi'
import { UserOutlined } from '@ant-design/icons'
import type { UserAndForgot } from './data'
import styles from './style.less'

type Props = {
  dispatch: Dispatch
  userAndForgot: UserAndForgot
  loading?: boolean
}

const Forgot: FC<Props> = ({ dispatch, userAndForgot, loading }) => {
  const { formatMessage } = useIntl()

  const handleSubmit = (values: any) => {
    dispatch({
      type: 'userAndForgot/forgot',
      payload: {
        data: {
          ...values,
          return_url: `${window.location.origin}/user/change`,
        },
      },
    })
  }

  return (
    <div className={styles.main}>
      <Form
        layout="vertical"
        initialValues={{ email: 'caohv.dev@gmail.com' }}
        onFinish={handleSubmit}
      >
        <>
          {!/^2/g.test(String(userAndForgot?.statusCode)) && !loading && (
            <Alert
              style={{
                marginBottom: 24,
              }}
              message={formatMessage({ id: 'forgot.error' })}
              type="error"
              showIcon
            />
          )}
        </>
        <Form.Item
          label={formatMessage({ id: 'forgot.email' })}
          name="email"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.formItem.required.message' }),
            },
          ]}
        >
          <Input prefix={<UserOutlined />} />
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
              <FormattedMessage id="forgot.backToLogin" />
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
    userAndForgot,
    loading,
  }: {
    userAndForgot: UserAndForgot
    loading: {
      effects: Record<string, boolean>
    }
  }) => ({
    userAndForgot,
    loading: loading.effects['userAndForgot/forgot'],
  }),
)(Forgot)
