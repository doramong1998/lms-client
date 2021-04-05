import React, { FC, useRef, useState } from "react";
import { Modal, Row, Col, Image, Button, Slider } from "antd";
import { connect } from "umi";
import {
  CloseOutlined,
  DownloadOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
// import { Document, Page } from "react-pdf";
import FileViewer from "react-file-viewer";
import ReactPlayer from "react-player";
import { saveAs } from "file-saver";
// import { getParamsFromUrl } from "@/utils/utils";

type Props = {
  data: any;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
};

const ModalCreateOrEdit: FC<Props> = ({
  data,
  isVisibleModal,
  setIsVisibleModal,
}) => {
  const [play, setPlay] = useState(false);
  const [percent, setPercent] = useState(0);
  // const [total, setTotal] = useState(0);
  const player: any = useRef();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const renderFile = () => {
    if (data?.type.indexOf("image") !== -1) {
      return <Image width={600} src={data?.url} />;
    } else if (data?.type.indexOf("video") !== -1) {
      return (
        <ReactPlayer
          url={data?.url}
          playing={play}
          ref={player}
          onEnded={() => setPlay(false)}
          onProgress={(value: any) => setPercent(value.played)}
        />
      );
    } else {
      switch (data?.type) {
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          return <FileViewer fileType="docx" filePath={data?.url}></FileViewer>;
        case "application/pdf":
          return <FileViewer fileType="pdf" filePath={data?.url}></FileViewer>;
        // return (
        //   <Document
        //     file={{url: data?.url,httpHeaders: getParamsFromUrl(data.url) }}
        //     onLoadSuccess={(values: any) => setNumPages(values.numPages)}
        //   >
        //     <Page pageNumber={pageNumber} />
        //   </Document>
        // );
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          return <FileViewer fileType="csv" filePath={data?.url}></FileViewer>;
        default:
          return null;
      }
    }
  };

  const renderButton = () => {
    if (data?.type.indexOf("image") !== -1) {
      return (
        <Row gutter={12} justify="center" className="mt--10">
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => saveAs(data.url, data.name)}
          ></Button>
        </Row>
      );
    } else if (data?.type.indexOf("video") !== -1) {
      return (
        <Row gutter={12} justify="center" align="middle" className="mt--10">
          <Col span={20}>
            <PlayCircleOutlined
              onClick={() => setPlay(true)}
              style={{ fontSize: "30px", color: `${play ? "#27ae60" : ""}` }}
            />
            &nbsp;
            <PauseCircleOutlined
              onClick={() => setPlay(false)}
              style={{ fontSize: "30px", color: `${!play ? "#27ae60" : ""}` }}
            />
            &nbsp;
            <Slider
              value={percent * 100}
              onChange={(value: any) => {
                setPercent(value / 100);
                player?.current?.seekTo(parseFloat((value / 100).toString()));
              }}
              tipFormatter={null}
             
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              style={{ float: "right" }}
              icon={<DownloadOutlined />}
              onClick={() => saveAs(data.url, data.name)}
            ></Button>
          </Col>
        </Row>
      );
    } else {
      switch (data?.type) {
        case "application/pdf":
          return (
            <Row gutter={12} justify="center" align="middle" className="mt--10">
              <Col span={12}>
                <Button
                  onClick={() =>
                    setPageNumber(
                      pageNumber === 1 ? pageNumber : pageNumber - 1
                    )
                  }
                  icon={<LeftOutlined />}
                ></Button>
                &nbsp;
                <Button
                  onClick={() =>
                    setPageNumber(
                      pageNumber === numPages ? pageNumber : pageNumber + 1
                    )
                  }
                  icon={<RightOutlined />}
                ></Button>
              </Col>
              <Col span={6}>
                Trang {pageNumber} / {numPages}
              </Col>
              <Col span={6}>
                <Button
                  type="primary"
                  style={{ float: "right" }}
                  icon={<DownloadOutlined />}
                  onClick={() => saveAs(data.url, data.name)}
                ></Button>
              </Col>
            </Row>
          );
        default:
          return null;
      }
    }
  };

  return (
    <Modal
      title={data?.name}
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
      width={700}
    >
      <Row justify="center">{renderFile()}</Row>
      <div className="w--full">{renderButton()}</div>
    </Modal>
  );
};
export default connect()(ModalCreateOrEdit);
