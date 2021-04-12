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
  loadingGet
}) => {
  const [loading, setLoading] = useState(false);
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
    if(data){
      dispatch({
        type: "classManageAndDetail/getPointStudent",
        payload: {
          data: {
            idUser: data?.idUser,
          }
        }
      }).then((res: any) => {
        setPointStudent(res?.data)
      })
    }
  }, [dispatch, data])

  const calcResult = (value: number, endPoint: number) => {
    if(value > 4 && endPoint > 4){
      return 'Đạt'
    } else return 'Học lại'
  }

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
    <Modal
      title="Tra cứu điểm"
      visible={isVisibleModal}
      footer={null}
      width={1200}
      closeIcon={
        <CloseOutlined
          onClick={() => {
            setIsVisibleModal(false);
            setPointStudent(null)
          }}
        />
      }
      centered
    >
  <>
   <Table
        className='w--full'
        loading={loading}
        columns={columns}
        dataSource={pointStudent}
        scroll={{y: 500}}
      ></Table>
    
        <Divider />
          <Space className="w--full justify-content--flexEnd">
            <Button
              onClick={() => {
                setIsVisibleModal(false);
                setPointStudent(null)
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
