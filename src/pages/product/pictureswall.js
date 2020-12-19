import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqDeletePictures } from "../../api/index";
import React from "react";

const baseUrl = "/manage/img/upload";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  componentDidMount = () => {
    const { imgs } = this.props;

    if (imgs && imgs.length > 0) {
      const fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: "done",
        url: "/upload/" + img,
      }));
      this.setState({ fileList });
    }
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = async ({ file, fileList }) => {
    if (file.status === "done") {
      const result = file.response; //{status:0,data{name:"xxx,jpg",url:"url"}}
      if (result.status === 0) {
        message.success("upload successfully");
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error("upload failed");
      }
    } else if (file.status === "removed") {
      const result = await reqDeletePictures(file.name);
      if (result.status === 0) {
        message.success("delete succefully");
      } else {
        message.error("delete fialded");
      }
    }

    this.setState({ fileList });
  };
  //obtain all the uploaded pics
  getImgs = () => {
    return this.state.fileList.map((file) => file.name);
  };

  render() {
    const { imgs } = this.props;
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={baseUrl} //the api address to upload pics
          accept="image/*" //the type
          name="image" //the name of request param
          listType="picture-card"
          fileList={fileList} //uploaded pictures array
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
