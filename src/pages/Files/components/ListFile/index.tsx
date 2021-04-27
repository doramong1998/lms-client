/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { Row, Col, Divider, Button, Space, Card, Spin, Menu, Dropdown } from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage } from "umi";
import ModalCreate from "./ModalCreate";
import type { FileT, ListFile, File } from "../../data";
import { modalConfirmDelete } from "@/utils/utils";
import { saveAs } from "file-saver";
import {
  PlusOutlined,
  EllipsisOutlined,
  DownloadOutlined,
  EyeOutlined,
  MoreOutlined,
  DeleteOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import ModalShow from "./ModalShow";

type Props = {
  dispatch: Dispatch;
  dataTable: ListFile;
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
  const [isVisibleShow, setIsVisibleShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    dispatch({
      type: "files/getListFile",
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
      dispatch({
        type: "FileManage/getListFile",
      });
      setLoading(false);
    }
  }, [loadingCreate, dispatch, loadingDelete, loadingUpdate]);

  const dataSource =
    dataTable?.data?.map((item: File) => ({
      id: item?.id,
      idUser: item?.idUser,
      name: item?.name,
      type: item?.type,
      url: item?.url,
      status: item?.status,
      idFile: item?.idFile,
    })) || [];

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

  const onDeleteOne = (id: any) => {
    const onOk = () =>
      dispatch({
        type: "files/deleteFile",
        payload: {
          id
        },
      })
    modalConfirmDelete(onOk);
  }

  const renderMenu = (item: any) => (
    <Menu>
       <Menu.Item
        icon={<RetweetOutlined />}
        onClick={() => onReloadFile(item.idFile)}
      >
        Làm mới
      </Menu.Item>
      <Menu.Item
        danger
        icon={<DeleteOutlined />}
        onClick={() => onDeleteOne(item.idFile)}
      >
        Xóa
      </Menu.Item>
    </Menu>
  );

       

  return (
    <>
      <div className="layout--main__title">
        <FormattedMessage id="FileManage.listFile" />
      </div>
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
              <PlusOutlined className="mr--5" />
              <FormattedMessage id="button.create" />
            </Button>
          </Space>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Row gutter={12}>
          {dataSource?.map((item: any) => {
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
                      </Dropdown>
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
                      </Dropdown>
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
                      </Dropdown>
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
      </Spin>
      <ModalCreate
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={() => {
          setIsVisibleModal(false);
        }}
      />
      <ModalShow
        isVisibleModal={isVisibleShow}
        setIsVisibleModal={() => {
          setIsVisibleShow(false);
          setData(null);
        }}
        data={data}
      />
    </>
  );
};

export default connect(
  ({
    files,
    loading,
  }: {
    files: FileT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dataTable: files.listFile,
    loadingGet: loading.effects["files/getListFile"],
    loadingUpdate: loading.effects["files/updateFile"],
    loadingDelete: loading.effects["files/deleteFile"],
  })
)(ListNew);
