/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import type { FC } from "react";
import { Row, Col, Divider, Table, Menu, Badge, Button, Dropdown, Space, Avatar } from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage, history } from "umi";
import ModalAdd from "./ModalAdd";
import type { ClassT } from "../../data";
import { modalConfirmDelete } from "@/utils/utils";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  EyeOutlined
} from "@ant-design/icons";

type Props = {
  dispatch: Dispatch;
  dataTable: any;
  loadingGet: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
};

const ListNew: FC<Props> = ({
  dispatch,
  dataTable,
  loadingCreate,
  loadingDelete,
  loadingGet,
  loadingUpdate,
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    dispatch({
      type: "classManageAndDetail/getDetailClass",
      payload: {
        id: history.location.pathname.replace('/class-manage/','')
      }
    });
    dispatch({
      type: "classManageAndDetail/getListTeacher",
    });
  }, [dispatch]);

  useEffect(() => {
    if (loadingGet === true) {
      setLoading(true);
    }
    if (loadingGet === false) {
      setLoading(false);
    }
  }, [loadingGet, dispatch]);

  useEffect(() => {
    if (
      loadingCreate === true ||
      loadingDelete === true ||
      loadingUpdate === true
    ) {
      setLoading(true);
    }
    if (
      loadingCreate === false ||
      loadingDelete === false ||
      loadingUpdate === false
    ) {
      setSelectedRowKeys([]);
      dispatch({
        type: "classManageAndDetail/getListClass",
      });
      setLoading(false);
    }
  }, [loadingCreate, dispatch, loadingDelete, loadingUpdate]);

  const dataSource =
    dataTable?.data?.students?.map((item: any) => ({
      id: item?.id,
      fullName: item?.fullName,
      avatar: item?.avatar,
      address: item?.address,
      dob: item.dob,
      email: item.email,
      gender: item?.gender,
      status: item?.status,
      phone: item?.phone,
      studentId: item?.studentId,
    })) || [];

  const rowSelection = {
    onChange: (values: any) => {
      setSelectedRowKeys(values);
    },
  };

  const onDeleteOne = (id: any) => {
    const onOk = () =>
      dispatch({
        type: "classManageAndDetail/deleteClass",
        payload: {
          data: {
            id
          },
        },
      });
    modalConfirmDelete(onOk);
  };

  const columns: any = [
    {
      title: "STT",
      dataIndex: "STT",
      fixed: "left",
      align:'center',
      width: 70,
      render: (value: any, item: any, index: number) => index + 1,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      align:'center',
      width: 150,
      render: (value: any) => <Avatar size={50} src={value} />
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      width: 150,
    },
    {
      title: "Mã sinh viên",
      dataIndex: "studentId",
      align:'center',
      width: 120,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      align:'center',
      width: 120,
      render: (value: any) => value === 'male' ? 'Nam' : 'Nữ'
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      align:'center',
      width: 120,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      align:'center',
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 160,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value: any) => (
        <Badge
          status={value ? "success" : "default"}
          text={value ? "Hoạt động" : "Khóa"}
        />
      ),
    },
    {
      title: "Hành động",
      dataIndex: "",
      align:'center',
      fixed: "right",
      width: 120,
      render: (value: any, record: any) => {
        const menu = (
          <Menu>
             <Menu.Item
              icon={<EyeOutlined />}
            >
              Xem điểm
            </Menu.Item>
            <Menu.Item
              icon={<EditOutlined />}
              onClick={() => { setIsVisibleModal(true); setData(record)}}
            >
              Cập nhật
            </Menu.Item>
            <Menu.Item
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDeleteOne(record.id)}
            >
              Xóa
            </Menu.Item>
          </Menu>
        );
        return (
          <Row>
            <Col span={24}>
              <Dropdown overlay={menu}>
                <Button type="text">
                  <MoreOutlined />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <>
      <div className="layout--main__title">
        Chi tiết lớp {dataTable?.data?.name}
      </div>
      <Divider />
      <Row gutter={12} className='mb--5'>
        <Col span={12} className='font-size--20 font-weight--500'>Thông tin chung:</Col>
        <Col span={12}>
          <Space className="w--full justify-content--flexEnd">
            <Button type='default' icon={<EditOutlined/>}>Sửa</Button>
          </Space>
        </Col>
      </Row>
        <Row gutter={12}>
          <Col span={8} lg={4} className='font-weight--500'>Quản lý lớp:</Col>
          <Col span={16} lg={20}>{dataTable?.data?.teacher?.fullName}</Col>
        </Row>
        <Row gutter={12}>
        <Col span={8} lg={4} className='font-weight--500'>Số điện thoại:</Col>
          <Col span={16} lg={20}>{dataTable?.data?.teacher?.phone}</Col>
        </Row>
        <Row>
        <Col span={8} lg={4} className='font-weight--500'>Email:</Col>
          <Col span={16} lg={20}>{dataTable?.data?.teacher?.email}</Col>
        </Row>
        <Row>
        <Col span={8} lg={4} className='font-weight--500'>Tổng số sinh viên:</Col>
          <Col span={16} lg={20}>{dataTable?.data?.students.length}</Col>
        </Row>
      <Divider />
      <Row gutter={24} className="mb--24">
        <Col md={12}></Col>
        <Col md={12}>
          <Space className="w--full justify-content--flexEnd">
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

      <Table
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          ...rowSelection,
        }}
        rowKey={(item: any) => item.id}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        scroll={{x: 1500}}
        style={{width: 1183}}
      ></Table>

      <ModalAdd
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={() => setIsVisibleModal(false) }
        dataClass={dataTable}
      />
    </>
  );
};

export default connect(
  ({
    classManageAndDetail,
    loading,
  }: {
    classManageAndDetail: ClassT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dataTable: classManageAndDetail.detailClass,
    loadingGet: loading.effects["classManageAndDetail/getListClass"],
    loadingCreate: loading.effects["classManageAndDetail/createClass"],
    loadingUpdate: loading.effects["classManageAndDetail/updateClass"],
    loadingDelete: loading.effects["classManageAndDetail/deleteClass"],
  })
)(ListNew);
