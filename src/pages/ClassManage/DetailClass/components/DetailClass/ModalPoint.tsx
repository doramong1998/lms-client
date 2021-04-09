import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Modal,
  Select,
  Space,
  Row,
  Table,
} from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage } from "umi";
import { CloseOutlined } from "@ant-design/icons";
import { ClassT } from "../../data";

const { Option } = Select;

type Props = {
  dispatch: Dispatch;
  data: any;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
  listClassStudent: any;
  loadingGet: boolean;
};

const ModalPoint: FC<Props> = ({
  dispatch,
  data,
  isVisibleModal,
  setIsVisibleModal,
  listClassStudent,
  loadingGet
}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [pointStudent, setPointStudent] = useState<any>(null);
  useEffect(() => {
    if (loadingGet === true) {
      setLoading(true);
    }
    if (loadingGet === false) {
      setLoading(false);
    }
  }, [loadingGet, dispatch]);

  useEffect(() => {
    if(data) dispatch({
      type: "classManageAndDetail/getClassBytStudent",
      payload: {
        data: { idUser: data?.idUser}
      },
    });
  }, [dispatch, data])

  const onChangeValue = (value: any) => {
    setValue(value)
    dispatch({
      type: "classManageAndDetail/getPointStudent",
      payload: {
        data: {
          idUser: data?.idUser,
          idSubject: value
        }
      }
    }).then((res: any) => {
      setPointStudent([res?.data])
    })
  };

  const columns: any = [
    {
      title: "Điểm danh",
      dataIndex: "pointDiligence",
      align:'center',
    },
    {
      title: "Điểm giữa kì",
      dataIndex: "pointMidTerm",
      align:'center',
    },
    {
      title: "Điểm cuối kì",
      dataIndex: "pointEndTerm",
      align:'center',
    },
    {
      title: "Trung bình",
      dataIndex: "",
      align: "center",
      render: (value: any) => <b>{(value?.pointDiligence && value?.pointEndTerm && value?.pointMidTerm) ?
        Math.round((value?.pointDiligence*0.3 + (value?.pointEndTerm*0.3 + value?.pointMidTerm*0.7)*0.7)*100)/100 : 'Chưa có điểm'}</b> ,
    },
  ]

  return (
    <Modal
      title="Tra cứu điểm"
      visible={isVisibleModal}
      footer={null}
      closeIcon={
        <CloseOutlined
          onClick={() => {
            setIsVisibleModal(false);
            setPointStudent(null)
            setValue(null)
          }}
        />
      }
      centered
    >
  <>
        <Row>
          Chọn môn học:
        </Row>
        <Row className='mt--15'>
        <Select placeholder='Chọn môn học' value={value} className='w--full mb--15' onChange={(select) => onChangeValue(select)}>
            {listClassStudent?.data?.map((item: any) => <Option key={item.idSubject} value={item.idSubject}>{item.code} - {item.name}</Option>)}
    </Select>
    {pointStudent && <Table
        className='w--full'
        loading={loading}
        columns={columns}
        dataSource={pointStudent}
        pagination={false}
      ></Table>}
        </Row>
        <Divider />
          <Space className="w--full justify-content--flexEnd">
            <Button
              onClick={() => {
                setIsVisibleModal(false);
                setPointStudent(null)
                setValue(null)
              }}
            >
              <FormattedMessage id="button.close" />
            </Button>
          </Space>
 </>
    </Modal>
  );
};

export default connect(
  ({
    classManageAndDetail,
    loading
  }: {
    classManageAndDetail: ClassT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    listClassStudent: classManageAndDetail.listClassStudent,
    loadingGet: loading.effects["classManageAndDetail/getPointStudent"],
  })
)(ModalPoint);
