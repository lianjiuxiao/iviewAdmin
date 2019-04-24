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
    <div style="">
      <Input placeholder="功能" style="width: auto;" v-model="carNo" @on-search="queryBysearchParam"/>
      <Input placeholder="参数" style="width: auto; margin-left: 20px" v-model="param" @on-search="queryBysearchParam"/>
      <Input placeholder="结果" style="width: auto; margin-left: 20px" v-model="result" @on-search="queryBysearchParam"/>
      <DatePicker type="datetimerange" show-week-numbers placement="bottom-end" v-model="requestTime" placeholder="Select date" style="width: 300px;margin-left: 20px"></DatePicker>
      <Button style="margin-left: 20px" shape="circle" icon="ios-search" type="primary" @click="searchList">搜索</Button>
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
  import {queryRouteLog} from '@/api/data'

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
        requestTime:'',
        carNo:'',
        param:'',
        result:'',
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
            title: '功能名称',
            key: 'logName'
          },
          {
            title: '发送的url',
            ellipsis: true,
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
            title: '时间',
            key: 'createTimeStr',
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
              console.log(params)
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
        queryRouteLog(param).then(res => {
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
      searchList(){
        const param={}
        param.carNo = this.carNo;
        param.param = this.param;
        param.requestTime = this.requestTime;
        this.getTableDate(param);
      },
      queryBysearchParam(){
        const param={}
        param.carNo = this.searchParam;
        this.getTableDate(param);
      },
      handlePage(pageNum) {
        this.pageNum = pageNum;
        const param={}
        this.getTableDate(param);
      },
      handlePageSize(pageSize) {
        this.pageSize = pageSize;
        const param={}
        this.getTableDate(param);
      },
    }
  }
</script>

<style>

</style>
