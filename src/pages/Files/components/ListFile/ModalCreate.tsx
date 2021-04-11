import { FC, useEffect, useState } from "react";
import { Modal, Upload, message, Spin } from "antd";
import type { Dispatch } from "umi";
import { connect } from "umi";
import { CloseOutlined, InboxOutlined } from "@ant-design/icons";
import { KEY_API } from "@/utils/utils";

const { Dragger, LIST_IGNORE }: any = Upload;

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
        const form = new FormData()
        form.append('apikey', KEY_API)
        form.append('file',info.file)
        dispatch({
          type: "files/scanBeforeUpload",
          payload: {
            data: form,
          }
        }).then((res: any)=> {
          dispatch({
            type: "files/resultScan",
            payload: {
              query: res.resource,
            }
          }).then((res: any) => {
            if(res.positives !== 0){
              message.error('File chứa mã thực thi hoặc virus, vui lòng thử lại!')
            }
            else {
              message.success('Đã quét xong, đang upload file!')
              dispatch(({
                type: "files/createFile",
                payload: {
                  data: form
                }
              })).then((res: any) => {
                message.success(`File ${res?.data?.name} tải lên thành công.`);
                dispatch({
                  type: "files/getListFile",
                 
                });
                setIsVisibleModal(false);
              })
            }
          })
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
      <Spin spinning={loading} tip='Đang kiểm tra mã độc...'>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Chọn hoặc kéo tài liệu vào để tải lên</p>
        <p className="ant-upload-hint">
          Hỗ trợ tải một hoặc nhiều file cùng lúc
        </p>
      </Dragger>
      </Spin>
    
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
    loadingScan: loading.effects["files/scanBeforeUpload"],
    loadingGet: loading.effects["files/resultScan"],
  })
)(ModalCreateOrEdit);
