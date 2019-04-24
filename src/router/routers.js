import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/log',
    name: '日志',
    meta: {
      icon: ' iconfont icon-yanchurili',
      title: '日志'
    },
    component: Main,
    children: [
      {
        path: 'rebackLog',
        name: '回调日志',
        meta: {
          icon: ' iconfont icon-damailogo',
          title: '回调日志'
        },
        component: () => import('@/view/log/log-reback.vue')
      },
      {
        path: 'upxInterFaceLog',
        name: '访问日志',
        meta: {
          icon: ' iconfont icon-weishiyong',
          title: '访问日志'
        },
        component: () => import('@/view/log/log-interface.vue')
      },
      {
        path: 'queryRouteLog',
        name: '链路日志',
        meta: {
          icon: 'ios-infinite',
          title: '链路日志'
        },
        component: () => import('@/view/log/log-url.vue')
      },
      {
        path: 'getCpicQueueData',
        name: '队列日志',
        meta: {
          icon: 'md-list',
          title: '队列日志'
        },
        component: () => import('@/view/log/log-queen.vue')
      },
      {
        path: 'getRenInfo',
        name: '续保日志',
        meta: {
          icon: 'ios-people',
          title: '续保日志'
        },
        component: () => import('@/view/log/log-reninfo.vue')
      },
    ]
  },
  {
    path: '/url',
    name: '链路',
    meta: {
      icon: 'md-cloud-upload',
      title: '链路'
    },
    component: Main,
    children: [
      {
        path: 'getPolicyList',
        name: '服务策略配置',
        meta: {
          icon: 'ios-document',
          title: '服务策略配置'
        },
        component: () => import('@/view/url/url-service-config.vue')
      },
      {
        path: 'getRouteConfig',
        name: '路由配置',
        meta: {
          icon: 'md-clipboard',
          title: '路由配置'
        },
        component: () => import('@/view/url/url-route.vue')
      },
      {
        path: 'getUfServiceList',
        name: '服务链路配置',
        meta: {
          icon: 'md-clipboard',
          title: '服务链路配置'
        },
        component: () => import('@/view/url/url-list-config.vue')
      },
      {
        path: 'addAgent',
        name: '代理人配置',
        meta: {
          icon: 'md-clipboard',
          title: '代理人配置'
        },
        component: () => import('@/view/url/url-agent.vue')
      },
      {
        path: 'addAgentGroup',
        name: '代理人组配置',
        meta: {
          icon: 'md-clipboard',
          title: '代理人组配置'
        },
        component: () => import('@/view/url/url-agent-group.vue')
      }

    ]
  },
  {
    path: '/config',
    name: '配置',
    meta: {
      icon: 'md-cloud-upload',
      title: '配置'
    },
    component: Main,
    children: [
      {
        path: 'pulsUrlList',
        name: '回调链路配置',
        meta: {
          icon: 'ios-document',
          title: '回调链路配置'
        },
        component: () => import('@/view/config/config-reback.vue')
      },
      {
        path: 'selectAllInterface',
        name: '安全验证接口配置',
        meta: {
          icon: 'md-clipboard',
          title: '安全验证接口配置'
        },
        component: () => import('@/view/config/config-SSL.vue')
      },
      {
        path: 'getUfServiceList',
        name: '服务链路配置',
        meta: {
          icon: 'md-clipboard',
          title: '服务链路配置'
        },
        component: () => import('@/view/url/url-list-config.vue')
      },
      {
        path: 'addAgent',
        name: '代理人配置',
        meta: {
          icon: 'md-clipboard',
          title: '代理人配置'
        },
        component: () => import('@/view/url/url-agent.vue')
      },
      {
        path: 'addAgentGroup',
        name: '代理人组配置',
        meta: {
          icon: 'md-clipboard',
          title: '代理人组配置'
        },
        component: () => import('@/view/url/url-agent-group.vue')
      }

    ]
  },
]
