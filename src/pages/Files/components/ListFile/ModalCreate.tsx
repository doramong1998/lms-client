import { FC } from "react";
import { Modal, Upload, message } from "antd";
import type { Dispatch } from "umi";
import { connect, useIntl } from "umi";
import { CloseOutlined, InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

type Props = {
  dispatch: Dispatch;
  data: any;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
};

const ModalCreateOrEdit: FC<Props> = ({
  dispatch,
  data,
  isVisibleModal,
  setIsVisibleModal,
}) => {
  const { formatMessage } = useIntl();

  const props = {
    name: "file",
    multiple: true,
    action: "http://localhost:3000/api/upload/media",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    onChange: (info: any) => {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`File ${info.file.name} tải lên thành công.`);
        dispatch({
          type: "files/getListFile",
        });
      } else if (status === "error") {
        message.error(`File ${info.file.name} tải lên thất bại.`);
      }
    },
  };

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
          }}
        />
      }
      centered
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Chọn hoặc kéo tài liệu vào để tải lên</p>
        <p className="ant-upload-hint">
          Hỗ trợ tải một hoặc nhiều file cùng lúc
        </p>
      </Dragger>
    </Modal>
  );
};
export default connect()(ModalCreateOrEdit);
