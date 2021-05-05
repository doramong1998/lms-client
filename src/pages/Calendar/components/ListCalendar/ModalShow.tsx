import { FC, useState } from "react";
import { Badge, Modal, Row, Col, Space } from "antd";
import { connect, Dispatch } from "umi";
import { CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CalendarT } from "../../data";
import { modalConfirmDelete } from "@/utils/utils";
import ModalCreate from "./ModalCreate";

type Props = {
  dispatch: Dispatch;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
  data: any;
};

const ModalCreateOrEdit: FC<Props> = ({
  dispatch,
  isVisibleModal,
  setIsVisibleModal,
  data,
}) => {
  const [modalEdit, setModalEdit] = useState(false);
  const [dataSelect, setDataSelect] = useState<any>(null);
  const onEdit = (values: any) => {
    setDataSelect(values);
    setModalEdit(true);
  };

  const onDelete = (item: any) => {
    console.log(item);
    const onOk = () =>
      dispatch({
        type: "calendar/deleteCalendar",
        payload: {
          data: {
            idCalendar: item.idCalendar,
          },
        },
      }).then(() => {
        setIsVisibleModal(false);
      });
    modalConfirmDelete(onOk);
  };

  return (
    <Modal
      title="Chi tiết"
      visible={isVisibleModal}
      footer={null}
      closeIcon={<CloseOutlined onClick={() => setIsVisibleModal(false)} />}
      centered
    >
      <ul className="m--0 p--0">
        {data?.map((item: any) => (
          <li key={item.content}>
            <Row gutter={10} className="mt--10">
              <Col span={16}>
                <Badge status={item.type} text={item.content} />
              </Col>
              <Col span={8}>
                <Space className="w--full justify-content--flexEnd">
                  <EditOutlined
                    onClick={() => onEdit(item)}
                    style={{ color: "#f1c40f", fontSize: "20px" }}
                  />
                  <DeleteOutlined
                    onClick={() => onDelete(item)}
                    style={{ color: "#c0392b", fontSize: "20px" }}
                  />
                </Space>
              </Col>
            </Row>
          </li>
        ))}
      </ul>
      <ModalCreate
        isVisibleModal={modalEdit}
        setIsVisibleModal={setModalEdit}
        data={dataSelect}
      />
    </Modal>
  );
};

export default connect(
  ({
    calendar,
    loading,
  }: {
    calendar: CalendarT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dataTable: calendar.dataCalendar,
    creating: loading.effects["calendar/createCalendar"],
  })
)(ModalCreateOrEdit);
