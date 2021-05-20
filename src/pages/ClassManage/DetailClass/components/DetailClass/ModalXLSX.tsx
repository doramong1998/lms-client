import React, { FC, useEffect, useState } from "react";
import { Button, Divider, Modal, Space, Table } from "antd";
import type { Dispatch } from "umi";
import { connect } from "umi";
import { ClassT } from "../../data";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

type Props = {
  dispatch: Dispatch;
  data: any;
  idClass: any;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
};

const columns: any = [
  {
    title: "STT",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "Mã sinh viên",
    dataIndex: "code",
    align: "center",
  },
  {
    title: "Họ",
    dataIndex: "firstName",
    align: "center",
  },
  {
    title: "Tên",
    dataIndex: "lastName",
    align: "center",
  },
  {
    title: "Lớp",
    dataIndex: "class",
    align: "center",
  },
  {
    title: "Trạng thái",
    align: "center",
    dataIndex: "status",
    render: (value: any) => {
      if (value) return <CheckCircleOutlined style={{ color: "#27ae60" }} />;
      else return <CloseCircleOutlined style={{ color: "#c0392b" }} />;
    },
  },
  {
    title: "Mô tả",
    dataIndex: "message",
  },
];

const ModalCreateOrEdit: FC<Props> = ({
  dispatch,
  data,
  idClass,
  isVisibleModal,
  setIsVisibleModal,
}) => {
  const [dataTable, setDataTable] = useState<any>(null);
  const [pending, setPending] = useState(false);
  useEffect(() => {
    if (data) setDataTable(data);
  }, [data]);

  const addStudent = () => {
    dispatch({
      type: "classManageAndDetail/addFileStudentToClass",
      payload: {
        data: {
          idClass,
          data,
        },
      },
    }).then((res: any) => {
      setDataTable(res?.data?.allList);
    });
    setPending(true);
  };

  return (
    <Modal
      title="Thông tin chi tiết"
      visible={isVisibleModal}
      centered
      footer={false}
      width="70%"
    >
      <Table
        rowKey={(item: any) => item.id}
        columns={columns}
        dataSource={dataTable}
        style={{ width: "100%" }}
      ></Table>
      <Divider />
      {!pending && (
        <Space className="w--full justify-content--flexEnd">
          <Button
            onClick={() => {
              setIsVisibleModal(false);
              setDataTable(null);
              setPending(false)
            }}
          >
            Hủy
          </Button>
          <Button onClick={() => addStudent()} type="primary">
            Thêm học sinh
          </Button>
        </Space>
      )}
      {pending && (
        <Space className="w--full justify-content--flexEnd">
          <Button
            type="primary"
            onClick={() => {
              setIsVisibleModal(false);
              setDataTable(null);
              setPending(false)
            }}
          >
            Xong
          </Button>
        </Space>
      )}
    </Modal>
  );
};

export default connect(
  ({
    classManage,
  }: {
    classManage: ClassT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    listTeacher: classManage.listTeacher,
  })
)(ModalCreateOrEdit);
