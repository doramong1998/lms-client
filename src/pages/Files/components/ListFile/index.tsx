/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import type { FC } from "react";
import { Row, Col, Divider, Button, Space, Card, Skeleton } from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage } from "umi";
import ModalCreate from "./ModalCreate";
import type { FileT, ListFile, File } from "../../data";
import { modalConfirmDelete } from "@/utils/utils";
import {
  EditOutlined,
  PlusOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";

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

  const onDeleteOne = (id: any) => {
    const onOk = () =>
      dispatch({
        type: "FileManage/deleteFile",
        payload: {
          data: {
            id,
          },
        },
      });
    modalConfirmDelete(onOk);
  };

  console.log(dataTable, dataSource);

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

      <Row gutter={12}>
        {dataSource?.map((item: any) => (
          <Col span={24} md={6} key={item.id}>
            <Card
              className="w--full"
              style={{ marginTop: 16 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
              cover={<img alt="picture" src={item.url} />}
            >
              <Meta title={item.name} />
            </Card>
          </Col>
        ))}
      </Row>

      <ModalCreate
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={() => {
          setIsVisibleModal(false);
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
    loadingCreate: loading.effects["files/createFile"],
    loadingUpdate: loading.effects["files/updateFile"],
    loadingDelete: loading.effects["files/deleteFile"],
  })
)(ListNew);
