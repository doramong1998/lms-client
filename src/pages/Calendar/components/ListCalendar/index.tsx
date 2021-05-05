/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import type { FC } from "react";
import { Row, Col, Spin, Button, Space, Divider, Calendar, Badge } from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import type { CalendarT } from "../../data";
import ModalCreate from "./ModalCreate";
import ModalShow from "./ModalShow";

type Props = {
  dispatch: Dispatch;
  dataTable: any;
  creating?: boolean;
  updating?: boolean;
  deleting?: boolean;
};

const ListNew: FC<Props> = ({
  dispatch,
  dataTable,
  creating,
  updating,
  deleting,
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisibleModalDate, setIsVisibleModalDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch({
      type: "calendar/getCalendar",
    });
  }, [dispatch]);

  useEffect(() => {
    if (creating === true || updating === true || deleting === true) {
      setLoading(true);
    }
    if (creating === false || updating === false || deleting === false) {
      dispatch({
        type: "calendar/getCalendar",
      });
      setLoading(false);
    }
  }, [creating, dispatch, updating, deleting]);

  const getListData = (value: any) => {
    let listData: any = [];
    dataTable?.data?.map((item: any) => {
      if (
        moment.unix(item?.time).format("DD/MM/YYYY") ===
        moment(value).format("DD/MM/YYYY")
      ) {
        listData.push({
          type: item.type,
          content: item.name,
          idCalendar: item.idCalendar,
          time: item?.time,
        });
      }
    });
    return listData;
  };

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul className="m--0 p--0">
        {listData.map((item: any) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (date: any) => {
    setSelectedDate(getListData(date));
    if (getListData(date).length > 0) setIsVisibleModalDate(true);
  };

  return (
    <>
      <div className="layout--main__title">
        <FormattedMessage id="Calendar.calendar" />
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
      <Row gutter={24}>
        <Col span={24}>
          <div className="layout--table">
            <Spin spinning={loading}>
              <Calendar dateCellRender={dateCellRender} onSelect={onSelect} />
            </Spin>
          </div>
        </Col>
      </Row>
      <ModalCreate
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />

      <ModalShow
        isVisibleModal={isVisibleModalDate}
        setIsVisibleModal={setIsVisibleModalDate}
        data={selectedDate}
      />
    </>
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
    updating: loading.effects["calendar/updateCalendar"],
    deleting: loading.effects["calendar/deleteCalendar"],
  })
)(ListNew);
