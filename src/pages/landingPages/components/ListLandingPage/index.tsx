/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import {
  Row,
  Col,
  Table,
  Dropdown,
  Menu,
  Button,
  Form,
  Input,
  Space,
  Divider,
} from 'antd'
import type { Dispatch } from 'umi'
import { connect, FormattedMessage, useIntl } from 'umi'
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import qs from 'qs'
import moment from 'moment'
import { BUILDER_URL, modalConfirmDelete } from '@/utils/utils'
import type { LandingPageT, ListLandingPages, LandingPage } from '../../data'
import ModalCreate from './ModalCreate'
import type { UserAndLogin } from '@/pages/user/login/data'

type Props = {
  dispatch: Dispatch
  dataTable: ListLandingPages
  userAndLogin: UserAndLogin
  creating?: boolean
  editing?: boolean
  deletingOne?: boolean
  deletingMulti?: boolean
}

const ListNew: FC<Props> = ({
  dispatch,
  dataTable,
  userAndLogin,
  creating,
  editing,
  deletingOne,
  deletingMulti,
}) => {
  const { formatMessage } = useIntl()
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch({
      type: 'landingPages/getLandingPage',
    })
  }, [dispatch])



  useEffect(() => {
    if (deletingOne === true || deletingMulti === true) {
      setLoading(true)
    }
    if (deletingOne === false || deletingMulti === false) {
      setPage(1)
      setSelectedRowKeys([])
      dispatch({
        type: 'landingPages/getLandingPage',
      })
      setLoading(false)
    }
  }, [deletingOne, deletingMulti, dispatch])

  useEffect(() => {
    if (creating === true || editing === true) {
      setLoading(true)
    }
    if (creating === false || editing === false) {
      dispatch({
        type: 'landingPages/getLandingPage',
      })
      setLoading(false)
    }
  }, [creating, dispatch, editing])

  const onChangeSelectRow = (values: any) => {
    setSelectedRowKeys(values)
  }

  const onChangePagination = (value: number) => {
    setPage(value)
    setSelectedRowKeys([])
    // dispatch({
    //   type: 'landingPages/getLandingPage',
    // })
  }

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
      type: 'landingPages/getLandingPage',
      payload: {
        query: `?limit=10&sort=createdAt,DESC&page=1${query}`,
      },
    })
  }

  const onDeleteMulti = () => {
    const query = `?${qs.stringify({ id: [...selectedRowKeys] }, { arrayFormat: 'repeat' })}`
    const onOk = () => {
      dispatch({
        type: 'news/deleteMultiMember',
        payload: {
          query,
        },
      })
    }
    modalConfirmDelete(onOk)
  }

  const onDeleteOne = (id: string) => {
    const onOk = () => {
      dispatch({
        type: 'news/deleteOneMember',
        payload: {
          id,
        },
      })
    }
    modalConfirmDelete(onOk)
  }

  const dataSource =
    dataTable?.data?.map((item: LandingPage) => ({
      id: item._id,
      title: item.title !== '' ? item.title : <FormattedMessage id="landingPages.table.noTitle" />,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      url: item?.url,
      expired: item.expired,
      user: item.user,
      status: item.status,
      visitor: item?.visitor || 0,
      convert: item?.convert || 0,
      percentConvert: item?.percentConvert || 0,
      revenue: item?.revenue || 0,
    })) || []

  const columns: any = [
    {
      title: formatMessage({ id: 'common.information' }),
      dataIndex: 'information',
      key: 'information',
      render: (_value: string, record: any) => (
        <div>
          <b>{record.title}</b>
          <a href={record.url} target='_blank' rel='noreferrer'>{record.url}</a>
          <p><FormattedMessage id="common.updatedAt" />: {moment(record.updatedAt).format('HH:MM DD-MM-YYYY')}</p>
        </div>
      ),
    },
    {
      title: formatMessage({ id: 'landingPages.table.visitor' }),
      dataIndex: 'visitor',
      key: 'visitor',
      sorter: (a: any, b: any) => a.visitor > b.visitor,
    },
    {
      title: formatMessage({ id: 'landingPages.table.convert' }),
      dataIndex: 'convert',
      key: 'convert',
      sorter: (a: any, b: any) => a.convert > b.convert,
    },
    {
      title: formatMessage({ id: 'landingPages.table.percentConvert' }),
      dataIndex: 'percentConvert',
      key: 'percentConvert',
      sorter: (a: any, b: any) => a.percentConvert > b.percentConvert,
    },
    {
      title: formatMessage({ id: 'landingPages.table.revenue' }),
      dataIndex: 'revenue',
      key: 'revenue',
      sorter: (a: any, b: any) => a.revenue > b.revenue,
      render: (_value: number) => `${_value}đ`,
    },
    {
      title: formatMessage({ id: 'common.action' }),
      key: 'action',
      render: (_value: string, record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                onClick={() => {
                  window.open(`${BUILDER_URL}/builder/${record?.id}?access_token=${userAndLogin?.accessToken}`)
                }}
              >
                <EditOutlined className="mr--5" />
                <FormattedMessage id="common.edit" />
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item onClick={() => onDeleteOne(record.key)}
                danger>
                <DeleteOutlined className="mr--5" />
                <FormattedMessage id="common.delete" />
              </Menu.Item>
            </Menu>
          }
        >
          <Button size="small">
            <MoreOutlined />
          </Button>
        </Dropdown>
      ),
      width: 100,
      fixed: 'right',
      align: 'center',
    },
  ]

  return (
    <>
      <div className="layout--main__title">
        <FormattedMessage id="landingPages.listLandingPage" />
      </div>
      <Divider />
      <Row gutter={24}
        className="mb--24">
        <Col md={12}
          xs={24}>
          {selectedRowKeys.length !== 0 && (
            <Button danger
              onClick={onDeleteMulti}>
              <DeleteOutlined className="mr--5" />
              <FormattedMessage
                id="button.delete.selected"
                values={{ count: selectedRowKeys.length }}
              />
            </Button>
          )}
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
      <Row gutter={24}>
        <Col span={24}>
          <div className="layout--table">
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: onChangeSelectRow,
                fixed: true,
              }}
              scroll={{
                x: true,
              }}
              pagination={{
                position: ['bottomCenter'],
                showSizeChanger: false,
                // total: dataTable?.data?.total,
                onChange: (value: number) => onChangePagination(value),
                current: page,
              }}
              rowKey={(el) => el.id || ''}
              dataSource={dataSource}
              columns={columns}
              loading={loading}
            />
          </div>
        </Col>
      </Row>
      <ModalCreate
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />
    </>
  )
}

export default connect(
  ({
    landingPages,
    userAndLogin,
    loading,
  }: {
    landingPages: LandingPageT
    userAndLogin: UserAndLogin
    loading: {
      effects: Record<string, boolean>
    }
  }) => ({
    userAndLogin,
    dataTable: landingPages.listLandingPage,
    creating: loading.effects['landingPages/createLandingPage'],
    editing: loading.effects['landingPages/editLandingPage'],
    deletingOne: loading.effects['landingPages/deleteLandingPage'],
    deletingMulti: loading.effects['landingPages/deleteMultiLandingPage'],
  }),
)(ListNew)
