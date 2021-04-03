import { FC, useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Row,
} from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage, useIntl } from "umi";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { AccountT } from "../../data";

const { Option } = Select;

type Props = {
  dispatch: Dispatch;
  data: any;
  listClass: any;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
};

const ModalCreateOrEdit: FC<Props> = ({
  dispatch,
  data,
  listClass,
  isVisibleModal,
  setIsVisibleModal,
}) => {
  const { formatMessage } = useIntl();
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    if (data) {
      dispatch({
        type: "accountManage/updateAccount",
        payload: {
          id: data?.id,
          data: {
            ...values,
            dob: moment(values.dob).format("DD/MM/YYYY"),
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
        type: "accountManage/createAccount",
        payload: {
          data: {
            ...values,
            dob: moment(values.dob).format("DD/MM/YYYY"),
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
        dob: moment(data.dob, "DD/MM/YYYY"),
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
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={12}>
          <Col span={24} md={12}>
            <Form.Item
              name="fullName"
              label="Họ và tên"
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
            {!data && (
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: formatMessage({
                      id: "form.formItem.required.message",
                    }),
                  },
                  {
                    min: 6,
                    max: 32,
                    message: "Độ dài mật khẩu từ 6 đến 32 kí tự",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            )}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "form.formItem.required.message",
                  }),
                },
                {
                  type: "email",
                  message: formatMessage({
                    id: "form.formItem.required.email",
                  }),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="dob"
              label="Ngày sinh"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "form.formItem.required.message",
                  }),
                },
              ]}
            >
              <DatePicker className="w--full" format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "form.formItem.required.message",
                  }),
                },
              ]}
            >
              <Select placeholder="Chọn giới tính" className="w--full">
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="username"
              label="Tài khoản"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "form.formItem.required.message",
                  }),
                },
              ]}
            >
              <Input disabled={data} />
            </Form.Item>
            {!data && (
              <Form.Item
                name="confirmPassword"
                label="Nhập lại mật khẩu"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: formatMessage({
                      id: "form.formItem.required.message",
                    }),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value && getFieldValue("password") !== value) {
                        return Promise.reject(
                          formatMessage({
                            id: "form.formItem.confirmPassword.message",
                          })
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            )}
            <Form.Item
              name="phone"
              label="Số điện thoại"
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
              name="address"
              label="Địa chỉ"
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
            <Form.Item name="studentId" label="Mã sinh viên">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col md={8} span={24}>
            <Form.Item
              name="idClass"
              label="Lớp"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "form.formItem.required.message",
                  }),
                },
              ]}
            >
              <Select placeholder="Chọn lớp học" className="w--full">
                {listClass?.data?.map((item: any) => (
                  <Option key={item.idClass} value={item.idClass}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            <Form.Item
              name="permissionId"
              label="Chức vụ"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "form.formItem.required.message",
                  }),
                },
              ]}
            >
              <Select placeholder="Chọn chức vụ" className="w--full">
                <Option value={1}>Quản trị viên</Option>
                <Option value={2}>Giáo viên</Option>
                <Option value={3}>Sinh viên</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            <Form.Item
              name="status"
              label="Trạng thái"
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
          </Col>
        </Row>

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
    accountManage,
  }: {
    accountManage: AccountT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    listClass: accountManage.listClass,
  })
)(ModalCreateOrEdit);
