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
import { connect, FormattedMessage } from "umi";
import ModalCreate from "./ModalCreate";
import type { AccountT, ListAccount, Account } from "../../data";
import { modalConfirmDelete } from "@/utils/utils";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";

type Props = {
  dispatch: Dispatch;
  dataTable: ListAccount;
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
      type: "accountManage/getListAccount",
    });
    dispatch({
      type: "accountManage/getListClass",
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
        type: "accountManage/getListAccount",
      });
      setLoading(false);
    }
  }, [loadingCreate, dispatch, loadingDelete, loadingUpdate]);

  const dataSource =
    dataTable?.data?.map((item: Account) => ({
      id: item?.id,
      idUser: item?.idUser,
      fullName: item?.fullName,
      gender: item?.gender,
      dob: item?.dob,
      idClass: item?.idClass,
      studentId: item?.studentId,
      address: item?.address,
      phone: item?.phone,
      email: item?.email,
      permissionId: item?.permissionId,
      avatar: item?.avatar,
      status: item?.status,
      username: item?.username,
    })) || [];

  const rowSelection = {
    onChange: (values: any) => {
      setSelectedRowKeys(values);
    },
  };

  const onDeleteOne = (id: any) => {
    const onOk = () =>
      dispatch({
        type: "accountManage/deleteAccount",
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
      title: "Họ tên",
      dataIndex: "fullName",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      render: (value: any) => (value === "male" ? "Nam" : "Nữ"),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
    },
    {
      title: "Mã sinh viên",
      dataIndex: "studentId",
    },
    {
      title: "Quyền hạn",
      dataIndex: "permissionId",
      render: (value: any) => {
        switch (value) {
          case 1:
            return "Quản trị viên";
          case 2:
            return "Giáo viên";
          case 3:
            return "Sinh viên";
          default:
            return "";
        }
      },
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
        <FormattedMessage id="accountManage.listAccount" />
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
    accountManage,
    loading,
  }: {
    accountManage: AccountT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dataTable: accountManage.listAccount,
    loadingGet: loading.effects["accountManage/getListAccount"],
    loadingCreate: loading.effects["accountManage/createAccount"],
    loadingUpdate: loading.effects["accountManage/updateAccount"],
    loadingDelete: loading.effects["accountManage/deleteAccount"],
  })
)(ListNew);
