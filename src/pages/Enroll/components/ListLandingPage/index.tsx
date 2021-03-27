/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import {
  Row,
  Col,
  Spin,
  Button,
  Form,
  Input,
  Space,
  Divider,
  Calendar,
  Badge,
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
}

const ListNew: FC<Props> = ({
  dispatch,
  dataTable,
  userAndLogin,
}) => {
  const { formatMessage } = useIntl()
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [calendarData, setCalendarData] = useState<any>([
    {
      key: "001",
      date: '02/02/2021',
      data: [
        { type: 'error', content: 'Họp nội bộ' },
      ]
    },
    {
      key: "002",
      date: '08/02/2021',
      data: [
        { type: 'warning', content: 'Nghỉ làm' },
      ]
    },
    {
      key: "003",
      date: '11/02/2021',
      data: [
        { type: 'success', content: 'Ngày tất niên' },
      ]
    },
    {
      key: "004",
      date: '12/02/2021',
      data: [
        { type: 'success', content: 'Tết nguyên đán' },
      ]
    },
    {
      key: "005",
      date: '19/02/2021',
      data: [
        { type: 'warning', content: 'Đi học lại' },
        { type: 'success', content: 'Liên hoan' },
      ]
    },
  ])

  // useEffect(() => {
  //   dispatch({
  //     type: 'landingPages/getLandingPage',
  //   })
  // }, [dispatch])

  const onSearch = (values: any) => {
    let query = ''
    if (values.search !== '') {
      const listField = ['firstName', 'lastName', 'email', 'phone'].map(
        (item: string) => `${item}||$contL||${values.search}`,
      )
      query = `&${qs.stringify({ or: [...listField] }, { arrayFormat: 'repeat' })}`
    }
    // dispatch({
    //   type: 'landingPages/getLandingPage',
    //   payload: {
    //     query: `?limit=10&sort=createdAt,DESC&page=1${query}`,
    //   },
    // })
  }

  const getListData = (value: any) => {
    let listData: any = []
    calendarData?.map((item: any) => {
      if(item.date === moment(value).format('DD/MM/YYYY')){
        listData = item.data
      }
    })
    return listData
  }

  const dateCellRender = (value: any) => {
    const listData = getListData(value)
    return (
      <ul className="m--0 p--0">
        {listData.map((item: any) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }


  return (
    <>
      <div className="layout--main__title">
        <FormattedMessage id="Calendar.calendar" />
      </div>
      <Divider />
      <Row gutter={24}
        className="mb--24">
        <Col md={12}>
        </Col>
        <Col md={12}>
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
            <Spin spinning={loading}>
            <Calendar dateCellRender={dateCellRender} />
            </Spin>
          </div>
        </Col>
      </Row>
      <ModalCreate
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
        calendarData={calendarData}
        setCalendarData={setCalendarData}
      />
    </>
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
  }),
)(ListNew)
