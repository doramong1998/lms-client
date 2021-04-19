/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { Row, Col, Divider, Table, Badge, Avatar, Select, Spin, Card } from "antd";
import type { Dispatch } from "umi";
import { connect, history } from "umi";
import type { DataT } from "../../data";
import { DownloadOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import ModalShow from "@/pages/Files/components/ListFile/ModalShow";

const { Option } = Select;
type Props = {
  dispatch: Dispatch;
  dataTable: any;
  loadingGet: boolean;
  listSubject: any;
};

const DetailClass: FC<Props> = ({
  dispatch,
  dataTable,
  loadingGet,
  listSubject
}) => {
  const [isVisibleShow, setIsVisibleShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any>(undefined);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    dispatch({
      type: "subjectAndStudent/getListSubject",
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

  const onChangeSelect = (values: any) => {
    setSelectedSubject(values)
    dispatch({
      type: "subjectAndStudent/getDetailUserSubject",
      payload: {
        id: values
      }
    });
  } 

  return (
    <>
      <div className="layout--main__title">
      <Select placeholder='Chọn môn học...' style={{width: 300}} value={selectedSubject} onChange={onChangeSelect}>
        {listSubject?.data?.map((item: any) => <Option key={item.idSubject} value={item.idSubject}>{item.name}</Option>)}
    </Select>
      </div>
      <Divider />
      <Spin spinning={loading}>
      {dataTable?.data && selectedSubject && <>
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
      <Divider />
        <Row gutter={12} className='mb--5'>
        <Col span={12} className='font-size--20 font-weight--500'>Thông tin sinh viên:</Col>
      </Row>
        <Row gutter={12}>
          <Col span={12}>Họ và tên: <b>{dataTable?.data?.user?.fullName}</b></Col>
          <Col span={12}>Mã sinh viên: <b>{dataTable?.data?.user?.studentId}</b> </Col>
        </Row>
        <Row gutter={12}>
        <Col span={8} lg={4}>Điểm danh:</Col>
          <Col span={16} lg={20}>{dataTable?.data?.point?.pointDiligence?.length}/{dataTable?.data?.lessonNum} </Col>
        </Row>
        <Row gutter={12}>
        <Col span={8} lg={4}>Điểm thi giữa kì:</Col>
          <Col span={16} lg={20}>{dataTable?.data?.point?.pointMidTerm}</Col>
        </Row>
        <Row gutter={12}>
        <Col span={8} lg={4}>Điểm thi cuối kì:</Col>
          <Col span={16} lg={20}>{dataTable?.data?.point?.pointEndTerm}</Col>
        </Row>
        <Divider />
        <Row gutter={12} className='mb--5'>
        <Col span={12} className='font-size--20 font-weight--500'>Tài liệu môn học:</Col>
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
        </>}
        <ModalShow
        isVisibleModal={isVisibleShow}
        setIsVisibleModal={() => {
          setIsVisibleShow(false);
          setData(null);
        }}
        data={data}
      />
      </Spin>
   
    </>
  );
};

export default connect(
  ({
    subjectAndStudent,
    loading,
  }: {
    subjectAndStudent: DataT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dataTable: subjectAndStudent.detailSubject,
    listSubject: subjectAndStudent.listSubject,
    loadingGet: loading.effects["subjectAndStudent/getDetailUserSubject"],
  })
)(DetailClass);
