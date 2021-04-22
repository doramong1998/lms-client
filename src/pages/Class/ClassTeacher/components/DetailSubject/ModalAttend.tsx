import { FC, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Modal,
  Space,
  DatePicker,
  Table,
} from "antd";
import { Dispatch, formatMessage, history } from "umi";
import { connect, FormattedMessage, } from "umi";
import { CloseOutlined } from "@ant-design/icons";
import { SubjectT } from "../../data";
import moment from "moment";
import { TYPE_DATE } from "@/utils/utils";

type Props = {
  dispatch: Dispatch;
  data: any;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
  attendSubject: any
};

const ModalAttend: FC<Props> = ({
  dispatch,
  data,
  isVisibleModal,
  setIsVisibleModal,
  attendSubject
}) => {
  const [form] = Form.useForm();
  const [date, setDate] = useState(moment().format('DD/MM/YYYY'))
  useEffect(() => {
    if(data?.data?.idSubject){
      dispatch({
        type: "subjectManageAndDetail/getAttend",
        payload: {
          data: {
            date: moment().format(TYPE_DATE),
            idSubject: data?.data?.idSubject
          }
        }
      })
    }
  },[data])

  const onChangeAttend = (value: any) => {
    dispatch({
      type: "subjectManageAndDetail/postAttend",
      payload: {
        data: {
          date: date,
          idSubject: data?.data?.idSubject,
          idUser: value.idUser,
          value: value?.attend?.value ? !value?.attend?.value : true
        }
      }
    }).then((res: any) => {
      dispatch({
        type: "subjectManageAndDetail/getAttend",
        payload: {
          data: {
            date: date,
            idSubject: data?.data?.idSubject
          }
        }
      })
    })
  }

  const columns: any = [
    {
      title: "STT",
      dataIndex: "STT",
      align: "center",
      width: 70,
      render: (value: any, item: any, index: number) => index + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      width: 300,
    },
    {
      title: "Mã sinh viên",
      dataIndex: "studentId",
      align: "center",
      width: 200,
    },
    {
      title: "Điểm danh",
      dataIndex: "",
      align: "center",
      render: (value: any) => {
        return <Button type={value?.attend?.value ? 'dashed' : 'primary' } onClick={() => onChangeAttend(value)} danger={value?.attend?.value}>{value?.attend?.value ? 'Hủy' : 'Điểm danh'}</Button>
      },
    },
    
  ];

  const handleFinish = (values: any) => {
    dispatch({
      type: "subjectManageAndDetail/getDetailSubject",
      payload: {
        id: history.location.pathname.replace("/subject-manage/", ""),
      },
    });
    setIsVisibleModal(false);
    form.resetFields();
  }

  const onValuesChange = (values: any) => {
    if(values.hasOwnProperty('date')){
      setDate(moment(values.date).format(TYPE_DATE))
      dispatch({
        type: "subjectManageAndDetail/getAttend",
        payload: {
          data: {
            date: moment(values.date).format(TYPE_DATE),
            idSubject: data?.data?.idSubject
          }
        }
      })
    }
  }

  return (
    <Modal
      title="Điểm danh"
      visible={isVisibleModal}
      footer={null}
      closable={false}
      width={900}
      closeIcon={
        <CloseOutlined
          onClick={() => {
            setIsVisibleModal(false);
            form.resetFields();
          }}
        />
      }
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} onValuesChange={onValuesChange}>
        <Form.Item
          name="date"
          label="Chọn ngày học"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
          initialValue={moment()}
        >
          <DatePicker format='DD/MM/YYYY'/>
        </Form.Item>

        <Table
        rowKey={(item: any) => item.id}
        scroll={{y: 600}}
        columns={columns}
        dataSource={attendSubject?.data || []}
      ></Table>

        <Divider />
        <Form.Item className="mb--0">
          <Space className="w--full justify-content--flexEnd">
            <Button
              onClick={() => {
                setIsVisibleModal(false);
                form.resetFields();
              }}
            >
              <FormattedMessage id="button.cancel" />
            </Button>
            <Button htmlType="submit" type="primary">
              Xác nhận
            </Button>
          </Space>
        </Form.Item>
      </Form>
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
    attendSubject: subjectManageAndDetail.attendSubject,
  })
)(ModalAttend);
