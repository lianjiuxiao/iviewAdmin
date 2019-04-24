<template>
  <div>
    <div>
      <Button type="primary" icon="ios-add" @click="add">新增</Button>
      <Modal transfer scrollable :mask-closable="false" @on-ok="saveRebackLogConfig" v-model="show" ok-text="保存"
             title="回调配置">
        <Form :model="FormList">
          <FormItem label="组名称:">
            <Input v-model="FormList.vc2GroupName"/>
          </FormItem>
          <FormItem label="组id:">
            <Input v-model="FormList.vc2GroupNameId"/>
          </FormItem>
          <FormItem label="是否是可用:">
            <Select v-model="FormList.isUsed" style="width: auto">
              <Option v-for="item in FormList.isUsedList" :value="item.value" :key="item.value">{{
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
  import {addAgentGroup, delAgentGroup, getAgentGroupList, updateAgentGroup} from '@/api/data'

  export default {
    data() {
      return {
        show: false,
        showDelete:false,
        total: 0,
        pageNum: 1,
        pageSize: 10,
        agentName: '',
        isUpdate: false,
        loading: true,
        deleteKey: '',
        tableColumn: [
          {
            title: '组Id',
            key: 'vc2GroupName'
          },
          {
            title: '组名称',
            key: 'numGroupId',
          },
          {
            title: '是否有效',
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
          vc2GroupName: '',
          vc2GroupNameId: 5,
          groups: [],
          isUsedList: [
            {
              value: 1,
              label: "是"
            },
            {
              value: 0,
              label: "否"
            }
          ],
          isUsed: 1,
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
        getAgentGroupList(param).then(res => {
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
        this.deleteKey = res.numGroupId;
        this.showDelete = true;

      },
      deleteConfim(){
        const param = {}
        param.numGroupId = this.deleteKey
        delAgentGroup(param).then(data => {
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
        this.FormList.vc2GroupName = '';
        this.FormList.vc2GroupNameId = '';
        this.FormList.isUsed = '';
        this.show = true
      },
      //改
      editRow(res) {
        this.show = true;
        console.log(res)
        this.FormList.vc2GroupName = res.vc2GroupName;
        this.FormList.vc2GroupNameId = res.numGroupId;
        this.FormList.isUsed = res.numStatus;
        this.isUpdate = true;
      },
      //保存
      saveRebackLogConfig() {
        const _this = this;
        _this.loading = true;
        const param = {}
        param.page = _this.pageNum;
        param.rows = _this.pageSize;
        param.vc2GroupName = _this.FormList.vc2GroupName;
        param.numGroupId = _this.FormList.vc2GroupNameId;
        param.numStatus = _this.FormList.isUsed;
        console.log(param)
        if (this.isUpdate) {
          updateAgentGroup(param).then(data => {
            if (data.code == 10000) {
              const param1 = {}
              this.getTable(param1);
              this.$Message.success(data.msg);
            } else {
              this.$Message.error(data.msg);
            }
          })
        } else {
          addAgentGroup(param).then(data => {
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
