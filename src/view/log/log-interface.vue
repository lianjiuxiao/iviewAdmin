<style>
  .ivu-table .demo-table-info-row td {
    background-color: #2db7f5;
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
      <Input search enter-button placeholder="请输入upx" style="width: auto" v-model="searchParam" @on-search="queryBysearchParam"/>
    </div>
    <Table border  :loading="loading" :columns="listColumn"
           :data="list"></Table>
    <div>
      <Page :total="total" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
            placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
    </div>
  </div>
</template>


<script>
  import {newTreeData} from '@/mock/data/tree-select'
  import {upxInterFaceLog} from '@/api/data'

  export default {
    data() {
      return {
        show: false,
        total: 0,
        pageNum: 1,
        searchParam:'',
        pageSize: 10,
        agentName:'',
        loading: true,
        listColumn: [
          {
            title: '日志ip',
            ellipsis: true,
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
            title: '接口名',
            key: 'name'
          },
          {
            title: '来访者ip',
            key: 'ip',
          },
          {
            title: '时间',
            key: 'time',
          },
          {
            title: '参数',
            ellipsis: true,
            align: 'left',
            key: 'param',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'top',
                    content: params.row.param,
                    width: 500,
                    transfer: true,
                    wordWrap: true,
                  },
                  style: {
                    cursor: 'pointer',
                    color: '#57c237'
                  }
                },
                params.row.param,
              )
            }
          },
          {
            title: '返回结果',
            ellipsis: true,
            key: 'result',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'top',
                    content: params.row.result,
                    width: 500,
                    transfer: true,
                    wordWrap: true,
                  },
                  style: {
                    cursor: 'pointer',
                    color: '#57c237'
                  }
                },
                params.row.result,
              )
            }
          },
        ],
        list: [],
      }
    },
    mounted() {
      const param={}
      this.getTableDate(param);
    },
    methods: {
      getTableDate(param) {
        const _this = this;
        _this.loading = true;
        param.page = _this.pageNum;
        param.rows = _this.pageSize;
        upxInterFaceLog(param).then(res => {
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
      queryBysearchParam(){
        const param={}
        param.carNo = this.searchParam;
        this.getTableDate(param);
      },
      handlePage(pageNum) {
        const param = {}
        this.pageSize = pageSize;
        this.pageNum = pageNum;
        this.getTableDate(param)
      },
      handlePageSize(pageSize) {
        const param = {}
        this.pageSize = pageSize;
        this.pageSize = pageSize;
        this.getTableDate(param)
      },
    }
  }
</script>

<style>

</style>
