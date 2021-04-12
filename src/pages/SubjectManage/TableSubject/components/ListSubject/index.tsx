/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
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
import ModalCreate from "./ModalCreate";
import type { SubjectT, ListSubject, Subject } from "../../data";
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
  dataTable: ListSubject;
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
      type: "subjectManage/getListSubject",
    });
    dispatch({
      type: "subjectManage/getListTeacher",
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
        type: "subjectManage/getListSubject",
      });
      setLoading(false);
    }
  }, [loadingCreate, dispatch, loadingDelete, loadingUpdate]);

  const dataSource =
    dataTable?.data?.map((item: Subject) => ({
      id: item?.id,
      idSubject: item?.idSubject,
      name: item?.name,
      code: item?.code,
      studentNum: item?.studentNum,
      lessonNum: item?.lessonNum,
      idTeacher: item.idTeacher,
      status: item?.status,
      teacher: item?.teacher,
      credit: item?.credit,
      totalStudent: item?.totalStudent,
    })) || [];

  const rowSelection = {
    onChange: (values: any) => {
      setSelectedRowKeys(values);
    },
  };

  const onDeleteOne = (id: any) => {
    const onOk = () =>
      dispatch({
        type: "subjectManage/deleteSubject",
        payload: {
          data: {
            id,
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
      render: (value: any, item: any, index: number) => index + 1,
    },

    {
      title: "Tên môn học",
      dataIndex: "name",
    },
    {
      title: "Mã môn học",
      dataIndex: "code",
    },
    {
      title: "Quản lý",
      dataIndex: "teacher",
      render: (value: any) => value?.fullName,
    },
    {
      title: "SL tiết học",
      dataIndex: "lessonNum",
    },
    {
      title: "Số tín chỉ",
      dataIndex: "credit",
    },
    {
      title: "SL sinh viên",
      dataIndex: "totalStudent",
    },
    {
      title: "SL tài liệu",
      dataIndex: "files",
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
      fixed: "right",
      width: 150,
      render: (value: any, record: any) => {
        const menu = (
          <Menu>
             <Menu.Item
              icon={<EyeOutlined />}
              onClick={() => history.push(`/subject-manage/${value.id}`)}
            >
              Chi tiết
            </Menu.Item>
            <Menu.Item
              icon={<EditOutlined />}
              onClick={() => {
                setIsVisibleModal(true);
                setData(record);
              }}
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
        <FormattedMessage id="subjectManage.listSubject" />
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
      ></Table>

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
    subjectManage,
    loading,
  }: {
    subjectManage: SubjectT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dataTable: subjectManage.listSubject,
    loadingGet: loading.effects["subjectManage/getListSubject"],
    loadingCreate: loading.effects["subjectManage/createSubject"],
    loadingUpdate: loading.effects["subjectManage/updateSubject"],
    loadingDelete: loading.effects["subjectManage/deleteSubject"],
  })
)(ListNew);
