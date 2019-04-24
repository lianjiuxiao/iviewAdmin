import axios from '@/libs/api.request'
import {getUrl} from './routers';

/*********************回调配置****************************/
//增
export const addPulsUrl = param => {
  return axios.request({
    url: 'addPulsUrl',
    data: param,
    method: 'post'
  })
}
//删
export const delPulsUrl = param => {
  return axios.request({
    url: 'delPulsUrl',
    data: param,
    method: 'post'
  })
}
//查
export const pulsUrlList = param => {
  return axios.request({
    url: 'pulsUrlList',
    data: param,
    method: 'post'
  })
}
//改
export const setPulsUrl = param => {
  return axios.request({
    url: 'setPulsUrl',
    data: param,
    method: 'post'
  })
}
//一键拷贝
export const addAgentSimple = param => {
  return axios.request({
    url: 'addAgentSimple',
    data: param,
    method: 'post'
  })
}

/*********************链路配置****************************/
//增
export const addService = param => {
  return axios.request({
    url: getUrl('url/addService'),
    data: param,
    method: 'post'
  })
}
//改
export const updateService = param => {
  return axios.request({
    url: getUrl('url/updateService'),
    data: param,
    method: 'post'
  })
}
//查
export const getUfServiceList = param => {
  return axios.request({
    url: getUrl('url/getUfServiceList'),
    data: param,
    method: 'post'
  })
}
//删
export const delService = param => {
  return axios.request({
    url: getUrl('url/delService'),
    data: param,
    method: 'post'
  })
}
/*********************策略配置****************************/
//查
export const getPolicyList = param => {
  return axios.request({
    url: getUrl('url/getPolicyList'),
    data: param,
    method: 'post'
  })
}
//改
export const updatePolicyById = param => {
  return axios.request({
    url: getUrl('url/updatePolicyById'),
    data: param,
    method: 'post'
  })
}
//增
export const savePolicyConfig = param => {
  return axios.request({
    url: getUrl('url/savePolicyConfig'),
    data: param,
    method: 'post'
  })
}
//删
export const delPolicyById = param => {
  return axios.request({
    url: getUrl('url/delPolicyById'),
    data: param,
    method: 'post'
  })
}
//服务链路下拉列表
export const getServiceSlect = param => {
  return axios.request({
    url: getUrl('url/getServiceSlect'),
    data: param,
    method: 'post'
  })
}

/*********************续保日志****************************/
//查
export const getRenInfo = param => {
  return axios.request({
    url: getUrl('log/getRenInfo'),
    data: param,
    method: 'post'
  })
}
//改
export const editRenInfo = param => {
  return axios.request({
    url: getUrl('log/editRenInfo'),
    data: param,
    method: 'post'
  })
}
//删
export const delRenInfo = param => {
  return axios.request({
    url: getUrl('log/delRenInfo'),
    data: param,
    method: 'post'
  })
}
//查reids开关
export const queryRedis = param => {
  return axios.request({
    url: getUrl('log/queryRedis'),
    data: param,
    method: 'post'
  })
}
//从redis中查询续保信息
export const getRenInfoFromCache = param => {
  return axios.request({
    url: getUrl('log/getRenInfoFromCache'),
    data: param,
    method: 'post'
  })
}
//从redis中删除续保信息
export const delCache = param => {
  return axios.request({
    url: getUrl('log/delCache'),
    data: param,
    method: 'post'
  })
}
//设置缓存
export const setRedisSwitch = param => {
  return axios.request({
    url: getUrl('log/setRedisSwitch'),
    data: param,
    method: 'post'
  })
}
/*********************队列日志****************************/
//查
export const getCpicQueueData = param => {
  return axios.request({
    url: getUrl('log/getCpicQueueData'),
    data: param,
    method: 'post'
  })
}
/*********************链路日志****************************/
//查
export const queryRouteLog = param => {
  return axios.request({
    url: getUrl('log/queryRouteLog'),
    data: param,
    method: 'post'
  })
}
/*********************接口日志****************************/
//查
export const upxInterFaceLog = param => {
  return axios.request({
    url: getUrl('log/upxInterFaceLog'),
    data: param,
    method: 'post'
  })
}
/*********************路由配置****************************/
//增
export const addRouteConfig = param => {
  return axios.request({
    url: getUrl('url/addRouteConfig'),
    data: param,
    method: 'post'
  })
}
//删
export const delRouteConfig = param => {
  return axios.request({
    url: getUrl('url/delRouteConfig'),
    data: param,
    method: 'post'
  })
}
//改
export const updateRouteConfig = param => {
  return axios.request({
    url: getUrl('url/updateRouteConfig'),
    data: param,
    method: 'post'
  })
}
//查
export const getUfRouteList = param => {
  return axios.request({
    url: getUrl('url/getUfRouteList'),
    data: param,
    method: 'post'
  })
}
//列表
export const getRouteConfig = param => {
  return axios.request({
    url: getUrl('url/getRouteConfig'),
    data: param,
    method: 'post'
  })
}
/*********************代理人组****************************/
//增
export const addAgentGroup = param => {
  return axios.request({
    url: getUrl('url/addAgentGroup'),
    data: param,
    method: 'post'
  })
}

//删
export const delAgentGroup = param => {
  return axios.request({
    url: getUrl('url/delAgentGroup'),
    data: param,
    method: 'post'
  })
}

//查
export const getAgentGroupList = param => {
  return axios.request({
    url: getUrl('url/getAgentGroupList'),
    data: param,
    method: 'post'
  })
}

//改
export const updateAgentGroup = param => {
  return axios.request({
    url: getUrl('url/updateAgentGroup'),
    data: param,
    method: 'post'
  })
}

/*********************代理人****************************/

//增
export const addAgent = param => {
  return axios.request({
    url: getUrl('url/addAgent'),
    data: param,
    method: 'post'
  })
}

//删
export const delAgent = param => {
  return axios.request({
    url: getUrl('url/delAgent'),
    data: param,
    method: 'post'
  })
}

//改
export const updateAgent = param => {
  return axios.request({
    url: getUrl('url/updateAgent'),
    data: param,
    method: 'post'
  })
}

//查
export const getAgentList = param => {
  return axios.request({
    url: getUrl('url/getAgentList'),
    data: param,
    method: 'post'
  })
}

//下拉列表
export const getAgentGroupDownList = param => {
  return axios.request({
    url: getUrl('url/getAgentGroupDownList'),
    data: param,
    method: 'post'
  })
}
/*****************回调**********************************/
//回调配置根据id删除
export const deleteLogConfigById = param => {
  return axios.request({
    url: getUrl('log/deleteLogConfigById'),
    data: param,
    method: 'post'
  })
}

//回调配置根据代理人一键添加
export const addLogConfigSimple = param => {
  return axios.request({
    url: getUrl('log/addLogConfigSimple'),
    data: param,
    method: 'post'
  })
}

//回调配置添加
export const addLogConfig = param => {
  return axios.request({
    url: getUrl('log/addLogConfig'),
    data: param,
    method: 'post'
  })
}

//回调配置编辑
export const editLogConfig = param => {
  return axios.request({
    url: getUrl('log/editLogConfig'),
    data: param,
    method: 'post'
  })
}

//回调配置回显
export const getLogConfigList = param => {
  return axios.request({
    url: getUrl('log/getLogConfigList'),
    data: param,
    method: 'post'
  })
}

//编辑回调日志转换参数
export const editRebackLog = param => {
  return axios.request({
    url: getUrl('log/editRebackLog'),
    data: param,
    method: 'post'
  })
}
//添加回调日志配置
export const addRebackLog = param => {
  return axios.request({
    url: getUrl('log/addRebackLog'),
    data: param,
    method: 'post'
  })
}
//回调日志
export const getRebackLogList = param => {
  return axios.request({
    url: getUrl('log/rebackLogList'),
    data: param,
    method: 'post'
  })
}

