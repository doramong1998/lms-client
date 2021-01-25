import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Button, Divider, Form, Input, Modal, Space } from 'antd'
import type { Dispatch } from 'umi'
import { connect, FormattedMessage, useIntl } from 'umi'
import { CloseOutlined } from '@ant-design/icons'
import { BUILDER_URL } from '@/utils/utils'
import type { LandingPageT, LandingPageCreated } from '../../data'
import type { UserAndLogin } from '@/pages/user/login/data'

type Props = {
  dispatch: Dispatch
  isVisibleModal: boolean
  userAndLogin: UserAndLogin
  dataCreate: LandingPageCreated
  setIsVisibleModal: (data: boolean) => void
}

const ModalCreateOrEdit: FC<Props> = ({
  dispatch,
  dataCreate,
  isVisibleModal,
  userAndLogin,
  setIsVisibleModal,
}) => {
  const { formatMessage } = useIntl()
  const [form] = Form.useForm()
  const [creating, setCreating] = useState(false)
  useEffect(() => {
    if (dataCreate && dataCreate?.data && creating) {
      window.open(`${BUILDER_URL}/builder/${dataCreate?.data?.ldpId}?access_token=${userAndLogin?.accessToken}`)
      setIsVisibleModal(false)
      setCreating(false)
      form.setFieldsValue({ title: '' })
    }
  }, [dataCreate, creating, userAndLogin?.accessToken, setIsVisibleModal, form])
  const handleFinish = (values: any) => {
    dispatch({
      type: 'landingPages/createLandingPage',
      payload: {
        data: {
          ...values,
        },
      },
    })
    setCreating(true)
  }

  return (
    <Modal
      title={formatMessage({
        id:'button.create',
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
          name="title"
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
    landingPages,
    userAndLogin,
  }: {
    landingPages: LandingPageT
    userAndLogin: UserAndLogin
    loading: {
      effects: Record<string, boolean>
    }
  }) => ({
    dataCreate: landingPages.landingPageCreated,
    userAndLogin,
  }),
)(ModalCreateOrEdit)
