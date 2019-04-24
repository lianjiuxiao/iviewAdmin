<template>
  <div>
    <div>
      <Button type="primary" icon="ios-add" @click="add">新增</Button>
      <Modal transfer scrollable :mask-closable="false" @on-ok="saveRebackLogConfig" v-model="show" ok-text="保存"
             title="策略配置">
        <Form :model="FormList">
          <FormItem label="策略名称:">
            <Input v-model="FormList.policyName"/>
          </FormItem>
          <FormItem label="路由:">
            <Select v-model="FormList.routeId" style="width: auto">
              <Option v-for="item in FormList.groupList" :value="item.routeId" :key="item.routeId">{{
                item.routeName }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="链路:">
            <Select v-model="FormList.serviceId" multiple style="width: auto">
              <Option v-for="item in FormList.serviceList" :value="item.serviceId" :key="item.serviceId">{{
                item.serviceName }}
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
  import {getPolicyList,getServiceSlect, updatePolicyById, savePolicyConfig, delPolicyById,getRouteConfig} from '@/api/data'

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
            title: '策略名称',
            key: 'policyName'
          },
          {
            title: '服务链路',
            ellipsis: true,
            key: 'address',
            render: (h, params) => {
              return h('Poptip', {
                  props: {
                    placement: 'top',
                    content: params.row.address,
                    width: 500,
                    transfer: true,
                    wordWrap: true,
                  },
                  style: {
                    cursor: 'pointer',
                    color: '#57c237'
                  }
                },
                params.row.address,
              )
            }
          },
          {
            title: '路由名称',
            key: 'routeName',
          },
          {
            title: '城市编号',
            key: 'cityCode',
          },
          {
            title: '公司编号',
            key: 'companyId',
          },
          {
            title: '代理人组',
            key: 'groupName',
          },
          {
            title: '代理人',
            key: 'agent',
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
          groupName:'',
          policyName:'',
          routeName:'',
          routeId:1,
          serviceId:'',
          isUsed: 1,
          groupList: [],
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
      this.getList();
      this.getList2();
    },
    methods: {
      //查询组列表
      getList() {
        getRouteConfig().then(res => {
          if (res.code == 10000) {
            this.FormList.groupList = res.responseBody
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      getList2(){
        getServiceSlect().then(res => {
          if (res.code == 10000) {
            this.FormList.serviceList = res.responseBody
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      //获取列表
      getTable(param) {
        const _this = this;
        _this.loading = true;
        param.page = _this.pageNum;
        param.rows = _this.pageSize;
        getPolicyList(param).then(res => {
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
        delPolicyById(param).then(data => {
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
        this.FormList.routeId = '';
        this.FormList.serviceId = '';
        this.FormList.policyName ='';
        this.show = true
      },
      //改
      editRow(res) {
        this.show = true;
        this.FormList.routeId = res.routeId;
        this.FormList.serviceId = res.serviceId.split(",");
        this.FormList.policyName =res.policyName;
        this.isUpdate = true;
      },
      //查询
      queryBySearchParam(){
        const param = {}
        param.vc2RouteName = this.searchParam;
        this.getTable(param);
      },
      //保存
      saveRebackLogConfig() {
        const _this = this;
        _this.loading = true;
        const param = {}
        param.page = _this.pageNum;
        param.rows = _this.pageSize;
        param.routeId = _this.FormList.routeId;
        param.policyName = _this.FormList.policyName;
        console.log(param)
        if (this.isUpdate){
          updatePolicyById(param).then(data => {
            if (data.code == 10000) {
              const param1 = {}
              this.getTable(param1);
              this.$Message.success(data.msg);
            } else {
              this.$Message.error(data.msg);
            }
          })
        } else {
          savePolicyConfig(param).then(data => {
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
