/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import type { FC } from "react";
import {
  Row,
  Col,
  Divider,
  Table,
  Menu,
  Button,
  Dropdown,
  Space,
  Select,
  Card,
} from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage } from "umi";
import ModalAdd from "./ModalAdd";
import type { SubjectT } from "../../data";
import { modalConfirmDelete } from "@/utils/utils";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ModalUpdatePoint from "./ModalUpdatePoint";
import ModalAttend from "./ModalAttend";
import ModalShow from "@/pages/Files/components/ListFile/ModalShow";
import Meta from "antd/lib/card/Meta";
import ModalUpload from "./ModalUpload";

const { Option } = Select;

type Props = {
  dispatch: Dispatch;
  dataTable: any;
  listSubject: any;
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
  loadingUpdatePoint,
  listSubject
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleModalUpload, setIsVisibleModalUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isVisibleShow, setIsVisibleShow] = useState(false);
  const [isVisiblePoint, setIsVisiblePoint] = useState(false);
  const [isVisibleAttend, setIsVisibleAttend] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectValue, setSelectValue] = useState<any>(undefined);

  useEffect(() => {
    dispatch({
      type: "subjectAndTeacher/getListSubject",
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
        type: "subjectAndTeacher/deleteStudentFromSubject",
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

  const onChangeSelect = (values: any) => {
    setSelectValue(values)
    dispatch({
      type: "subjectAndTeacher/getDetailSubject",
      payload: {
        id: values
      }
    });
  } 

  const reloadAttend = () => {
    dispatch({
      type: "subjectAndTeacher/getDetailSubject",
      payload: {
        id: dataTable?.data?.id
      }
    });
  }

  return (
    <>
     <div className="layout--main__title">
      <Select placeholder='Chọn môn học...' style={{width: 300}} value={selectValue} onChange={onChangeSelect}>
        {listSubject?.data?.map((item: any) => <Option key={item.idSubject} value={item.id}>{item.name} - {item.code}</Option>)}
    </Select>
      </div>
      <Divider />
      {dataTable?.data && selectValue && <>
        <Row gutter={12} className="mb--5">
        <Col span={12} className="font-size--20 font-weight--500">
          Thông tin chung:
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
        style={{ width: 1183 }}
      ></Table>

<Divider />
        <Row gutter={12} className='mb--5'>
        <Col span={12} className='font-size--20 font-weight--500'>Tài liệu môn học:</Col>
        <Col span={12}>
        <Space className="w--full justify-content--flexEnd">
            <Button
              type="primary"
              onClick={() => {
                setIsVisibleModalUpload(true)
              }}
            >
              <UploadOutlined className="mr--5" />
              Tải lên
            </Button>
          </Space> </Col>
      </Row>
      <Row gutter={12}>
          {dataTable?.data?.listFile?.map((item: any) => {
            if (item?.type.indexOf("image") !== -1) {
              return (
                <Col span={24} md={6} key={item.id}>
                  <Card
                    className="w--full"
                    style={{ marginTop: 16 }}
                    actions={[
                      <EyeOutlined
                        key="watch"
                        onClick={() => {
                          setIsVisibleShow(true);
                          setData(item);
                        }}
                      />,
                      <DownloadOutlined
                        key="download"
                        onClick={() => saveAs(item.url, item.name)}
                      />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                    cover={
                      <img
                        style={{ height: "180px" }}
                        alt="picture"
                        src={item.url}
                      />
                    }
                  >
                    <Meta title={item.name} />
                  </Card>
                </Col>
              );
            } else if (item?.type.indexOf("video") !== -1) {
              return (
                <Col span={24} md={6} key={item.id}>
                  <Card
                    className="w--full"
                    style={{ marginTop: 16 }}
                    actions={[
                      <EyeOutlined
                        key="watch"
                        onClick={() => {
                          setIsVisibleShow(true);
                          setData(item);
                        }}
                      />,
                      <DownloadOutlined
                        key="download"
                        onClick={() => saveAs(item.url, item.name)}
                      />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                    cover={
                      <img
                        style={{ height: "180px" }}
                        alt="picture"
                        src="http://res.cloudinary.com/huy12312312a/image/upload/v1617502931/wpy5looxqrpcpg8wzpti.png"
                      />
                    }
                  >
                    <Meta title={item.name} />
                  </Card>
                </Col>
              );
            } else {
              return (
                <Col span={24} md={6} key={item.id}>
                  <Card
                    className="w--full"
                    style={{ marginTop: 16 }}
                    actions={[
                      <EyeOutlined
                        key="watch"
                        onClick={() => {
                          setIsVisibleShow(true);
                          setData(item);
                        }}
                      />,
                      <DownloadOutlined
                        key="download"
                        onClick={() => saveAs(item.url, item.name)}
                      />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                    cover={
                      <img
                        style={{ height: "180px" }}
                        alt="picture"
                        src="http://res.cloudinary.com/huy12312312a/image/upload/v1617523896/lzk9tftmfoe8xrfodrwf.png"
                      />
                    }
                  >
                    <Meta title={item.name} />
                  </Card>
                </Col>
              );
            }
          })}
        </Row>
        <ModalShow
        isVisibleModal={isVisibleShow}
        setIsVisibleModal={() => {
          setIsVisibleShow(false);
          setData(null);
        }}
        data={data}
      />

        <ModalUpload
        isVisibleModal={isVisibleModalUpload}
        setIsVisibleModal={() => {
          setIsVisibleModalUpload(false);
          reloadAttend()
        }}
        idSubject={ dataTable?.data?.idSubject}
      />

      <ModalAdd
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={() => { setIsVisibleModal(false) 
          reloadAttend()}}
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
        setIsVisibleModal={() => { 
          setIsVisibleAttend(false)
          reloadAttend()
        }}
        data={dataTable}
      />  
      
      </>
      }
      
    </>
  );
};

export default connect(
  ({
    subjectAndTeacher,
    loading,
  }: {
    subjectAndTeacher: SubjectT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dataTable: subjectAndTeacher.detailSubject,
    listSubject: subjectAndTeacher.listSubject,
    loadingGet: loading.effects["subjectAndTeacher/getListSubject"],
    loadingCreate: loading.effects["subjectAndTeacher/createSubject"],
    loadingUpdate: loading.effects["subjectAndTeacher/updateSubject"],
    loadingDelete:
      loading.effects["subjectAndTeacher/deleteStudentFromSubject"],
    loadingUpdatePoint: loading.effects["subjectAndTeacher/updatePoint"],
  })
)(ListNew);
