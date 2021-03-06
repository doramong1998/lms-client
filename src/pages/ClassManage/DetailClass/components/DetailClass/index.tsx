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
  Avatar,
  Upload,
} from "antd";
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
  EyeOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import ModalTeacher from "./ModalTeacher";
import ModalPoint from "./ModalPoint";
import ModalXLSX from "./ModalXLSX";
// import ModalUpload from "./ModalUpload";

type Props = {
  dispatch: Dispatch;
  dataTable: any;
  loadingGet: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  loadingImport: boolean;
};

const DetailClass: FC<Props> = ({
  dispatch,
  dataTable,
  loadingCreate,
  loadingDelete,
  loadingGet,
  loadingUpdate,
  loadingImport
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isVisibleTeacher, setIsVisibleTeacher] = useState(false);
  const [isVisiblePoint, setIsVisiblePoint] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isVisibleXLSX, setIsVisibleXLSX] = useState(false);

  const [dataXLSX, setDataXLSX] = useState<any>(null);

  useEffect(() => {
    dispatch({
      type: "classManageAndDetail/getDetailClass",
      payload: {
        id: history.location.pathname.replace("/class-manage/", ""),
      },
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
      loadingUpdate === true ||
      loadingImport === true
    ) {
      setLoading(true);
    }
    if (
      loadingCreate === false ||
      loadingDelete === false ||
      loadingUpdate === false ||
      loadingImport === false
    ) {
      setSelectedRowKeys([]);
      dispatch({
        type: "classManageAndDetail/getDetailClass",
        payload: {
          id: history.location.pathname.replace("/class-manage/", ""),
        },
      });
      setLoading(false);
    }
  }, [loadingCreate, dispatch, loadingDelete, loadingUpdate, loadingImport]);

  const dataSource =
    dataTable?.data?.students?.map((item: any) => ({
      id: item?.id,
      fullName: item?.fullName,
      avatar: item?.avatar,
      address: item?.address,
      dob: item?.dob,
      idUser: item?.idUser,
      email: item?.email,
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
        type: "classManageAndDetail/deleteStudentFromClass",
        payload: {
          data: {
            idUser,
            idClass: dataTable?.data?.idClass,
          },
        },
      });
    modalConfirmDelete(onOk);
  };

  const handleUpload = (e: any) => {
    const f = e.file;
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      // evt = on_file_select event
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, {
        header: ["id", "code", "firstName", "", "", "lastName", "", "class"],
        range: 11,
      });
      let newData = data?.filter((item: any) => item?.code)
      setDataXLSX(newData);
      setIsVisibleXLSX(true)
    };
    reader.readAsBinaryString(f);
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
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      align: "center",
      width: 150,
      render: (value: any) => <Avatar size={50} src={value} />,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      width: 180,
    },
    {
      title: "Mã sinh viên",
      dataIndex: "studentId",
      align: "center",
      width: 120,
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
      title: "Số điện thoại",
      dataIndex: "phone",
      align: "center",
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
      align: "center",
      fixed: "right",
      width: 120,
      render: (value: any, record: any) => {
        const menu = (
          <Menu>
            <Menu.Item
              icon={<EyeOutlined />}
              onClick={() => {
                setIsVisiblePoint(true);
                setData(value);
              }}
            >
              Xem điểm
            </Menu.Item>
            {/* <Menu.Item
              icon={<EditOutlined />}
              onClick={() => { setIsVisiblePoint(true); setData(value)}}
            >
              Cập nhật
            </Menu.Item> */}
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
        Chi tiết lớp: {dataTable?.data?.name}
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
            <Upload
              beforeUpload={() => false}
              onChange={handleUpload}
              showUploadList={false}
            >
              <Button type="default">
                <FileExcelOutlined className="mr--5" />
                Tải file
              </Button>
            </Upload>

            <Button
              type="primary"
              onClick={() => {
                setIsVisibleModal(true);
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
        scroll={{ x: 1500 }}
        style={{ width: "100%" }}
      ></Table>

      <ModalAdd
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={() => setIsVisibleModal(false)}
        dataClass={dataTable?.data}
      />
      {/* <ModalUpload
        isVisibleModal={isVisibleModalUpload}
        setIsVisibleModal={() => {
          setIsVisibleModalUpload(false);
        }}
        idClass={ dataTable?.data?.class?.idClass}
      /> */}

      <ModalTeacher
        isVisibleModal={isVisibleTeacher}
        setIsVisibleModal={() => setIsVisibleTeacher(false)}
        dataClass={dataTable}
      />
      <ModalPoint
        isVisibleModal={isVisiblePoint}
        setIsVisibleModal={() => setIsVisiblePoint(false)}
        data={data}
      />
       <ModalXLSX
        isVisibleModal={isVisibleXLSX}
        setIsVisibleModal={() => { setIsVisibleXLSX(false); setDataXLSX(null) }}
        data={dataXLSX}
        idClass={dataTable?.data?.idClass}
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
    loadingCreate: loading.effects["classManageAndDetail/addStudentToClass"],
    loadingUpdate: loading.effects["classManageAndDetail/updateClass"],
    loadingDelete:
      loading.effects["classManageAndDetail/deleteStudentFromClass"],
    loadingImport: loading.effects["classManageAndDetail/addFileStudentToClass"],
  })
)(DetailClass);
