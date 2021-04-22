import { FC, useEffect, useState } from "react";
import { Modal, Upload, message, Spin } from "antd";
import type { Dispatch } from "umi";
import { connect } from "umi";
import { CloseOutlined, InboxOutlined } from "@ant-design/icons";

const { Dragger }: any = Upload;

type Props = {
  dispatch: Dispatch;
  loadingScan: boolean;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
  idClass: any
};

const ModalCreateOrEdit: FC<Props> = ({
  dispatch,
  loadingScan,
  isVisibleModal,
  setIsVisibleModal,
  idClass
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if ( loadingScan === true) {
      setLoading(true);
    }
    if (loadingScan === true) {
      setLoading(false);
    }
  }, [ dispatch, loadingScan]);

  const props = {
    name: "file",
    multiple: false,
    showUploadList: false,
    beforeUpload: () => false,
    onChange: (info: any) => {
        message.info('Đang kiểm tra file...')
        const form = new FormData()
        form.append('file',info.file)
        form.append('idClass',idClass)
        dispatch({
          type: "classAndTeacher/uploadFile",
          payload: {
            data: form,
          }
        }).then((res: any) => {
          setIsVisibleModal(false);
        })
    },
  };

  return (
    <Modal
      title="Tải file lên"
      visible={isVisibleModal}
      footer={null}
      closeIcon={
        <CloseOutlined
          onClick={() => {
            setIsVisibleModal(false);
          }}
        />
      }
      width={600}
      destroyOnClose
      centered
    >
      <Dragger {...props}>
      <Spin spinning={loading} tip='Đang kiểm tra mã độc...'>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Chọn hoặc kéo tài liệu vào để tải lên</p>
        <p className="ant-upload-hint">
          Hỗ trợ tải một hoặc nhiều file cùng lúc
        </p>
        </Spin>
      </Dragger>
     
    
    </Modal>
  );
};
export default connect(
  ({
    loading,
  }: {
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    loadingScan: loading.effects["classAndTeacher/uploadFile"],
  })
)(ModalCreateOrEdit);
