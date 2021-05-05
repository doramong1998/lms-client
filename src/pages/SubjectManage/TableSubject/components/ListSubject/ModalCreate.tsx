import { FC, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  InputNumber,
  Row,
  Col,
  Badge,
  Calendar
} from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage, useIntl } from "umi";
import { CloseOutlined } from "@ant-design/icons";
import { SubjectT } from "../../data";
import ModalAddCalendar from "./ModalAddCalendar";
import moment from "moment";

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
  const [isVisibleModalAdd, setIsVisibleModalAdd] = useState(false)
  const [calendar, setCalendar] = useState<any>([])
  const handleFinish = (values: any) => {
    if (data) {
      dispatch({
        type: "subjectManage/updateSubject",
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
          setCalendar([])
        }
      });
    } else {
      const calendarData = calendar?.map((item: any) => ({
        name: `${item?.shift} ${values?.code}: ${item.content}`,
        type: item?.type,
        time: item?.time,
        status: true
      }))
      dispatch({
        type: "subjectManage/createSubject",
        payload: {
          data: {
            ...values,
            calendar: calendarData,
            status: values.status === "true",
          },
        },
      }).then((res: any) => {
        if (res) {
          form.resetFields();
          setIsVisibleModal(false);
          setCalendar([])
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
      setCalendar(data?.calendar || [])
    }
  }, [data]);


  const getListData = (value: any) => {
    let listData: any = []
    calendar?.map((item: any) => {
      if(moment.unix(item?.time).format("DD/MM/YYYY") === moment(value).format('DD/MM/YYYY')){
        listData.push({
          type: item.type, content: `${item.shift} ${item.content}`
        })
      }
    })
    return listData
  }

  const dateCellRender = (value: any) => {
    const listData = getListData(value)
    return (
      <ul className="m--0 p--0">
        {listData.map((item: any) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  const onSelect = (date: any) => {
    // setSelectedDate(date.format('DD/MM/YYYY'))
    // setIsVisibleModalDate(true)
  }

  const onSetCalendar = (values: any) => {
    let newCalendar = [...calendar]
    newCalendar.push(values)
    setCalendar(newCalendar)
  }

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
            setCalendar([])
            form.resetFields();
          }}
        />
      }
      centered
      width={1200}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Row gutter={12}>
        <Col span={24} md={8}>
        <Form.Item
          name="name"
          label="Tên môn học"
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
          name="code"
          label="Mã môn học"
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
              <Option value={item.idUser} key={item.id}>{item.fullName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="lessonNum"
          label="Số tiết học"
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
          name="credit"
          label="Số tín chỉ"
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
                setCalendar([])
              }}
            >
              <FormattedMessage id="button.cancel" />
            </Button>
            <Button htmlType="submit" type="primary">
              <FormattedMessage id={data ? "button.update" : "button.create"} />
            </Button>
          </Space>
        </Form.Item>
     </Col>
        <Col span={24} md={16}>
        <Button
              onClick={() => {
                setIsVisibleModalAdd(true);
              }}
              type='primary'
            >
              Thêm lịch
            </Button>
            <Calendar dateCellRender={dateCellRender} onSelect={onSelect}/>
            
        </Col>
      </Row>
       </Form>
       <ModalAddCalendar isVisibleModal={isVisibleModalAdd} setIsVisibleModal={setIsVisibleModalAdd} setCalendar={onSetCalendar}/>
    </Modal>
  );
};

export default connect(
  ({
    subjectManage,
  }: {
    subjectManage: SubjectT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    listTeacher: subjectManage.listTeacher,
  })
)(ModalCreateOrEdit);
