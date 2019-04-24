<template>
  <div>
    <div>
      <Button type="primary" icon="ios-add" @click="add">新增</Button>
      <Input placeholder="一键添加代理人" v-model="addAgent" style="width: auto;margin-left: 20px">
      <Icon type="ios-contact" slot="prefix"/>
      </Input>
      <Button type="primary" icon="ios-add" @click="addSimple">添加</Button>
      <Modal transfer scrollable :mask-closable="false" @on-ok="saveRebackLogConfig" v-model="show" ok-text="保存"
             title="策略配置">
        <Form :model="FormList">
          <FormItem label="代理人名称:">
            <Input v-model="FormList.tlAgent"/>
          </FormItem>
          <FormItem label="发送地址:">
            <Input v-model="FormList.sendUrl"/>
          </FormItem>
          <FormItem label="是否有效:">
            <Select v-model="FormList.isUsed" style="width: auto">
              <Option v-for="item in FormList.usedList" :value="item.value" :key="item.value">{{
                item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="是否备用:">
            <Select v-model="FormList.isSpare" style="width: auto">
              <Option v-for="item in FormList.spareList" :value="item.value" :key="item.value">{{
                item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="描述:">
            <Input v-model="FormList.msgDesc"/>
          </FormItem>
          <FormItem label="推送次数:">
            <Input v-model="FormList.times"/>
          </FormItem>
          <FormItem label="是否需要token:">
            <Select v-model="FormList.isAccount" style="width: auto">
              <Option v-for="item in FormList.accountList" :value="item.value" :key="item.value">{{
                item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="tokenUrl:">
            <Input v-model="FormList.tokenUrl"/>
          </FormItem>
          <FormItem label="时间间隔:">
            <Input v-model="FormList.timeinterval"/>
          </FormItem>
          <FormItem label="推送类型">
            <Select v-model="FormList.tlSendType" style="width: auto">
              <Option v-for="item in FormList.sendTypeList" :value="item.value" :key="item.value">{{
                item.label }}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
      <Modal transfer scrollabl @on-ok="deleteConfim" v-model="showDelete" ok-text="确定"
             title="提示">确认删除该选项吗？
      </Modal>
    </div>
    <Table border :loading="loading" :columns="listColumn"
           :data="list"></Table>
    <div>
      <Page :total="total" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
            placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
    </div>
  </div>
</template>


<script>
  import {addPulsUrl, delPulsUrl, pulsUrlList, setPulsUrl, addAgentSimple} from '@/api/data'

  export default {
    data() {
      return {
        show: false,
        showDelete: false,
        deleteKey: '',
        searchParam: '',
        total: 0,
        pageNum: 1,
        pageSize: 10,
        isUpdate: false,
        loading: true,

        addAgent: '',

        FormList: {
          isAccount: 1,
          isSpare: 0,
          isUsed: 1,
          msgDesc: "",
          passworld: "",
          timeinterval: "",
          tlAgent: "",
          times: "",
          tokenUrl: "",
          tlSendType: "",
          sendUrl: "",

          usedList: [
            {
              value: 1,
              label: "有效"
            },
            {
              value: 0,
              label: "无效"
            }
          ],
          accountList: [
            {
              value: 1,
              label: "是"
            },
            {
              value: 0,
              label: "否"
            }
          ],
          spareList: [
            {
              value: 1,
              label: "是"
            },
            {
              value: 0,
              label: "否"
            }
          ],
          sendTypeList: [
            {
              value: 1,
              label: "核保"
            },
            {
              value: 0,
              label: "报价"
            }
          ],
        },
        listColumn: [
          {
            title: '代理人',
            key: 'tlAgent',

          },
          {
            title: '发送地址',
            ellipsis: true,
            align: 'left',
            key: 'sendUrl',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'top',
                    content: params.row.sendUrl,
                    width: 500,
                    transfer: true,
                    wordWrap: true,
                  },
                  style: {
                    cursor: 'pointer',
                    color: '#57c237'
                  }
                },
                params.row.sendUrl,
              )
            }
          },
          {
            title: '是否有效',
            key: 'isUsed',
            render: (h, param) => {
              return h('span',param.row.isUsed == 1 ? "有效" : "无效")
            }
          },
          {
            title: '是否备用',
            key: 'isSpare',
            render: (h, param) => {
              return h('span',param.row.isSpare == 1 ? "备用" : "现用")
            }
          },
          {
            title: '描述',
            ellipsis: true,
            align: 'left',
            key: 'msgDesc',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'top',
                    content: params.row.msgDesc,
                    width: 500,
                    transfer: true,
                    wordWrap: true,
                  },
                  style: {
                    cursor: 'pointer',
                    color: '#57c237'
                  }
                },
                params.row.msgDesc,
              )
            }
          },
          {
            title: '时间',
            key: 'createTimeStr',
          },
          {
            title: '推送次数',
            key: 'times',
          },
          {
            title: '是否需要token',
            key: 'isAccount',
            render: (h, param) => {
              return h('span',param.row.isAccount == 1 ? "需要" : "不需要")
            }
          },
          {
            title: 'tokenUrl',
            ellipsis: true,
            align: 'left',
            key: 'tokenUrl',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'top',
                    content: params.row.tokenUrl,
                    width: 500,
                    transfer: true,
                    wordWrap: true,
                  },
                  style: {
                    cursor: 'pointer',
                    color: '#57c237'
                  }
                },
                params.row.tokenUrl,
              )
            }
          },
          {
            title: '时间间隔',
            key: 'timeinterval',
          },
          {
            title: '报价类型',
            key: 'tlSendType',
            render: (h, param) => {
              return h('span',param.row.tlSendType == 1 ? "核保" : "报价")
            }
          },
          {
            title: '操作',
            width:130,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editRow(params.row);
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.deleteRow(params.row)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        list: [],
      }
    },
    mounted() {
      const param = {};
      this.getTableDate(param);
    },
    methods: {
      getTableDate(param) {
        const _this = this;
        _this.loading = true;
        param.page = _this.pageNum;
        param.rows = _this.pageSize;
        pulsUrlList(param).then(res => {
          console.log(res)
          if (res.code == 10000) {
            _this.list = res.responseBody.list;
            _this.total = res.responseBody.total;
            _this.pageNum = res.responseBody.pageNum;
            _this.pageSize = res.responseBody.pageSize;
            _this.loading = false;
          } else {
            this.$Modal.error({
                title: "提示",
                content: res.msg
              }
            )
          }
        })
      },
      //删
      deleteRow(res) {
        this.showDelete = true;
        this.deleteKey = res.tlSendId;
      },
      deleteConfim() {
        const param = {}
        param.tlSendId = this.deleteKey;
        delPulsUrl(param).then(data => {
          if (data.code == 10000) {
            this.getTable(param);
            this.$Message.success(data.msg)
          } else {
            this.$Message.error(data.msg)
          }
        })
      },
      //新增
      add() {
        this.FormList.isAccount = '';
        this.FormList.isSpare = '';
        this.FormList.isUsed = '';
        this.FormList.msgDesc = '';
        this.FormList.passworld = '';
        this.FormList.timeinterval = '';
        this.FormList.tlAgent = '';
        this.FormList.times = '';
        this.FormList.tokenUrl = '';
        this.FormList.tlSendType = '';
        this.FormList.sendUrl = '';
        this.show = true
      },
      //改
      editRow(res) {
        this.show = true;
        this.FormList.isAccount = res.isAccount;
        this.FormList.isSpare = res.isSpare;
        this.FormList.isUsed = res.isUsed;
        this.FormList.msgDesc = res.msgDesc;
        this.FormList.passworld = res.passworld;
        this.FormList.timeinterval = res.timeinterval;
        this.FormList.tlAgent = res.tlAgent;
        this.FormList.times = res.times;
        this.FormList.tokenUrl = res.tokenUrl;
        this.FormList.tlSendType = res.tlSendType;
        this.FormList.sendUrl = res.sendUrl;
        this.isUpdate = true;
      },
      addSimple() {
        const param = {};
        param.tlAgent = this.addAgent;
        addAgentSimple(param).then(data => {
          if (data.code == 10000) {
            this.$Message.success(data.msg);
          }else {
            this.$Message.error(data.msg);
          }
          const param = {};
          this.getTableDate(param);
        })
      },
      //保存
      saveRebackLogConfig() {
        const _this = this;
        _this.loading = true;
        const param = {}
        param.page = _this.pageNum;
        param.rows = _this.pageSize;

        param.isAccount = _this.FormList.isAccount;
        param.isSpare = _this.FormList.isSpare;
        param.isUsed = _this.FormList.isUsed;
        param.msgDesc = _this.FormList.msgDesc;
        param.passworld = _this.FormList.passworld;
        param.timeinterval = _this.FormList.timeinterval;
        param.tlAgent = _this.FormList.tlAgent;
        param.times = _this.FormList.times;
        param.tokenUrl = _this.FormList.tokenUrl;
        param.tlSendType = _this.FormList.tlSendType;
        param.sendUrl = _this.FormList.sendUrl;

        console.log(param)
        if (this.isUpdate) {
          setPulsUrl(param).then(data => {
            if (data.code == 10000) {
              const param1 = {}
              this.getTableDate(param1);
              this.$Message.success(data.msg);
            } else {
              this.$Message.error(data.msg);
            }
          })
        } else {
          addPulsUrl(param).then(data => {
            if (data.code == 10000) {
              const param1 = {}
              this.getTableDate(param1);
              this.$Message.success(data.msg);
            } else {
              this.$Message.error(data.msg);
            }
          })

        }
      },
      handlePage(pageNum) {
        const param = {}
        this.pageNum = pageNum;
        this.getTableDate(param)
      },
      handlePageSize(pageSize) {
        const param = {}
        this.pageSize = pageSize;
        this.getTableDate(param)
      },
    }
  }
</script>

<style>

</style>
