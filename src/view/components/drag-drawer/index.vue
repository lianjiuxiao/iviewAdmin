<template>
  <div>
    <Table border :loading="loading" :columns="listColumn"
           :data="list"></Table>
    <div>
    </div>
  </div>
</template>

<script>
  import {getCpicQueueData} from '@/api/data'

  export default {
    data() {
      return {
        show: false,
        total: 0,
        pageNum: 1,
        searchParam: '',
        pageSize: 10,
        agentName: '',
        loading: true,
        requestTime: '',
        carNo: '',
        param: '',
        result: '',
        listColumn: [
          {
            title: 'upxKey',
            key: 'upxKey',

          },
          {
            title: '报价核保账号',
            key: 'sessionKey'
          },
          {
            title: '车牌号',
            key: 'licenseNo',
          },
          {
            title: '类型',
            key: 'name',
          },
          {
            title: '报价核保参数',
            ellipsis: true,
            width: 300,
            key: 'cpicParam',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'left-start',

                    transfer: true,
                    'word-wrap': true,
                    content: JSON.stringify(params.row.cpicParam || {}),
                    width: 500,
                  },
                },
                JSON.stringify(params.row.cpicParam || {}),
              )
            }
          },
        ],
        list: [],
      }
    },
    mounted() {
      const param = {}
      this.getTableDate(param);
    },
    methods: {
      getTableDate(param) {
        const _this = this;
        _this.loading = true;
        param.page = _this.pageNum;
        param.rows = _this.pageSize;
        getCpicQueueData(param).then(res => {
          console.log(res)
          if (res.code == 10000) {
            _this.list = res.responseBody;
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
      searchList() {
        const param = {}
        param.carNo = this.carNo;
        param.param = this.param;
        param.requestTime = this.requestTime;
        this.getTableDate(param);
      },
      queryBysearchParam() {
        const param = {}
        param.carNo = this.searchParam;
        this.getTableDate(param);
      },
    }
  }
</script>
