<style>
  .ivu-table .demo-table-info-row td {
    background-color: #272a2a;
    color: #fff;
  }

  .ivu-table .demo-table-error-row td {
    background-color: #ff6600;
    color: #fff;
  }
</style>

<template>
  <div>
    <div>
      <Input search enter-button placeholder="请输入upx" style="width: auto" v-model="upxkeySerch"
             @on-search="queryByUpxKey"/>
      <Modal @on-ok="saveRebackLog" v-model="show" ok-text="保存" draggable scrollable title="日志回调编辑">
        <Form :model="rebackLogForm">
          <FormItem label="参数修改:">
            <Input autofocus type="textarea" :rows="10" style="width: 490px; " v-model="rebackLogForm.tranceferJson"/>
          </FormItem>
          <FormItem v-if="false">
            <Input v-model="rebackLogForm.tlSendLogId"/>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <Table border :row-class-name="rowClassName" :loading="loading" :columns="rebackLogListColumn"
           :data="rebackLogList"></Table>
    <div>
      <Page :total="total" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
            placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
    </div>
  </div>
</template>


<script>
  import {newTreeData} from '@/mock/data/tree-select'
  import {getRebackLogList, editRebackLog} from '@/api/data'

  export default {
    data() {
      return {
        show: false,
        total: 0,
        pageNum: 1,
        pageSize: 10,
        loading: true,
        upxkeySerch: '',
        rebackLogListColumn: [
          {
            title: '日志ip',
            ellipsis: true,
            width: 100,
            key: 'logIp',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'top',
                    content: params.row.logIp,
                    width: 500,
                    transfer: true,
                    wordWrap: true,
                  },
                  style: {
                    cursor: 'pointer',
                    color: '#57c237'
                  }
                },
                params.row.logIp,
              )
            }

          },
          {
            title: '代理人',
            width: 100,
            key: 'agent'
          },
          {
            title: '回调类型',
            width: 100,
            key: 'sendType',
            render: (h, params) => {
              return h('span', params.row.sendType == 1 ? "报价" : "核保")
            }
          },
          {
            title: '回调方式',
            width: 100,
            key: 'isHand',
            render: (h, params) => {
              return h('span', params.row.isHand == 1 ? "手动" : "自动")
            }
          },
          {
            title: 'UPX',
            key: 'upxKey'
          },
          {
            title: '回调时间',
            key: 'dateTime',
            width: 150,
          },

          {
            title: '接收数据',
            ellipsis: true,
            align: 'left',
            key: 'orignJson',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'top',
                    content: params.row.orignJson,
                    width: 500,
                    transfer: true,
                    wordWrap: true,
                  },
                  style: {
                    cursor: 'pointer',
                    color: '#57c237'
                  }
                },
                params.row.orignJson,
              )
            }
          },
          {
            title: '转换数据',
            ellipsis: true,
            key: 'tranceferJson',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'top',
                    content: params.row.tranceferJson,
                    width: 500,
                    transfer: true,
                    wordWrap: true,
                  },
                  style: {
                    cursor: 'pointer',
                    color: '#57c237'
                  }
                },
                params.row.tranceferJson,
              )
            }
          },
          {
            title: '回调结果',
            ellipsis: true,
            align: 'left',
            key: 'tlSendLog',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'top',
                    content: params.row.tlSendLog,
                    width: 700,
                    transfer: true,
                    wordWrap: true,
                  },
                  style: {
                    cursor: 'pointer',
                    color: '#57c237'
                  }
                },
                params.row.tlSendLog,
              )
            }
          },
          {
            title: '操作',
            width: 150,
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
                      this.sendByType(params.row);
                    }
                  }
                }, '推送'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.editFrom(params.row)
                    }
                  }
                }, '编辑')
              ]);
            }
          }
        ],
        rebackLogList: [],
        rebackLogForm: {
          orignJson: '',
          tlSendLogId: '',
        },
      }
    },
    mounted() {
      const param = {}
      this.getLogList(param);
    },
    methods: {
      getLogList(param) {
        const _this = this;
        _this.loading = true;
        param.page = _this.pageNum;
        param.rows = _this.pageSize;
        getRebackLogList(param).then(res => {
          console.log(res)
          if (res.code == 10000) {
            _this.rebackLogList = res.responseBody.list;
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
      rowClassName(row) {
        if (row.sendType == 1) {
          return 'demo-table-info-row';
        }
        return '';
      },
      handlePage(pageNum) {
        const param = {}
        this.pageNum = pageNum;
        this.getLogList(param)
      },
      handlePageSize(pageSize) {
        const param = {}
        this.pageSize = pageSize;
        this.getLogList(param)
      },
      editFrom(res) {
        this.show = true;
        this.rebackLogForm.tranceferJson = res.tranceferJson;
        this.rebackLogForm.tlSendLogId = res.tlSendLogId;
      },
      saveRebackLog() {
        const _this = this;
        _this.loading = true;
        const param = {}
        param.page = _this.pageNum;
        param.rows = _this.pageSize;
        param.tlSendLogId = _this.rebackLogForm.tlSendLogId;
        param.tranceferJson = _this.rebackLogForm.tranceferJson;
        editRebackLog(param).then(res => {
          if (res.code == 10000) {
            this.$Modal.success({
                title: "提示",
                content: res.msg
              }
            )
          } else {
            this.$Modal.error({
                title: "提示",
                content: res.msg
              }
            )
          }
        })
      },
      queryByUpxKey() {
        const param = {}
        param.upxkey = this.upxkeySerch;
        this.getLogList(param);
      }
    }
  }
</script>

<style>
  .ivu-poptip-body-content-inner {
    word-break: break-all;
  }
</style>
