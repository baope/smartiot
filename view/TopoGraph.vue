<template>
  <div class="topograph-box">
    <div>
      <b>上传拓扑文件：</b>
      <el-upload
        class="upload-demo"
        :ref="upload"
        drag
        action="127.0.0.1:3000/"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :limit="2"
        :file-list="fileList"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-change="onChange"
        :http-request="imgUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传txt文件</div>
      </el-upload>
    </div>
    <el-button @click="submit">上传</el-button>
    <el-image
      v-if="show"
      :src="image"
      style="width: 60%; height: 60%"
    ></el-image>
  </div>
</template>

<script>
import axios from "axios";
import { instance } from "@/http";

export default {
  data() {
    return {
      configData: {},
      fileList: [],
      image: "",
      show: false,
    };
  },
  methods: {
    onChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [file]; //这一步，是 展示最后一次选择文件
      }
      console.log(file);
    },
    beforeUpload(file) {
      this.configData = file;
      // let reader = new FileReader();
      // reader.readAsText(file);
      // let that = this;
      // reader.onload = () => {
      //   that.configData = reader.result;
      // };
    },
    async submit() {
      var formData = new FormData();
      formData.append("file", this.configData);
      console.log(this.configData);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let that = this;
      instance
        .post(`/topo`, formData, config, {
          responseType: "arraybuffer",
        })
        .then((res) => {
          instance
            .get(`/topo`, {
              responseType: "blob",
            })
            .then((res) => {
              console.log(res.data);
              let stream = res.data;
              this.image = window.URL.createObjectURL(stream);
              this.show = true;
            });
        });
    },
    imgUpload(info) {
      console.log("imgUpload", info);
    },
    beforeRemove(file) {
      console.log("remover", file);
    },
    handleExceed(file) {
      console.log("exceed", file);
    },
    handleSuccess(response, file, fileList) {
      console.log("success", response, file, fileList);
    },
    handleError(file) {
      console.log("Error", file);
    },
  },
};
</script>

<style lang="less" scoped>
.topograph-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  margin: 10px;
  padding-top: 30px;
  b {
    font-size: 20px;
  }
}
</style>