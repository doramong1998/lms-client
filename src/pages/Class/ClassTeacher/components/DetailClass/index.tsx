/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
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
  Card,
  Badge,
  Avatar,
} from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage } from "umi";
import type { ClassT } from "../../data";
import { modalConfirmDelete } from "@/utils/utils";
import {
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  DownloadOutlined,
  EyeOutlined,
  UploadOutlined,
  RetweetOutlined
} from "@ant-design/icons";
import ModalShow from "@/pages/Files/components/ListFile/ModalShow";
import Meta from "antd/lib/card/Meta";
import ModalPoint from "@/pages/ClassManage/DetailClass/components/DetailClass/ModalPoint";
import ModalAdd from "@/pages/ClassManage/DetailClass/components/DetailClass/ModalAdd";
import ModalUpload from "@/pages/ClassManage/DetailClass/components/DetailClass/ModalUpload";

type Props = {
  dispatch: Dispatch;
  dataTable: any;
  loadingGet: boolean;
  loadingDelete: boolean;
};

const ListNew: FC<Props> = ({
  dispatch,
  dataTable,
  loadingGet,
  loadingDelete
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleModalUpload, setIsVisibleModalUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isVisibleShow, setIsVisibleShow] = useState(false);
  const [isVisiblePoint, setIsVisiblePoint] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    dispatch({
      type: "classAndTeacher/getDetailClass",
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
    if (loadingDelete === true) {
      setLoading(true);
    }
    if (loadingDelete === false) {
      dispatch({
        type: "classAndTeacher/getDetailClass",
      });
      setLoading(false);
    }
  }, [loadingDelete, dispatch]);


  const dataSource =
    dataTable?.data?.class?.students?.map((item: any) => ({
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
        type: "classManageAndDetail/deleteStudentFromClass",
        payload: {
          data: {
            idUser,
            idClass: dataTable?.data?.idClass
          },
        },
      });
    modalConfirmDelete(onOk);
  }

  const onReloadFile = (idFile: any) => {
    dispatch({
      type: "files/updateTimeFile",
      payload: {
        data: {
          idFile,
        },
      },
    })
  };

  const onDeleteFile = (idFile: any) => {
    console.log(idFile, dataTable?.data?.class?.idClass)
    const onOk = () =>
      dispatch({
        type: "files/deleteFileClass",
        payload: {
          data: {
            idFile,
            idClass: dataTable?.data?.class?.idClass
          }
        },
      })
    modalConfirmDelete(onOk);
  }

  const renderMenu = (item: any) => (
    <Menu>
       <Menu.Item
        icon={<RetweetOutlined />}
        onClick={() => onReloadFile(item?.idFile)}
      >
        Làm mới
      </Menu.Item>
      <Menu.Item
        danger
        icon={<DeleteOutlined />}
        onClick={() => onDeleteFile(item?.idFile)}
      >
        Xóa
      </Menu.Item>
    </Menu>
  );

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
      width: 180,
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
              onClick={() => { setIsVisiblePoint(true); setData(value)}}
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

  const reloadAttend = () => {
    dispatch({
      type: "classAndTeacher/getDetailClass",
    });
  }

  return (
    <>
     <div className="layout--main__title">
      Thông tin lớp: {dataTable?.data?.class?.name}
      </div>
      <Divider />
       <>
        <Row gutter={12} className="mb--5">
        <Col span={12} className="font-size--20 font-weight--500">
          Thông tin chung:
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
          {dataTable?.data?.class?.students?.length}
        </Col>
      </Row>
      <Divider />
      <Row gutter={24} className="mb--24">
        <Col md={12}></Col>
        <Col md={12}>
          <Space className="w--full justify-content--flexEnd">
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
        rowKey={(item: any) => item?.id}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1600 }}
        className='w--full'
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
            if (item?.type?.indexOf("image") !== -1) {
              return (
                <Col span={24} md={6} key={item?.id}>
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
                        onClick={() => saveAs(item?.url, item?.name)}
                      />,
                      <Dropdown overlay={() => renderMenu(item)}>
                        <MoreOutlined  />
                      </Dropdown>,
                    ]}
                    cover={
                      <img
                        style={{ height: "180px" }}
                        alt="picture"
                        src={item?.url}
                      />
                    }
                  >
                    <Meta title={item?.name} />
                  </Card>
                </Col>
              );
            } else if (item?.type?.indexOf("video") !== -1) {
              return (
                <Col span={24} md={6} key={item?.id}>
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
                        onClick={() => saveAs(item?.url, item?.name)}
                      />,
                      <Dropdown overlay={() => renderMenu(item)}>
                        <MoreOutlined  />
                      </Dropdown>,
                    ]}
                    cover={
                      <img
                        style={{ height: "180px" }}
                        alt="picture"
                        src="http://res.cloudinary.com/huy12312312a/image/upload/v1617502931/wpy5looxqrpcpg8wzpti.png"
                      />
                    }
                  >
                    <Meta title={item?.name} />
                  </Card>
                </Col>
              );
            } else {
              return (
                <Col span={24} md={6} key={item?.id}>
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
                        onClick={() => saveAs(item?.url, item?.name)}
                      />,
                      <Dropdown overlay={() => renderMenu(item)}>
                        <MoreOutlined  />
                      </Dropdown>,
                    ]}
                    cover={
                      <img
                        style={{ height: "180px" }}
                        alt="picture"
                        src="http://res.cloudinary.com/huy12312312a/image/upload/v1617523896/lzk9tftmfoe8xrfodrwf.png"
                      />
                    }
                  >
                    <Meta title={item?.name} />
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
        idClass={ dataTable?.data?.class?.idClass}
      />

      <ModalAdd
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={() => { setIsVisibleModal(false) 
          reloadAttend()}}
          dataClass={dataTable?.data?.class}
      />

<ModalPoint
        isVisibleModal={isVisiblePoint}
        setIsVisibleModal={() => setIsVisiblePoint(false) }
        data={data}
      />
      </>
    </>
  );
};

export default connect(
  ({
    classAndTeacher,
    loading,
  }: {
    classAndTeacher: ClassT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dataTable: classAndTeacher.detailClass,
    loadingGet: loading.effects["classAndTeacher/getListSubject"],
    loadingDelete: loading.effects["files/deleteFileClass"],
  })
)(ListNew);
