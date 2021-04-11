/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import type { FC } from "react";
import {
  Row,
  Col,
  Divider,
  Table,
  Menu,
  Badge,
  Button,
  Dropdown,
  Space,
} from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage, history } from "umi";
import ModalAdd from "./ModalAdd";
import type { SubjectT } from "../../data";
import { modalConfirmDelete } from "@/utils/utils";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import ModalTeacher from "./ModalTeacher";
import ModalUpdatePoint from "./ModalUpdatePoint";
import ModalAttend from "./ModalAttend";

type Props = {
  dispatch: Dispatch;
  dataTable: any;
  loadingGet: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  loadingUpdatePoint: boolean;
};

const ListNew: FC<Props> = ({
  dispatch,
  dataTable,
  loadingCreate,
  loadingDelete,
  loadingGet,
  loadingUpdate,
  loadingUpdatePoint
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isVisibleTeacher, setIsVisibleTeacher] = useState(false);
  const [isVisiblePoint, setIsVisiblePoint] = useState(false);
  const [isVisibleAttend, setIsVisibleAttend] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    dispatch({
      type: "subjectManageAndDetail/getDetailSubject",
      payload: {
        id: history.location.pathname.replace("/subject-manage/", ""),
      },
    });
    dispatch({
      type: "subjectManageAndDetail/getListTeacher",
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
      loadingUpdate === true || 
      loadingUpdatePoint === true
    ) {
      setLoading(true);
    }
    if (
      loadingCreate === false ||
      loadingDelete === false ||
      loadingUpdate === false ||
      loadingUpdatePoint === false
    ) {
      setSelectedRowKeys([]);
      dispatch({
        type: "subjectManageAndDetail/getDetailSubject",
        payload: {
          id: history.location.pathname.replace("/subject-manage/", ""),
        },
      });
      setLoading(false);
    }
  }, [loadingCreate, dispatch, loadingDelete, loadingUpdate,loadingUpdatePoint]);

  const dataSource =
    dataTable?.data?.students?.map((item: any) => ({
      id: item?.id,
      fullName: item?.fullName,
      avatar: item?.avatar,
      address: item?.address,
      dob: item?.dob,
      idUser: item?.idUser,
      email: item?.email,
      point: item?.point,
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

  const onDeleteOne = (idUser: any) => {
    const onOk = () =>
      dispatch({
        type: "subjectManageAndDetail/deleteStudentFromSubject",
        payload: {
          data: {
            idUser,
            idSubject: dataTable?.data?.idSubject
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
      align: "center",
      width: 70,
      render: (value: any, item: any, index: number) => index + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      width: 200,
    },
    {
      title: "Mã sinh viên",
      dataIndex: "studentId",
      align: "center",
      width: 180,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      align: "center",
      width: 120,
      render: (value: any) => (value === "male" ? "Nam" : "Nữ"),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      align: "center",
      width: 120,
    },
    {
      title: "Điểm danh",
      dataIndex: "point",
      align: "center",
      render: (value: any) => value?.pointDiligence || 'Chưa có điểm',
    },
    {
      title: "Điểm giữa kì",
      dataIndex: "point",
      align: "center",
      render: (value: any) => value?.pointMidTerm || 'Chưa có điểm',
    },
    {
      title: "Điểm cuối kì",
      dataIndex: "point",
      align: "center",
      render: (value: any) => value?.pointEndTerm || 'Chưa có điểm',
    },
    {
      title: "Trung bình",
      dataIndex: "point",
      align: "center",
      render: (value: any) => <b>{(value?.pointDiligence && value?.pointEndTerm && value?.pointMidTerm) ?
        Math.round((value?.pointDiligence*0.3 + (value?.pointEndTerm*0.3 + value?.pointMidTerm*0.7)*0.7)*100)/100 : 'Chưa có điểm'}</b> ,
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
      align: "center",
      fixed: "right",
      width: 120,
      render: (value: any, record: any) => {
        const menu = (
          <Menu>
            <Menu.Item
              icon={<EditOutlined />}
              onClick={() => {
                setIsVisiblePoint(true);
                setData(record);
              }}
            >
              Cập nhật
            </Menu.Item>
            <Menu.Item
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDeleteOne(value.idUser)}
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
        Chi tiết môn học: {dataTable?.data?.name}
      </div>
      <Divider />
      <Row gutter={12} className="mb--5">
        <Col span={12} className="font-size--20 font-weight--500">
          Thông tin chung:
        </Col>
        <Col span={12}>
          <Space className="w--full justify-content--flexEnd">
            <Button
              type="default"
              onClick={() => setIsVisibleTeacher(true)}
              icon={<EditOutlined />}
            >
              Sửa
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={8} lg={4} className="font-weight--500">
          Mã môn học:
        </Col>
        <Col span={16} lg={20}>
          {dataTable?.data?.code}
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={8} lg={4} className="font-weight--500">
          Quản lý lớp:
        </Col>
        <Col span={16} lg={20}>
          {dataTable?.data?.teacher?.fullName}
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={8} lg={4} className="font-weight--500">
          Số điện thoại:
        </Col>
        <Col span={16} lg={20}>
          {dataTable?.data?.teacher?.phone}
        </Col>
      </Row>
      <Row>
        <Col span={8} lg={4} className="font-weight--500">
          Email:
        </Col>
        <Col span={16} lg={20}>
          {dataTable?.data?.teacher?.email}
        </Col>
      </Row>
      <Row>
        <Col span={8} lg={4} className="font-weight--500">
          Tổng số sinh viên:
        </Col>
        <Col span={16} lg={20}>
          {dataTable?.data?.students.length}
        </Col>
      </Row>
      <Divider />
      <Row gutter={24} className="mb--24">
        <Col md={12}></Col>
        <Col md={12}>
          <Space className="w--full justify-content--flexEnd">
          <Button
              type="default"
              onClick={() => {
                setIsVisibleAttend(true);
              }}
            >
              <CheckCircleOutlined className="mr--2" />Điểm danh
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setIsVisibleModal(true);
              }}
            >
              <PlusOutlined className="mr--2" />
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
        scroll={{ x: 1500 }}
        style={{ width: 1183 }}
      ></Table>

      <ModalAdd
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={() => setIsVisibleModal(false)}
        dataSubject={dataTable}
      />

      <ModalTeacher
        isVisibleModal={isVisibleTeacher}
        setIsVisibleModal={() => setIsVisibleTeacher(false)}
        dataSubject={dataTable}
      />

      <ModalUpdatePoint
        isVisibleModal={isVisiblePoint}
        setIsVisibleModal={() => setIsVisiblePoint(false)}
        data={data}
        dataTable={dataTable}
      />

      <ModalAttend
        isVisibleModal={isVisibleAttend}
        setIsVisibleModal={() => setIsVisibleAttend(false)}
        data={dataTable}
      />  
    </>
  );
};

export default connect(
  ({
    subjectManageAndDetail,
    loading,
  }: {
    subjectManageAndDetail: SubjectT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dataTable: subjectManageAndDetail.detailSubject,
    loadingGet: loading.effects["subjectManageAndDetail/getListSubject"],
    loadingCreate: loading.effects["subjectManageAndDetail/createSubject"],
    loadingUpdate: loading.effects["subjectManageAndDetail/updateSubject"],
    loadingDelete:
      loading.effects["subjectManageAndDetail/deleteStudentFromSubject"],
    loadingUpdatePoint: loading.effects["subjectManageAndDetail/updatePoint"],
  })
)(ListNew);
