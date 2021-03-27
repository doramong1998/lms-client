import { useEffect } from 'react'
import type { FC } from 'react'
import { Alert, Button, Form, Input, notification } from 'antd'
import type { Dispatch } from 'umi'
import { connect, FormattedMessage, useIntl, setLocale } from 'umi'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import type { UserAndLogin } from './data'
import styles from './style.less'

type Props = {
  dispatch: Dispatch
  userAndLogin: UserAndLogin
  loading?: boolean
}

const Login: FC<Props> = ({ dispatch, userAndLogin = {}, loading }) => {
  const { formatMessage } = useIntl()
  const { status } = userAndLogin

  useEffect(() => {
    if (!localStorage.getItem('umi_locale')) {
      setLocale('vi-VN', false)
    }
  }, [])

  const handleSubmit = (values: any) => {
    notification.destroy()
    dispatch({
      type: 'userAndLogin/login',
      payload: {
        data: {
          ...values,
        },
      },
    })
  }

  return (
    <div className={styles.main}>
      <Form
        layout="vertical"
        initialValues={{ appId: '226518af-5817-4db6-843b-080c3ba48db9' }}
        onFinish={handleSubmit}
      >
        <>
          {!status && !loading && (
          <Alert
            style={{
              marginBottom: 24,
            }}
            message={formatMessage({ id: 'login.error' })}
            type="error"
            showIcon
            />
          )}
        </>
        <Form.Item
          label={formatMessage({ id: 'login.email' })}
          name="email"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.formItem.required.message' }),
            },
            {
              type:'email',
              message: formatMessage({ id: 'form.formItem.required.email' }),
            },
          ]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          label={formatMessage({ id: 'login.password' })}
          name="password"
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
    userAndLogin,
    loading,
  }: {
    userAndLogin: UserAndLogin
    loading: {
      effects: Record<string, boolean>
    }
  }) => ({
    userAndLogin,
    loading: loading.effects['userAndLogin/login'],
  }),
)(Login)
