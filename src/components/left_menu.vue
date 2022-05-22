<template>
  <div class="left-menu">
    <el-menu collapse-transition router unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
      <div class="logo-box" @click="toggle(isCollapse)">
        <img src="../assets/img/logo.png" alt="" class="logo">
        <span :class="pftitle">马涛多功能平台</span>
      </div>
      <el-submenu v-for="menu in all_menus" :key="menu.id" :index="menu.name" class="el-menu-item-demo">
        <template slot="title">
          <i class="iconfont" :class="menu.icon"></i>
          <span>{{menu.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="sub_menu in menu.menus" :index="sub_menu.index" :key="sub_menu.id">
            <template slot="title">
              <i class="iconfont" :class="sub_menu.icon"></i>
              <span>{{sub_menu.name}}</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "left_menu",
  data () {
    return {
      pftitle: 'title-hidden',
      isCollapse: true,
      all_menus: []
    }
  },
  methods: {
    toggle(showType) {
      this.isCollapse = !showType
      if (showType) {
        this.pftitle = 'title-show'
      } else {
        this.pftitle = 'title-hidden'
      }
      this.$root.Bus.$emit('toggle', showType)
    },
    getMenus() {
      this.all_menus = [
        {"id":100,
          "name":"公共组件",
          "icon":"icon-gonggongzujian",
          "path":null,
          "menus":[
            {
              "id":111,
              "name":"文件管理",
              "icon":"icon-wenjianguanli",
              "path":"/common/fileManage",
              "menus":null
            },
            {
              "id":121,
              "name":"公共参数",
              "icon":"icon-gonggongcanshu",
              "path":"/common/commonParam",
              "menus":null
            },
            {
              "id":131,
              "name":"函数管理",
              "icon":"icon-hanshuguanli",
              "path":"/common/funcManage",
              "menus":null
            },
            {
              "id":141,
              "name":"控件管理",
              "icon":"icon-kongjianguanli",
              "path":"/common/operationManage",
              "menus":null
            }
            ]
        },
        {
          "id":200,
          "name":"环境中心",
          "icon":"icon-huanjingzhongxin",
          "path":null,
          "menus":[
            {
              "id":211,
              "name":"环境管理",
              "icon":"icon-huanjingguanli",
              "path":"/envCenter/envManage",
              "menus":null
            },
            {
              "id":221,
              "name":"引擎管理",
              "icon":"icon-yinqinguanli",
              "path":"/envCenter/engineManage",
              "menus":null
            }
            ]
        },
        {
          "id":300,
          "name":"用例中心",
          "icon":"icon-yonglizhongxin",
          "path":null,
          "menus":[
            {
              "id":311,
              "name":"接口管理",
              "icon":"icon-jiekouguanli",
              "path":"/caseCenter/interfaceManage",
              "menus":null
            },
            {
              "id":321,
              "name":"元素管理",
              "icon":"icon-yuansuguanli",
              "path":"/caseCenter/elementManage",
              "menus":null
            },
            {
              "id":331,
              "name":"用例管理",
              "icon":"icon-yongliguanli",
              "path":"/caseCenter/caseManage",
              "menus":null
            }
            ]
        },
        {
          "id":400,
          "name":"计划管理",
          "icon":"icon-jihuaguanli",
          "path":null,
          "menus":[
            {
              "id":411,
              "name":"测试集合",
              "icon":"icon-ceshijihe",
              "path":"/planManage/testCollection",
              "menus":null
            },
            {
              "id":421,
              "name":"测试计划",
              "icon":"icon-ceshijihua",
              "path":"/planManage/testPlan",
              "menus":null
            }
            ]
        },
        {
          "id":500,
          "name":"测试追踪",
          "icon":"icon-ceshizhuizong",
          "path":null,
          "menus":[
            {
              "id":511,
              "name":"测试报告",
              "icon":"icon-ceshibaogao",
              "path":"/report/testReport",
              "menus":null
            }
            ]
        }
        ]
    }
  },
  created() {
    this.getMenus()
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo{
  width: 48px;
}
.el-menu-item-demo .el-submenu__title{
  height: 48px;
  line-height: 48px;
  padding-left: 16px !important;
}
.el-menu-item-group__title {
  padding: 0;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logo{
  height: 20px;
  width: 20px;
  color: #ffffff;
  vertical-align: middle;
}
.logo-box {
  height: 40px;
  font-size: 16px;
  text-align: center;
  padding: 10px 0;
  white-space: nowrap;
}
.title-hidden{
  vertical-align: middle;
  height: 0;
  width: 0;
  display: none;
}
.title-show{
  vertical-align: middle;
  height:20px;
  margin-left: 10px;
  margin-right: 20px;
  color: rgb(255, 255, 255);
}
</style>
