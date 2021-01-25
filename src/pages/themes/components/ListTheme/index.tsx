/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Space,
  Divider,
  Card,
  Radio,
} from 'antd'
import type { Dispatch } from 'umi'
import { connect, FormattedMessage, useIntl } from 'umi'
import {
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import qs from 'qs'
import type { ThemeT, ListThemes, Theme, ListTabs, Tab } from '../../data'
import type { UserAndLogin } from '@/pages/user/login/data'
import Meta from 'antd/lib/card/Meta'

type Props = {
  dispatch: Dispatch
  dataTheme: ListThemes
  dataTab: ListTabs
  userAndLogin: UserAndLogin
}

const ListNew: FC<Props> = ({
  dispatch,
  dataTheme,
  dataTab,
}) => {
  const { formatMessage } = useIntl()
  const [, setIsVisibleModal] = useState(false)
  const [, setSelectedRowKeys] = useState([])
  const [, setPage] = useState(1)

  useEffect(() => {
    dispatch({
      type: 'themes/getThemes',
    })
    dispatch({
      type: 'themes/getTabs',
    })
  }, [dispatch])

  const dataSourceTheme =
  dataTheme?.data?.map((item: Theme) => ({
    id: item._id,
    title: item.title,
    url: item.url,
    image: item.image,
  })) || []

  const dataSourceTab =
  dataTab?.data?.map((item: Tab) => ({
    id: item._id,
    title: item.title,
    value: item.value,
  })) || []

  const onSearch = (values: any) => {
    setPage(1)
    setSelectedRowKeys([])
    let query = ''

    if (values.search !== '') {
      const listField = ['firstName', 'lastName', 'email', 'phone'].map(
        (item: string) => `${item}||$contL||${values.search}`,
      )
      query = `&${qs.stringify({ or: [...listField] }, { arrayFormat: 'repeat' })}`
    }
    dispatch({
      type: 'themes/getThemes',
      payload: {
        query: `?limit=10&sort=createdAt,DESC&page=1${query}`,
      },
    })
  }

  return (
    <>
      <div className="layout--main__title">
        <FormattedMessage id="themes.listThemes" />
      </div>
      <Divider />
      <Row gutter={24}
        className="mb--24">
        <Col md={12}
          xs={24}>
        </Col>
        <Col md={12}
          xs={24}>
          <Space className="w--full justify-content--flexEnd">
            <Form initialValues={{ search: '' }}
              onFinish={onSearch}>
              <Form.Item name="search"
                className="mb--0">
                <Space size={2}>
                  <Input className="w--200"
                    placeholder={formatMessage({ id: 'common.search' })} />
                  <Button htmlType="submit">
                    <SearchOutlined />
                  </Button>
                </Space>
              </Form.Item>
            </Form>
            <Button
              type="primary"
              onClick={() => {
                setIsVisibleModal(true)
              }}
            >
              <PlusOutlined className="mr--5" />
              <FormattedMessage id="button.create" />
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={8} lg={5}>
          <Card title={formatMessage({ id: 'themes.theme' })}>
            <Radio.Group defaultValue='all'>
              <Radio.Button value='all' className='m--5'>Tất cả</Radio.Button>
              {dataSourceTab?.map((item: Tab) => {
                return <Radio.Button key={item._id} value={item.value} className='m--5'>{item.title}</Radio.Button>
              })}
            </Radio.Group>
          </Card>
        </Col>
        <Col span={16} lg={19}>
          <Card bodyStyle={{ padding: '10px' }}>
            <Row>
              {dataSourceTheme?.map((item: Theme) => {
                return <Col key={item._id} span={6}>
                  <Card
                    className='m--5'
                    bodyStyle={{ padding: '10px' }}
                    cover={
                      <img
                        alt="image"
                        src={item.image}
     />
   }
                    actions={[
                      <EditOutlined key="edit" />,
                      <EyeOutlined key="preview" />,
                    ]}
 >
                    <Meta
                      title={item.title}
                      className='text-align--center'
   />
                  </Card>

                </Col>
              })}
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default connect(
  ({
    themes,
    userAndLogin,
  }: {
    themes: ThemeT
    userAndLogin: UserAndLogin
    loading: {
      effects: Record<string, boolean>
    }
  }) => ({
    userAndLogin,
    dataTheme: themes.listTheme,
    dataTab: themes.listTab,
  }),
)(ListNew)
