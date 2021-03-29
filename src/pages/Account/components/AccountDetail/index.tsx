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
} from "antd";
import { Dispatch, formatMessage } from "umi";
import { connect, FormattedMessage } from "umi";
import { CameraOutlined, SaveOutlined } from "@ant-design/icons";
import type { AccountT, Account } from "../../data";

type Props = {
  dispatch: Dispatch;
  accountDetail: Account;
};

const ListNew: FC<Props> = ({ dispatch, accountDetail }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    if (accountDetail) {
      form.setFieldsValue(accountDetail.data);
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
            <Form
              form={form}
              onFinish={onFinish}
              labelCol={{ span: 5 }}
              labelAlign="left"
            >
              <Form.Item
                label={formatMessage({ id: "Account.firstName" })}
                name="firstName"
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
                label={formatMessage({ id: "Account.lastName" })}
                name="lastName"
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
                label={formatMessage({ id: "Account.gender" })}
                name="gender"
                rules={[
                  {
                    required: true,
                    message: formatMessage({
                      id: "form.formItem.required.message",
                    }),
                  },
                ]}
              >
                <Select className="w--full">
                  <Select.Option value="male">Nam</Select.Option>
                  <Select.Option value="female">Nữ</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={formatMessage({ id: "Account.dob" })}
                name="dob"
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
                label={formatMessage({ id: "Account.class" })}
                name="class"
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
                label={formatMessage({ id: "Account.studentId" })}
                name="studentId"
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
                label={formatMessage({ id: "Account.address" })}
                name="address"
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
                label={formatMessage({ id: "Account.phone" })}
                name="phone"
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
                label={formatMessage({ id: "Account.email" })}
                name="email"
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
                label={formatMessage({ id: "Account.permission" })}
                name="permission"
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
              <Divider dashed />
              <Form.Item noStyle>
                <Space className="w--full justify-content--flexEnd">
                  <Button htmlType="submit" type="primary">
                  <SaveOutlined/>&nbsp;<FormattedMessage id="button.save" />
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
  })
)(ListNew);
