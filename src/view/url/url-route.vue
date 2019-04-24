<template>
  <div>
    <div>
      <Button type="primary" icon="ios-add" @click="add" style="float: left">新增</Button>
      <Input search enter-button placeholder="请输入参数" style="width: auto;margin-left: 100px" v-model="searchParam" @on-search="queryBySearchParam"/>
      <Modal transfer scrollable :mask-closable="false" @on-ok="saveRebackLogConfig" v-model="show" ok-text="保存"
             title="路由配置">
        <Form :model="FormList">
          <FormItem label="路由名称:">
            <Input v-model="FormList.vc2RouteName"/>
          </FormItem>
          <FormItem label="路由描述:">
            <Input v-model="FormList.vc2RouteDetail"/>
          </FormItem>
          <FormItem label="区域:">
            <Select v-model="FormList.ar" style="width: auto">
              <Option v-for="item in FormList.areaList" :value="item.value" :key="item.value">{{
                item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="渠道:">
            <Select v-model="FormList.numCompanyId" style="width: auto">
              <Option v-for="item in FormList.companyList" :value="item.value" :key="item.value">{{
                item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="代理组:">
            <Select v-model="FormList.numGroupId" style="width: auto">
              <Option v-for="item in FormList.groupList" :value="item.numGroupId" :key="item.numGroupId">{{
                item.vc2GroupName }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="是否可用:">
            <Select v-model="FormList.isUsed" style="width: auto">
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
    <Table border :row-class-name="rowClassName" :loading="loading" :columns="tableColumn"
           :data="table"></Table>
    <div>
      <Page :total="total" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
            placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
    </div>
  </div>
</template>


<script>
  import {addRouteConfig, delRouteConfig, updateRouteConfig, getUfRouteList, getRouteConfig,getAgentGroupDownList} from '@/api/data'

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
            title: '路由名称',
            key: 'vc2RouteName'
          },
          {
            title: '路由描述',
            key: 'vc2RouteDetail',
          },
          {
            title: '行驶城市编码',
            key: 'vc2CityCode',
          },
          {
            title: '保险公司',
            key: 'numCompanyId',
          },
          {
            title: '代理人组',
            key: 'numGroupId',
          },
          {
            title: '有效状态',
            key: 'numStatus',
            render: (h, params) => {
              return h('span', params.row.numStatus == 1 ? "有效" : "无效")
            }
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
          vc2RouteName:'',
          vc2RouteDetail: '',
          numGroupId:1,
          numCompanyId:'',
          isUsed: 1,
          ar:1,
          areaList:[
            {
              value: "021",
              label: "上海"
            },
            {
              value: "010",
              label: "北京"
            },
            {
              value: "022",
              label: "天津"
            },
            {
              value: "021",
              label: "自营(默认)"
            },
            {
              value: "1571",
              label: "浙江"
            },
            {
              value: "1451",
              label: "黑龙江"
            },
            {
              value: "0411",
              label: "大连"
            },
            {
              value: "0512",
              label: "苏州"
            },
          ],
          groupList: [],
          servicesList: [
            {
              value: 1,
              label: "自营(默认)"
            },
            {
              value: 0,
              label: "壁虎"
            }
          ],
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
          companyList:  [
            {
              value: "picc",
              label: "人保"
            },
            {
              value: "cpic",
              label: "太保"
            },
            {
              value: "ydpic",
              label: "英达泰和"
            }
          ],
        },
      }
    },
    mounted() {
      const param = {}
      this.getTable(param);
      this.getList();
    },
    methods: {
      //查询组列表
      getList() {
        getAgentGroupDownList().then(res => {
          if (res.code == 10000) {
            this.FormList.groupList = res.responseBody
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
        getUfRouteList(param).then(res => {
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
        this.deleteKey = res.numServiceId;
      },
      deleteConfim(){
        const param = {}
        param.numServiceId = this.deleteKey;
        delRouteConfig(param).then(data => {
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
        this.FormList.vc2CityCode = '';
        this.FormList.vc2RouteDetail = '';
        this.FormList.vc2RouteName = '';
        this.FormList.isUsed = '';
        this.FormList.ar = '';
        this.FormList.numCompanyId = '';
        this.FormList.numGroupId = '';
        this.show = true
      },
      //改
      editRow(res) {
        this.show = true;
        console.log(res)
        this.FormList.vc2CityCode = res.vc2CityCode;
        this.FormList.vc2RouteDetail = res.vc2RouteDetail;
        this.FormList.vc2RouteName = res.vc2RouteName;
        this.FormList.isUsed = res.numStatus;
        this.FormList.ar = res.vc2CityCode;
        this.FormList.numCompanyId = res.numCompanyId;
        this.FormList.numGroupId = res.numGroupId;
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
        param.vc2ServiceName = _this.FormList.vc2ServiceName;
        param.serviceType = _this.FormList.serviceType;
        param.companyType = _this.FormList.companyType;
        param.isUsed = _this.FormList.isUsed;
        param.vc2ServiceAddress = _this.FormList.vc2ServiceAddress;
        console.log(param)
        if (this.isUpdate){
          updateRouteConfig(param).then(data => {
            if (data.code == 10000) {
              const param1 = {}
              this.getTable(param1);
              this.$Message.success(data.msg);
            } else {
              this.$Message.error(data.msg);
            }
          })
        } else {
          addRouteConfig(param).then(data => {
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
        this.getLogList()
      },
      handlePageSize(pageSize) {
        this.pageSize = pageSize;
        this.getLogList()
      },
    }
  }
</script>

<style>

</style>
