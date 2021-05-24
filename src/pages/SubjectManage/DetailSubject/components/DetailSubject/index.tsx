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
  Calendar,
  Upload,
} from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage, history } from "umi";
import ModalAdd from "./ModalAdd";
import * as XLSX from "xlsx";
import type { SubjectT } from "../../data";
import { modalConfirmDelete } from "@/utils/utils";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import ModalTeacher from "./ModalTeacher";
import ModalUpdatePoint from "./ModalUpdatePoint";
import ModalAttend from "./ModalAttend";
import ModalCreate from "@/pages/Calendar/components/ListCalendar/ModalCreate";
import ModalShow from "@/pages/Calendar/components/ListCalendar/ModalShow";
import moment from "moment";
import ModalXLSX from "./ModalXLSX";

type Props = {
  dispatch: Dispatch;
  dataTable: any;
  loadingGet: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  loadingUpdatePoint: boolean;
  loadingCreateDate: boolean;
  loadingUpdateDate: boolean;
  loadingDeleteDate: boolean;
  loadingUpdateFile: boolean;
};

const ListNew: FC<Props> = ({
  dispatch,
  dataTable,
  loadingCreate,
  loadingDelete,
  loadingGet,
  loadingUpdate,
  loadingUpdatePoint,
  loadingCreateDate ,
  loadingDeleteDate,
  loadingUpdateDate,
  loadingUpdateFile
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isVisibleTeacher, setIsVisibleTeacher] = useState(false);
  const [isVisiblePoint, setIsVisiblePoint] = useState(false);
  const [isVisibleAttend, setIsVisibleAttend] = useState(false);
  const [isVisibleCreate, setIsVisibleCreate] = useState(false);
  const [isVisibleShow, setIsVisibleShow] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isVisibleXLSX, setIsVisibleXLSX] = useState(false);
  const [dataXLSX, setDataXLSX] = useState<any>(null);
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
      loadingCreateDate === true ||
      loadingDeleteDate === true ||
      loadingUpdateDate === true || 
      loadingUpdatePoint === true || 
      loadingUpdateFile === true
    ) {
      setLoading(true);
    }
    if (
      loadingCreate === false ||
      loadingDelete === false ||
      loadingUpdate === false ||
      loadingCreateDate === false ||
      loadingDeleteDate === false ||
      loadingUpdateDate === false || 
      loadingUpdatePoint === false ||
      loadingUpdateFile === false
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
  }, [loadingCreate, dispatch, loadingDelete, loadingUpdate,loadingUpdatePoint,loadingDeleteDate,loadingUpdateDate,loadingUpdateFile, loadingCreateDate]);

  const onSelect = (date: any) => {
    setSelectedDate(getListData(date));
    if (getListData(date).length > 0) setIsVisibleShow(true);
  };

  const getListData = (value: any) => {
    let listData: any = []
    dataTable?.data?.calendar?.map((item: any) => {
      if(moment.unix(item?.time).format("DD/MM/YYYY") === moment(value).format('DD/MM/YYYY')){
        listData.push({
          type: item.type,
          content: item.name,
          idCalendar: item.idCalendar,
          time: item?.time,
        })
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

  const calcResult = (value: number, endPoint: number) => {
    if(value > 4 && endPoint > 4){
      return 'Đạt'
    } else return 'Học lại'
  }

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
      render: (value: any) => `${value?.pointDiligence.length} / ${dataTable?.data?.lessonNum}`,
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
      render: (value: any) => <b>{(value?.pointEndTerm && value?.pointMidTerm) ?
        Math.round((value?.pointDiligence?.length*0.3 / dataTable?.data?.lessonNum + (value?.pointEndTerm*0.3 + value?.pointMidTerm*0.7)*0.7)*100)/100 : 'Chưa có điểm'}</b> ,
    },
    {
      title: "Đánh giá",
      dataIndex: "point",
      align: "center",
      width: 200,
      render: (value: any) => <b>{(value?.pointEndTerm && value?.pointMidTerm) ?
        calcResult(Math.round((value?.pointDiligence?.length*0.3 / dataTable?.data?.lessonNum  + (value?.pointEndTerm*0.3 + value?.pointMidTerm*0.7)*0.7)*100)/100, value?.pointMidTerm )  : 'Chưa có đánh giá'}</b> ,
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
          Tổng số tiết học:
        </Col>
        <Col span={16} lg={20}>
          {dataTable?.data?.lessonNum}
        </Col>
      </Row>
      <Row>
        <Col span={8} lg={4} className="font-weight--500">
          Tổng số tín chỉ:
        </Col>
        <Col span={16} lg={20}>
          {dataTable?.data?.credit}
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
        scroll={{ x: 1600 }}
        className='w--full'
      ></Table>
      <Divider />
      <Row gutter={12} className="mb--5">
        <Col span={12} className="font-size--20 font-weight--500">
          Lịch học:
        </Col>
        <Col span={12} className="font-size--20 font-weight--500">
        <Space className="w--full justify-content--flexEnd">
                  <Button htmlType="submit" type="primary" onClick={() => setIsVisibleCreate(true)}>
                    <PlusOutlined />Thêm lịch
                  </Button>
                </Space>
        </Col>
        </Row>
      <Calendar dateCellRender={dateCellRender} onSelect={onSelect}/>
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
      <ModalCreate
        isVisibleModal={isVisibleCreate}
        setIsVisibleModal={setIsVisibleCreate}
        idSubject={dataTable?.data?.idSubject}
      />
      <ModalShow
        isVisibleModal={isVisibleShow}
        setIsVisibleModal={setIsVisibleShow}
        data={selectedDate}
      />
       <ModalXLSX
        isVisibleModal={isVisibleXLSX}
        setIsVisibleModal={() => { setIsVisibleXLSX(false); setDataXLSX(null) }}
        data={dataXLSX}
        idSubject={dataTable?.data?.idSubject}
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
    loadingCreateDate: loading.effects["calendar/createCalendarSubject"],
    loadingUpdateDate: loading.effects["calendar/updateCalendar"],
    loadingDeleteDate: loading.effects["calendar/deleteCalendar"],
    loadingUpdateFile: loading.effects["subjectManageAndDetail/addFileStudentToSubject"],
  })
)(ListNew);
