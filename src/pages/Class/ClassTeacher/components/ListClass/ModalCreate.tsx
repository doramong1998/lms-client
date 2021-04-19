import { FC, useEffect } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  InputNumber,
} from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage, useIntl } from "umi";
import { CloseOutlined } from "@ant-design/icons";
import { ClassT } from "../../data";

const { Option } = Select;

type Props = {
  dispatch: Dispatch;
  data: any;
  listTeacher: any;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
};

const ModalCreateOrEdit: FC<Props> = ({
  dispatch,
  data,
  listTeacher,
  isVisibleModal,
  setIsVisibleModal,
}) => {
  const { formatMessage } = useIntl();
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    if (data) {
      dispatch({
        type: "classManage/updateClass",
        payload: {
          id: data?.id,
          data: {
            ...values,
            status: values.status === "true",
          },
        },
      }).then((res: any) => {
        if (res) {
          form.resetFields();
          setIsVisibleModal(false);
        }
      });
    } else {
      dispatch({
        type: "classManage/createClass",
        payload: {
          data: {
            ...values,
            status: values.status === "true",
          },
        },
      }).then((res: any) => {
        if (res) {
          form.resetFields();
          setIsVisibleModal(false);
        }
      });
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        status: data.status ? "true" : "false",
      });
    }
  }, [data]);

  return (
    <Modal
      title={formatMessage({
        id: !data ? "button.create" : "button.update",
      })}
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
          name="name"
          label="Tên lớp học"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="idTeacher"
          label="Giáo viên quản lý"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <Select placeholder="Chọn giáo viên" className="w--full">
            {listTeacher?.data?.map((item: any) => (
              <Option key={item.idUser} value={item.idUser}>{item.fullName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="studentNum"
          label="Số lượng sinh viên"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <InputNumber className="w--full" />
        </Form.Item>
        <Form.Item
          name="totalStudent"
          label="Số lượng sinh viên tối đa"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <InputNumber className="w--full" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Trạng thái"
          initialValue="true"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <Select placeholder="Chọn trạng thái" className="w--full">
            <Option value="true">Hoạt động</Option>
            <Option value="false">Khóa</Option>
          </Select>
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
