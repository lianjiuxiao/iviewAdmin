<template>
  <div>
    <div>
      <Button type="primary" icon="ios-add" @click="add" style="float: left">新增</Button>
      <Input search enter-button placeholder="请输入参数" style="width: auto;margin-left: 100px" v-model="searchParam" @on-search="queryBySearchParam"/>
      <Modal transfer scrollable :mask-closable="false" @on-ok="saveRebackLogConfig" v-model="show" ok-text="保存"
             title="链路配置">
        <Form :model="FormList">
          <FormItem label="链路名称:">
            <Input v-model="FormList.vc2ServiceName"/>
          </FormItem>
          <FormItem label="服务地址:">
            <Input v-model="FormList.vc2ServiceAddress"/>
          </FormItem>
          <FormItem label="服务权重:">
            <Input v-model="FormList.numWeight"/>
          </FormItem>
          <FormItem label="服务类型:">
            <Select v-model="FormList.numServiceType" multiple style="width: auto">
              <Option v-for="item in FormList.serviceList" :value="item.serviceId" :key="item.serviceId">{{
                item.serviceName }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="接口类型:">
            <Select v-model="FormList.numInterfaceType" style="width: auto">
              <Option v-for="item in FormList.groupList" :value="item.value" :key="item.value">{{
                item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="是否可用:">
            <Select v-model="FormList.numStatus" style="width: auto">
              <Option v-for="item in FormList.usedList" :value="item.value" :key="item.value">{{
                item.label }}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
      <Modal transfer scrollabl @on-ok="deleteConfim" v-model="showDelete" ok-text="确定"
             title="提示">确认删除该选项吗？</Modal>
    </div>
    <Table border  :loading="loading" :columns="tableColumn"
           :data="table"></Table>
    <div>
      <Page :total="total" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
            placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
    </div>
  </div>
</template>


<script>
  import {addService,updateService, getUfServiceList, delService} from '@/api/data'

  export default {
    data() {
      return {
        show: false,
        showDelete:false,
        deleteKey:'',
        searchParam:'',
        total: 0,
        pageNum: 1,
        pageSize: 10,
        isUpdate:false,
        loading: true,
        tableColumn: [
          {
            title: '服务名称',
            key: 'vc2ServiceName'
          },
          {
            title: '服务类型',
            key: 'numServiceType'
          },
          {
            title: '接口类型',
            key: 'numInterfaceType'
          },
          {
            title: '服务地址',
            ellipsis: true,
            key: 'vc2ServiceAddress',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'top',
                    content: params.row.vc2ServiceAddress,
                    width: 500,
                    transfer: true,
                    wordWrap: true,
                  },
                  style: {
                    cursor: 'pointer',
                    color: '#57c237'
                  }
                },
                params.row.vc2ServiceAddress,
              )
            }
          },
          {
            title: '有效状态',
            key: 'numStatus'
          },
          {
            title: '权重',
            key: 'numWeight'
          },
          {
            title: '操作',
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
        table: [],
        FormList: {
          vc2ServiceName:'',
          vc2ServiceAddress:'',
          numInterfaceType:"A",
          numServiceType:'',
          numWeight:'',
          numStatus: 1,
          groupList: [
            {
              value: "A",
              label: "自营"
            },{
              value: "0000B1",
              label: "壁虎"
            },
          ],
          serviceList: [],
          usedList:  [
            {
              value: 1,
              label: "是"
            },
            {
              value: 0,
              label: "否"
            }
          ],
        },
      }
    },
    mounted() {
      const param = {}
      this.getTable(param);
    },
    methods: {
      //获取列表
      getTable(param) {
        const _this = this;
        _this.loading = true;
        param.page = _this.pageNum;
        param.rows = _this.pageSize;
        getUfServiceList(param).then(res => {
          if (res.code == 10000) {
            _this.table = res.responseBody.list;
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
        this.deleteKey = res.policyId;
      },
      deleteConfim(){
        const param = {}
        param.policyId = this.deleteKey;
        delService(param).then(data => {
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
        this.FormList.vc2ServiceName = '';
        this.FormList.vc2ServiceAddress = '';
        this.FormList.numInterfaceType ='';
        this.FormList.numServiceType ='';
        this.FormList.numWeight ='';
        this.FormList.numStatus ='';
        this.show = true
      },
      //改
      editRow(res) {
        this.show = true;
        this.FormList.vc2ServiceName = res.vc2ServiceName;
        this.FormList.vc2ServiceAddress = res.vc2ServiceAddress;
        this.FormList.numInterfaceType =res.numInterfaceType;
        this.FormList.numServiceType =res.numServiceType;
        this.FormList.numWeight =res.numWeight;
        this.FormList.numStatus =res.numStatus;
        this.isUpdate = true;
      },
      //查询
      queryBySearchParam(){
        const param = {}
        param.searchName = this.searchParam;
        this.getTable(param);
      },
      //保存
      saveRebackLogConfig() {
        const _this = this;
        _this.loading = true;
        const param = {}
        param.page = _this.pageNum;
        param.rows = _this.pageSize;
        param.vc2ServiceName = _this.FormList.vc2ServiceName;
        param.vc2ServiceAddress = _this.FormList.vc2ServiceAddress;
        param.numInterfaceType = _this.FormList.numInterfaceType;
        param.numServiceType = _this.FormList.numServiceType;
        param.numWeight = _this.FormList.numWeight;
        param.numStatus = _this.FormList.numStatus;
        console.log(param)
        if (this.isUpdate){
          updateService(param).then(data => {
            if (data.code == 10000) {
              const param1 = {}
              this.getTable(param1);
              this.$Message.success(data.msg);
            } else {
              this.$Message.error(data.msg);
            }
          })
        } else {
          addService(param).then(data => {
            if (data.code == 10000) {
              const param1 = {}
              this.getTable(param1);
              this.$Message.success(data.msg);
            } else {
              this.$Message.error(data.msg);
            }
          })

        }
      },
      //分页
      handlePage(pageNum) {
        this.pageNum = pageNum;
        const param = {}
        this.getTable(param);
      },
      handlePageSize(pageSize) {
        this.pageSize = pageSize;
        const param = {}
        this.getTable(param);
      },
    }
  }
</script>

<style>

</style>
