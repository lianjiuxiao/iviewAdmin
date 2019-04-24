<template>
  <div>
    <div>
      <Input search enter-button placeholder="请输入upx" style="width: auto" v-model="searchParam"
             @on-search="queryBysearchParam"/>
    </div>
    <br>
    <Row type="flex" justify="start" class="code-row-bg">
      <Col span="4">
        续保缓存
        <i-switch size="large" v-model="switchRedis" @on-change="switchChange">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </Col>
      <Col span="4">
        人保车辆
        <i-switch size="large" v-model="switchRenInfoCar" @on-change="switchChange">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </Col>
      <Col span="4">
        人保续保
        <i-switch size="large" v-model="switchRenInfo" @on-change="switchChange">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </Col>
      <Col span="4">
        壁虎续保
        <i-switch size="large" v-model="switchBHRenInfo" @on-change="switchChange">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </Col>
      <Col span="4">
        平安续保
        <i-switch size="large" v-model="switchPingAnRenInfo" @on-change="switchChange">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </Col>
      <Col span="4">
        太保增量
        <i-switch size="large" v-model="switchCPICRasks" @on-change="switchChange">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </Col>
    </Row>
    <Table border :loading="loading" :columns="listColumn"
           :data="list"></Table>
    <div>
      <Page :total="total" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
            placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
    </div>
  </div>
</template>


<script>
  import {
    getRenInfo,
    editRenInfo,
    delRenInfo,
    queryRedis,
    getRenInfoFromCache,
    delCache,
    setRedisSwitch
  } from '@/api/data'

  export default {
    data() {
      return {
        show: false,
        total: 0,
        switch1: '',
        switchRenInfoCar: true,
        switchCPICRasks: true,
        switchBHRenInfo: true,
        switchRenInfo: true,
        switchRedis: true,
        switchPingAnRenInfo: true,
        pageNum: 1,
        searchParam: '',
        pageSize: 10,
        agentName: '',
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
      const param = {}
      this.getTableDate(param);
      this.getList();

    },
    methods: {
      getTableDate(param) {
        const _this = this;
        _this.loading = true;
        param.page = _this.pageNum;
        param.rows = _this.pageSize;
        getRenInfo(param).then(res => {
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
      getList() {
        queryRedis().then(data => {
          this.switchBHRenInfo = data.switchBHRenInfo;
          this.switchCPICRasks = data.switchCPICRasks;
          this.switchPingAnRenInfo = data.switchPingAnRenInfo;
          this.switchRedis = data.switchRedis;
          this.switchRenInfo = data.switchRenInfo;
          this.switchRenInfoCar = data.switchRenInfoCar;
        })
      },
      queryBysearchParam() {
        const param = {}
        param.carNo = this.searchParam;
        this.getTableDate(param);
      },
      switchChange() {

      },
      switchChange() {

      },
      handlePage(pageNum) {
        this.pageNum = pageNum;
        const param = {}
        this.getTableDate(param);
      },
      handlePageSize(pageSize) {
        this.pageSize = pageSize;
        const param = {}
        this.getTableDate(param);
      },
    }
  }
</script>

<style>

</style>
