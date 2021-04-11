import { FC, useEffect } from "react";
import {
  Button,
  Divider,
  Form,
  Modal,
  Space,
  DatePicker,
  Table,
} from "antd";
import { Dispatch, formatMessage } from "umi";
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
      width: 200,
    },
    {
      title: "Mã sinh viên",
      dataIndex: "studentId",
      align: "center",
      width: 180,
    },
    {
      title: "Điểm danh",
      dataIndex: "",
      align: "center",
      render: (value: any) => {
        return <Button danger={value?.attend?.value}>{value?.attend?.value ? 'Bỏ điểm danh' : 'Điểm danh'}</Button>
      },
    },
    
  ];

  console.log(attendSubject)

  const handleFinish = (values: any) => {
      // dispatch({
      //   type: "subjectManageAndDetail/updatePoint",
      //   payload: {
      //     data: {
      //       ...values,
      //       idUser: data?.idUser,
      //       idSubject: dataTable?.data?.idSubject,
      //       idPoint: data?.point?.idPoint
      //     },
      //   },
      // }).then((res: any) => {
      //   if (res) {
      //     form.resetFields();
      //     setIsVisibleModal(false);
      //   }
      // });
  }

  const onValuesChange = (values: any) => {
    // if(values.hasOwnProperty('date')){
    //   dispatch({
    //     type: "subjectManageAndDetail/getAttend",
    //     payload: {
    //       data: {
    //         date: moment(values.date).format(TYPE_DATE),
    //         idSubject: data?.data?.idSubject
    //       }
    //     }
    //   })
    // }
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
        // loading={loading}
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
