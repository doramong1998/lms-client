import { FC, useEffect, useState } from "react";
import { Modal, Upload, message, Spin } from "antd";
import type { Dispatch } from "umi";
import { connect } from "umi";
import { CloseOutlined, InboxOutlined } from "@ant-design/icons";

const { Dragger }: any = Upload;

type Props = {
  dispatch: Dispatch;
  data: any;
  loadingScan: boolean;
  loadingGet: boolean;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
};

const ModalCreateOrEdit: FC<Props> = ({
  dispatch,
  data,
  loadingGet,
  loadingScan,
  isVisibleModal,
  setIsVisibleModal,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loadingGet === true || loadingScan === true) {
      setLoading(true);
    }
    if (loadingGet === false || loadingScan === true) {
      setLoading(false);
    }
  }, [loadingGet, dispatch, loadingScan]);

  const props = {
    name: "file",
    multiple: false,
    showUploadList: false,
    // action: "http://localhost:3000/api/upload/media",
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
    beforeUpload: () => false,
    onChange: (info: any) => {
        message.info('Đang kiểm tra file...')
        const form = new FormData()
        form.append('file',info.file)
        dispatch(({
          type: "files/createFile",
          payload: {
            data: form
          }
        })).then((res: any) => {
          dispatch({
            type: "files/getListFile",
          });
          setIsVisibleModal(false)
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
    loadingScan: loading.effects["files/createFile"],
    loadingGet: loading.effects["files/getListFile"],
  })
)(ModalCreateOrEdit);
