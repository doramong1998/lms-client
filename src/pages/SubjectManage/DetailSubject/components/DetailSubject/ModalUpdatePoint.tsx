import { FC, useEffect } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Space,
  InputNumber,
} from "antd";
import { Dispatch, formatMessage } from "umi";
import { connect, FormattedMessage, } from "umi";
import { CloseOutlined } from "@ant-design/icons";
import { SubjectT } from "../../data";

type Props = {
  dispatch: Dispatch;
  data: any;
  dataTable: any;
  listTeacher: any;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
};

const ModalPoint: FC<Props> = ({
  dispatch,
  data,
  dataTable,
  isVisibleModal,
  setIsVisibleModal,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
      dispatch({
        type: "subjectManageAndDetail/updatePoint",
        payload: {
          data: {
            ...values,
            idUser: data?.idUser,
            idSubject: dataTable?.data?.idSubject,
            idPoint: data?.point?.idPoint
          },
        },
      }).then((res: any) => {
        if (res) {
          form.resetFields();
          setIsVisibleModal(false);
        }
      });
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        pointDiligence: data?.point?.pointDiligence,
        pointMidTerm: data?.point?.pointMidTerm,
        pointEndTerm: data?.point?.pointEndTerm,
      });
    }
  }, [data]);

  return (
    <Modal
      title="Cập nhập điểm"
      visible={isVisibleModal}
      footer={null}
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
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="fullName"
          label="Sinh viên"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item
          name="studentId"
          label="Mã sinh viên"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
         <Input disabled></Input>
        </Form.Item>

        <Form.Item
          name="pointDiligence"
          label="Điểm danh"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <InputNumber min={0} max={10} className="w--full" />
        </Form.Item>
        <Form.Item
          name="pointMidTerm"
          label="Điểm giữa kì"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <InputNumber  min={0} max={10} className="w--full" />
        </Form.Item>
        <Form.Item
          name="pointEndTerm"
          label="Điểm cuối kì"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <InputNumber  min={0} max={10} className="w--full" />
        </Form.Item>
       
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
              <FormattedMessage id={data ? "button.update" : "button.create"} />
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
  })
)(ModalPoint);
