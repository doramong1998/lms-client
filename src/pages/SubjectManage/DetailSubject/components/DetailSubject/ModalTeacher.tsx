import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Modal,
  Select,
  Space,
  Row,
} from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage } from "umi";
import { CloseOutlined } from "@ant-design/icons";
import { SubjectT } from "../../data";

const { Option } = Select;

type Props = {
  dispatch: Dispatch;
  listTeacher: any;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
  dataSubject: any;
};

const ModalCreateOrEdit: FC<Props> = ({
  dispatch,
  listTeacher,
  isVisibleModal,
  setIsVisibleModal,
  dataSubject
}) => {

  const [value, setValue] = useState<any>(undefined)
  useEffect(() => {
    dispatch({
      type: "subjectManageAndDetail/getListTeacher",
    });
  }, [dispatch])

  const handleFinish = () => {
    dispatch({
      type: "subjectManageAndDetail/changeTeacherSubject",
      payload: {
        data: {
          idUser: value,
          idSubject: dataSubject?.data?.idSubject
        }
      }
    }).then(() => {
      dispatch({
        type: "subjectManageAndDetail/getDetailSubject",
        payload: {
          id: dataSubject?.data?.id
        }
      });
      setValue(undefined)
      setIsVisibleModal(false)
    })
  };

  return (
    <Modal
      title="Thêm mới"
      visible={isVisibleModal}
      footer={null}
      closeIcon={
        <CloseOutlined
          onClick={() => {
            setIsVisibleModal(false);
            setValue(undefined)
          }}
        />
      }
      centered
    >
  <>
        <Row>
          Chọn giáo viên:
        </Row>
        <Row className='mt--15'>
        <Select placeholder='Chọn giáo viên' value={value} className='w--full' onChange={(select) => setValue(select)}>
            {listTeacher?.data?.map((item: any) => <Option key={item.id} value={item.idUser}>{item.fullName} - {item.phone}</Option>)}
    </Select>
        </Row>
        <Divider />
          <Space className="w--full justify-content--flexEnd">
            <Button
              onClick={() => {
                setIsVisibleModal(false);
                setValue(undefined)
              }}
            >
              <FormattedMessage id="button.cancel" />
            </Button>
            <Button onClick={()=> handleFinish()} type="primary">
              Thêm
            </Button>
          </Space>
 </>
    </Modal>
  );
};

export default connect(
  ({
    subjectManageAndDetail,
  }: {
    subjectManageAndDetail: SubjectT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    listTeacher: subjectManageAndDetail.listTeacher,
  })
)(ModalCreateOrEdit);
