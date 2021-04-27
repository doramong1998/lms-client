/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { Row, Col, Divider, Table, Spin, Card, Button, Space, Menu, Dropdown } from "antd";
import type { Dispatch } from "umi";
import { connect } from "umi";
import type { DataT } from "../../data";
import { DeleteOutlined, DownloadOutlined, EyeOutlined, MoreOutlined, RetweetOutlined, UploadOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import ModalShow from "@/pages/Files/components/ListFile/ModalShow";
import ModalUpload from "./ModalUpload";
import { modalConfirmDelete } from "@/utils/utils";

type Props = {
  dispatch: Dispatch;
  dataTable: any;
  loadingGet: boolean;
  loadingGetPoint: boolean;
  loadingDelete: boolean;
};

const DetailClass: FC<Props> = ({
  dispatch,
  dataTable,
  loadingGet,
  loadingGetPoint,
  loadingDelete
}) => {
  const [isVisibleShow, setIsVisibleShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [pointStudent, setPointStudent] = useState<any>(null);
  const [isVisibleModalUpload, setIsVisibleModalUpload] = useState(false);

  useEffect(() => {
    dispatch({
      type: "classAndStudent/getClassByMe",
    });
  }, [dispatch]);

  useEffect(() => {
    if (loadingGet === true || loadingGetPoint === true) {
      setLoading(true);
    }
    if (loadingGet === false || loadingGetPoint === false) {
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

  useEffect(() => {
    if(dataTable?.data?.user){
      dispatch({
        type: "classManageAndDetail/getPointStudent",
        payload: {
          data: {
            idUser: dataTable?.data?.user?.idUser,
          }
        }
      }).then((res: any) => {
        setPointStudent(res?.data)
      })
    }
  }, [dispatch, dataTable])

  const onReload = () => {
    dispatch({
      type: "classAndStudent/getClassByMe",
    });
  }


  const calcResult = (value: number, endPoint: number) => {
    if(value > 4 && endPoint > 4){
      return 'Đạt'
    } else return 'Học lại'
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
      title: "Mã môn học",
      dataIndex: "code",
      align:'center',
    },
    {
      title: "Tên môn học",
      dataIndex: "name",
    },
    {
      title: "Điểm danh",
      dataIndex: "point",
      align:'center',
      render: (value: any, record: any) => `${value?.pointDiligence?.length} / ${record?.lessonNum || 1}` 
    },
    {
      title: "Điểm giữa kì",
      dataIndex: "point",
      align:'center',
      render: (value: any) => value?.pointMidTerm || 'Chưa có điểm'
    },
    {
      title: "Điểm thi ",
      dataIndex: "point",
      align:'center',
      render: (value: any) => value?.pointEndTerm || 'Chưa có điểm'
    },
    {
      title: "KTHP",
      dataIndex: "point",
      align: "center",
      render: (value: any, record: any) => <b>{(value?.pointEndTerm && value?.pointMidTerm) ?
        Math.round((value?.pointDiligence?.length*0.3 / record?.lessonNum + (value?.pointEndTerm*0.3 + value?.pointMidTerm*0.7)*0.7)*100)/100 : 'Chưa có điểm'}</b> ,
    },
    {
      title: "Đánh giá",
      dataIndex: "point",
      align: "center",
      render: (value: any, record: any) => <b>{(value?.pointEndTerm && value?.pointMidTerm) ?
        calcResult(Math.round((value?.pointDiligence?.length*0.3 / record?.lessonNum + (value?.pointEndTerm*0.3 + value?.pointMidTerm*0.7)*0.7)*100)/100, value?.pointMidTerm )  : 'Chưa có đánh giá'}</b> ,
    },
  ]


  return (
    <>
      <div className="layout--main__title">Thông tin lớp {dataTable?.data?.class?.name}
      </div>
      <Divider />
      <Spin spinning={loading}>
      {dataTable?.data && <>
        <Row gutter={12} className='mb--5'>
        <Col span={12} className='font-size--20 font-weight--500'>Thông tin chung:</Col>
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
          <Col span={16} lg={20}>{dataTable?.data?.class?.studentNum?.length}</Col>
        </Row>
      <Divider />
        <Row gutter={12} className='mb--5'>
        <Col span={12} className='font-size--20 font-weight--500'>Thông tin của sinh viên:</Col>
      </Row>
        <Row gutter={12}>
          <Col span={12}>Họ và tên: <b>{dataTable?.data?.user?.fullName}</b></Col>
          <Col span={12}>Mã sinh viên: <b>{dataTable?.data?.user?.studentId}</b> </Col>
        </Row>
        <Table
        className='w--full mt--20'
        loading={loading}
        columns={columns}
        dataSource={pointStudent}
        scroll={{y: 500}}
      ></Table>
        <Divider />
        <Row gutter={12} className='mb--5'>
        <Col span={12} className='font-size--20 font-weight--500'>Tài liệu lớp:</Col>
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
                      <Dropdown overlay={() => renderMenu(item)}>
                      <MoreOutlined  />
                    </Dropdown>,
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
                      <Dropdown overlay={() => renderMenu(item)}>
                      <MoreOutlined  />
                    </Dropdown>,,
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
        </>}
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
          setIsVisibleModalUpload(false)
          onReload()
        }}
        idClass={ dataTable?.data?.class?.idClass}
      />
      </Spin>
   
    </>
  );
};

export default connect(
  ({
    classAndStudent,
    loading,
  }: {
    classAndStudent: DataT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dataTable: classAndStudent.detailClass,
    listSubject: classAndStudent.pointUser,
    loadingGet: loading.effects["classAndStudent/getClassByMe"],
    loadingGetPoint: loading.effects["classManageAndDetail/getPointStudent"],
    loadingDelete: loading.effects["files/deleteFileClass"],
  })
)(DetailClass);
