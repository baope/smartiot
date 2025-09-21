<template>
  <div class="wraper" style="height: 819px; width: 100%; margin: 2vh 0.6vw">
    <el-container style="height: 100%">
      <!-- 头部 -->
      <el-header
        style="
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          text-align: left;
          display: flex;
          align-items: center;
          user-select: none;
          cursor: pointer;
          height: 100px;
          background-color: #6b80aa;
        "
      >
        <div
          class="fa el-icon-back"
          style="font-size: 2vw"
          @click="back_to_homepage()"
        ></div>
        <el-steps
          :active="active"
          finish-status="success"
          style="width: 100%; height: 100%; background-color: #6b80aa"
          simple
        >
          <el-step title="基本配置填写" icon="el-icon-edit"></el-step>
          <el-step title="详细信息填写" icon="el-icon-edit-outline"></el-step>
          <el-step title="确认填写信息" icon="el-icon-s-check"></el-step>
        </el-steps>
      </el-header>
      <el-container>
        <!-- 主体部分 -->
        <el-main
          style="
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
          "
        >
          <!-- 表单第一部分 -->
          <div class="formBody" id="form_first" v-show="choose_switch == 1">
            <h2 style="text-align: center">基本信息填写</h2>
            <div style="height: 1vh"></div>
            <el-form
              class="formBox-form"
              :model="form"
              :label-position="labelPosition"
              label-width="15vw"
              style="margin-left: 140px; margin-top: 100px; text-align: left"
            >
              <el-form-item label="配置名:">
                <el-input
                  v-model="form.name"
                  autocomplete="off"
                  clearable
                  auto-complete="on"
                  style="width: 35vw"
                  @input="handlerChange1()"
                  placeholder="请输入配置名"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="种类:">
                <el-select
                  v-model="form.kind"
                  filterable
                  placeholder="请选择种类"
                  autocomplete="off"
                  clearable
                  auto-complete="on"
                  style="width: 35vw"
                  @change="handlerChange2()"
                >
                  <el-option-group
                    v-for="group in options"
                    :key="group.label"
                    :label="group.label"
                  >
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
              <el-form-item label="节点数量:">
                <el-input
                  v-model="form.number"
                  autocomplete="off"
                  clearable
                  auto-complete="on"
                  style="width: 35vw"
                  @input="handlerChange3()"
                  placeholder="请输入节点数量"
                >
                </el-input>
              </el-form-item>
              <div style="height: 1vh"></div>
            </el-form>
            <el-upload
              class="upload-demo"
              drag
              :limit="1"
              action="https://jsonplaceholder.typicode.com/posts/"
              ref="upload"
              accept=".json"
              :file-list="fileList"
              :on-success="uploadSuccess"
              :on-remove="onRemove"
              :on-exceed="handleExceed"
              :on-preview="handlePreview"
              :on-change="onChange"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip" style="font-size: 15px">
                上传配置文件
              </div>
              <el-dialog
                :visible.sync="dialogPreviewJSON"
                title="JSON文件预览"
                v-if="dialogPreviewJSON"
                width="40%"
                append-to-body
              >
                <div>配置名: {{ this.jsonData.name }}</div>
                <div>种类: {{ this.jsonData.kind }}</div>
                <div>节点数量: {{ this.jsonData.number }}</div>
                <div>区块大小: {{ this.jsonData.size }}</div>
                <div>确认速度: {{ this.jsonData.speed }}</div>
                <div>仿真步长: {{ this.jsonData.step }}</div>
                <div>区块同步率: {{ this.jsonData.rate }}</div>
                <div>单位区块交易数:{{ this.jsonData.number_of_trade }}</div>
                <div>节点信息:{{ this.jsonData.nodes }}</div>
                <div>拓扑结构:{{ this.jsonData.edges }}</div>
              </el-dialog>
            </el-upload>
            <!-- 按钮部分 -->
            <div id="form_bottom">
              <el-button
                type="success"
                @click="go_to_page2"
                :disabled="
                  !this.iscontext1 || !this.iscontext3 || !this.iscontext2
                "
              >
                填写下一项
              </el-button>
              <el-button
                type="success"
                style="
                  background-color: royalblue;
                  outline-color: royalblue;
                  border-color: royalblue;
                "
                @click="addFile()"
                >提交文件</el-button
              >
            </div>
          </div>
          <!-- 表单第二部分 -->
          <div class="formBody" id="form_second" v-show="choose_switch == 2">
            <h2 style="text-align: center">详细配置填写</h2>
            <div style="height: 1vh"></div>
            <el-form
              class="formBox-form"
              :model="form"
              :label-position="labelPosition"
              label-width="15vw"
              style="margin-left: 140px; margin-top: 70px; text-align: left"
            >
              <el-form-item label="区块大小:">
                <el-input
                  v-model="form.size"
                  autocomplete="off"
                  clearable
                  auto-complete="on"
                  style="width: 35vw"
                  @input="handlerChange4()"
                  placeholder="请输入区块大小"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="确认速度:">
                <el-input
                  v-model="form.speed"
                  autocomplete="off"
                  clearable
                  auto-complete="on"
                  style="width: 35vw"
                  @input="handlerChange5()"
                  placeholder="请输入确认速度"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="仿真步长:">
                <el-input
                  v-model="form.step"
                  autocomplete="off"
                  clearable
                  auto-complete="on"
                  style="width: 35vw"
                  @input="handlerChange6()"
                  placeholder="请输入仿真步长"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="区块同步率:">
                <el-input
                  v-model="form.rate"
                  autocomplete="off"
                  clearable
                  auto-complete="on"
                  style="width: 35vw"
                  @input="handlerChange7()"
                  placeholder="请输入区块同步率"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="单位区块交易数:">
                <el-input
                  v-model="form.number_of_trade"
                  autocomplete="off"
                  clearable
                  auto-complete="on"
                  style="width: 35vw"
                  @input="handlerChange8()"
                  placeholder="请输入单位区块交易数"
                ></el-input>
              </el-form-item>
            </el-form>
            <div id="form_bottom">
              <el-button type="warning" @click="go_to_page1"
                >返回上一页</el-button
              >
              <el-button
                type="success"
                @click="go_to_page3"
                :disabled="
                  !this.iscontext2 ||
                  !this.iscontext4 ||
                  !this.iscontext5 ||
                  !this.iscontext6 ||
                  !this.iscontext7 ||
                  !this.iscontext8
                "
              >
                确认填写信息
              </el-button>
            </div>
          </div>
          <!-- 确认部分 -->
          <div id="confirm" v-show="choose_switch == 3">
            <h2 style="text-align: center">确认填写信息</h2>
            <el-descriptions
              title="填写信息"
              direction="vertical"
              :column="2"
              border
              style="margin-top: 5vh"
            >
              <el-descriptions-item label="配置名">{{
                this.form.name
              }}</el-descriptions-item>
              <el-descriptions-item label="种类">{{
                this.form.kind
              }}</el-descriptions-item>
              <el-descriptions-item label="节点数量">{{
                this.form.number
              }}</el-descriptions-item>
              <el-descriptions-item label="区块大小">{{
                this.form.size
              }}</el-descriptions-item>
              <el-descriptions-item label="确认速度">{{
                this.form.speed
              }}</el-descriptions-item>
              <el-descriptions-item label="仿真步长">{{
                this.form.step
              }}</el-descriptions-item>
              <el-descriptions-item label="区块同步率">{{
                this.form.rate
              }}</el-descriptions-item>
              <el-descriptions-item label="单位区块交易数">{{
                this.form.number_of_trade
              }}</el-descriptions-item>
            </el-descriptions>
            <div id="form_bottom">
              <el-button type="info" @click="go_to_page2">返回修改</el-button>
              <el-button type="success" @click="addList()">提交</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Input } from "element-ui";

import axios from "axios";
import G6 from "@antv/g6";
import qs from "qs";
import { config } from "shelljs";

export default {
  name: "AddNodes",
  data() {
    return {
      form: {
        name: "",
        kind: "",
        number: "",
        size: "",
        speed: "",
        step: "",
        rate: "",
        number_of_trade: "",
        edges: [],
        nodes: [],
      },

      options: [
        {
          label: "真实网络场景",
          options: [
            {
              value: "0",
              label: "Internet Topology Zoo",
            },
            {
              value: "4",
              label: "CAIDA",
            },
            {
              value: "5",
              label: "CERNET",
            },
            {
              value: "6",
              label: "Euro-IX",
            },
          ],
        },
        {
          label: "仿真网络配置",
          options: [
            {
              value: "1",
              label: "无标度网络",
            },
            {
              value: "2",
              label: "随机网络",
            },
            {
              value: "3",
              label: "小世界网络",
            },
            {
              value: "7",
              label: "全连接网络",
            },
          ],
        },
      ],
      value: "",
      space: "80vw",
      active: 0,
      labelPosition: "right",
      currentRow: this.$route.query.currentRow,
      iscontext1: false,
      iscontext2: false,
      iscontext3: false,
      iscontext4: false,
      iscontext5: false,
      iscontext6: false,
      iscontext7: false,
      iscontext8: false,
      isMove: false,
      fileList: [],
      uploadData: [],
      jsonData: null,
      dialogPreviewJSON: false,

      choose_switch: 1,
      switch_of_step: 1,
      notice: "切换为上传配置文件",
    };
  },

  methods: {
    Add_List() {
      console.log(this.form.kind);
      if (this.form.kind == "自定义网络") {
        this.form.kind = 10;
        axios
          .put(
            "http://r1895.cn:8080/api/config/network/selfdefine",
            qs.stringify(
              {
                name: this.form.name,
                kind: this.form.kind,
                number: this.form.number,
                size: this.form.size,
                speed: this.form.speed,
                step: this.form.step,
                rate: this.form.rate,
                number_of_trade: this.form.number_of_trade,
                edges: this.form.edges,
              },
              {
                arrayFormat: "repeat",
              }
            )
          )
          .then((response) => {
            console.log(typeof response.data);
            if (response.data == "This name already exists") {
              this.$message.error("配置名已存在！");
            } else {
              this.$message.success("新增配置成功！");
              this.$router.go(-1);
            }
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
            this.$message.error("新增配置失败！");
          });
      } else {
        if (this.form.kind == "无标度网络") {
          this.form.kind = 1;
        }
        if (this.form.kind == "随机生成网络") {
          this.form.kind = 2;
        }
        if (this.form.kind == "小世界网络") {
          this.form.kind = 3;
        }
        axios
          .post(
            "http://r1895.cn:8080/api/config/network/",
            qs.stringify({
              name: this.form.name,
              kind: this.form.kind,
              number: this.form.number,
              size: this.form.size,
              speed: this.form.speed,
              step: this.form.step,
              rate: this.form.rate,
              number_of_trade: this.form.number_of_trade,
            })
          )
          .then((response) => {
            console.log(typeof response.data);
            if (response.data == "This name already exists") {
              this.$message.error("配置名已存在！");
            } else {
              this.$message.success("新增配置成功！");
              this.$router.go(-1);
            }
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
            this.$message.error("新增配置失败！");
          });
      }
    },

    handlerChange1(e) {
      if (this.form.name != "") {
        this.iscontext1 = true;
        console.log(`1`, this.iscontext1);
      } else {
        this.iscontext1 = false;
        console.log(this.iscontext1);
      }
    },
    handlerChange2(e) {
      if (this.form.kind != "") {
        this.iscontext2 = true;
        console.log(`2`, this.iscontext2);
        if (this.form.kind == "自定义网络") {
          return;
        }
        if (this.form.kind == "0") {
          this.form.number = 2560;
          this.iscontext3 = true;
        }
        if (this.form.kind == "4") {
          this.form.number = 2446;
          this.iscontext3 = true;
        }
        if (this.form.kind != "0" && this.form.kind != "4") {
          this.form.number = "";
        }
      } else {
        this.iscontext2 = false;
        console.log(this.iscontext2);
      }
    },
    handlerChange3(e) {
      if (this.form.number != "") {
        this.iscontext3 = true;
        console.log(`3`, this.iscontext3);
      } else {
        this.iscontext3 = false;
        console.log(this.iscontext3);
      }
    },
    handlerChange4(e) {
      if (this.form.size != "") {
        this.iscontext4 = true;
        console.log(`4`, this.iscontext4);
      } else {
        this.iscontext4 = false;
        console.log(this.iscontext4);
      }
    },
    handlerChange5(e) {
      if (this.form.speed != "") {
        this.iscontext5 = true;
        console.log(`5`, this.iscontext5);
      } else {
        this.iscontext5 = false;
        console.log(this.iscontext5);
      }
    },
    handlerChange6(e) {
      if (this.form.step != "") {
        this.iscontext6 = true;
        console.log(`6`, this.iscontext6);
      } else {
        this.iscontext6 = false;
        console.log(this.iscontext6);
      }
    },
    handlerChange7(e) {
      if (this.form.rate != "") {
        this.iscontext7 = true;
        console.log(`7`, this.iscontext7);
      } else {
        this.iscontext7 = false;
        console.log(this.iscontext7);
      }
    },
    handlerChange8(e) {
      if (this.form.number_of_trade != "") {
        this.iscontext8 = true;
        console.log(`8`, this.iscontext8);
      } else {
        this.iscontext8 = false;
        console.log(this.iscontext8);
      }
    },
    onChange(file, fileList) {
      this.fileList = fileList;
    },
    uploadSuccess: function (data, file, fileList) {
      this.fileObj = data;
      this.fileList = fileList;
      this.active = 2;
      console.log(this.fileList.length);
      let reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = (e) => {
        // this.uploadData = [];
        this.jsonData = JSON.parse(e.target.result);
      };
    },
    addList() {
      if (
        this.iscontext1 &&
        this.iscontext2 &&
        this.iscontext3 &&
        this.iscontext4 &&
        this.iscontext5 &&
        this.iscontext6 &&
        this.iscontext7 &&
        this.iscontext8
      ) {
        this.isMove = true;
        if (this.form.number < 10 && this.form.kind == 1) {
          this.$message.error("无标度网络至少需要10个节点!");
        }
        this.Add_List();
      } else {
        alert("请填写必要的内容！");
      }
    },
    addFile() {
      if (this.fileList != 0) {
        this.isMove = true;
        var name = this.jsonData.name;
        var kind = this.jsonData.kind;
        var number = this.jsonData.number;
        var speed = this.jsonData.speed;
        var size = this.jsonData.size;
        var step = this.jsonData.step;
        var rate = this.jsonData.rate;
        var number_of_trade = this.jsonData.number_of_trade;
        var edges = new Array();

        for (let i = 0; i < this.jsonData.edges.length; i++) {
          edges.push(
            JSON.stringify({
              source: this.jsonData.edges[i].source,
              target: this.jsonData.edges[i].target,
            })
          );
        }

        this.form.name = name;
        this.form.kind = kind;
        this.form.number = number;
        this.form.speed = speed;
        this.form.size = size;
        this.form.step = step;
        this.form.rate = rate;
        this.form.number_of_trade = number_of_trade;
        this.form.edges = edges;

        this.handlerChange1();
        this.handlerChange2();
        this.handlerChange3();
        this.handlerChange4();
        this.handlerChange5();
        this.handlerChange6();
        this.handlerChange7();
        this.handlerChange8();
      } else {
        this.$message.warning(`请上传配置文件!`);
      }
    },

    go_to_page2() {
      this.choose_switch = 2;
    },
    go_to_page1() {
      this.choose_switch = 1;
    },
    go_to_page3() {
      this.choose_switch = 3;
    },
    back_to_homepage() {
      this.form = {};
      this.$router.go(-1);
    },

    // 上传文件超出文件数量限制/文件格式不符合要求时
    handleExceed(files, fileList) {
      this.$message.warning(`每次只能导入一个json文件!`);
    },

    // 文件上传成功
    onSuccess(res, file, fileList) {
      let reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = (e) => {
        // this.uploadData = [];
        this.jsonData = JSON.parse(e.target.result);
      };
    },

    // 移除文件
    onRemove(file) {
      this.fileList = [];
    },

    //预览文件
    handlePreview(file) {
      let reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = (e) => {
        this.jsonData = JSON.parse(e.target.result);
        this.dialogPreviewJSON = true;
      };
    },
  },

  watch: {
    iscontext3(newContext, oldContext) {
      if (this.iscontext1 && this.iscontext3) {
        // console.log(`yaeifthdfiughoiue`);
        this.active = 1;
      } else {
        this.active = 0;
      }
    },
    iscontext8() {
      if (
        this.iscontext1 &&
        this.iscontext2 &&
        this.iscontext3 &&
        this.iscontext4 &&
        this.iscontext5 &&
        this.iscontext6 &&
        this.iscontext7 &&
        this.iscontext8
      ) {
        this.active = 2;
      }
    },
  },
};
</script>

<style>
.el-header {
  background-color: #606266;
  color: #ffffff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #c6ced8;
  color: #333;
  text-align: center;
  /* display: flex; */
  /* line-height: 200px; */
}

.el-main {
  background-color: #ffffff;
  color: #333;
  padding-left: 10px;
  text-align: center;
  /* line-height: 160px; */
}

#bottom {
  text-align: center;
}

#upload {
  text-align: center;
  margin-bottom: 50px;
}

#title {
  float: left;
}

#back_bottom {
  float: right;
}

#form_bottom {
  text-align: center;
  margin-top: 5vh;
}
</style>
