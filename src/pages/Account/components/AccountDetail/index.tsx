/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Divider,
  Avatar,
  Card,
  Upload,
  Form,
  Input,
  Select,
  Space,
  DatePicker,
} from "antd";
import { Dispatch, formatMessage } from "umi";
import { connect, FormattedMessage } from "umi";
import { CameraOutlined, SaveOutlined } from "@ant-design/icons";
import type { AccountT, Account } from "../../data";
import moment from "moment";

const { Option } = Select;
type Props = {
  dispatch: Dispatch;
  accountDetail: Account;
  listClass: any;
};

const ListNew: FC<Props> = ({ dispatch, accountDetail, listClass }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    dispatch({
      type: "account/updateAccount",
      payload: {
        data: {
          ...values,
          dob: moment(values.dob).format("DD/MM/YYYY"),
          status: values.status === "true",
        },
      },
    }).then((res: any) => {
      dispatch({
        type: "account/getAccount",
      });
    })
  };

  useEffect(() => {
    dispatch({
      type: "account/getListClass",
    });
  }, [dispatch]);

  useEffect(() => {
    if (accountDetail) {
      form.setFieldsValue({
        ...accountDetail.data,
        dob: moment(accountDetail.data?.dob, "DD/MM/YYYY"),
        status: accountDetail.data?.status ? "true" : "false",
      });
    }
  }, [accountDetail]);

  return (
    <>
      <div className="layout--main__title">
        <FormattedMessage id="Account.accountDetail" />
      </div>
      <Divider />
      <Row gutter={24} className="mb--24">
        <Col span={24} md={6}>
          <Card bodyStyle={{ textAlign: "center" }}>
            <Avatar size={200} src={accountDetail?.data?.avatar} />
            <div className="mt--24">
              <Upload
                accept="image/*"
                // onChange={onUploadImage}
                beforeUpload={() => false}
                showUploadList={false}
              >
                <Button icon={<CameraOutlined />} type="primary">
                  Tải ảnh lên
                </Button>
              </Upload>
            </div>
          </Card>
        </Col>
        <Col md={18}>
          <Card>
            <Form form={form} layout="vertical" onFinish={onFinish}>
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
                    <Input disabled />
                  </Form.Item>
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
                    <Input disabled />
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
                    <Select disabled placeholder="Chọn lớp học" className="w--full">
                      {listClass?.data?.map((item: any) => (
                        <Option key={item.idClass} value={item.idClass}>
                          {item.name}
                        </Option>
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
                    <Select
                      placeholder="Chọn chức vụ"
                      disabled
                      className="w--full"
                    >
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
                    <Select
                      disabled
                      placeholder="Chọn trạng thái"
                      className="w--full"
                    >
                      <Option value="true">Hoạt động</Option>
                      <Option value="false">Khóa</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Divider />
              <Form.Item className="mb--0">
                <Space className="w--full justify-content--flexEnd">
                  <Button htmlType="submit" type="primary">
                    <SaveOutlined />
                    &nbsp;
                    <FormattedMessage id="button.save" />
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default connect(
  ({
    account,
    loading,
  }: {
    account: AccountT;
    loading: { effects: Record<string, boolean> };
  }) => ({
    accountDetail: account.detailAccount,
    listClass: account.listClass,
  })
)(ListNew);
