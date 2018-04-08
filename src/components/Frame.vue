<template>
    <div class="container flex">
        <div class="header flex-0  flex bg-white">
            <div class="logo flex-0">
                新闻管理后台
            </div>
            <div class="flex-1">
                <el-menu default-active="1" @open="handleOpen" @close="handleClose" mode="horizontal">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">新闻管理</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-document"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item> -->
                </el-menu>
            </div>
            <div class="person flex-0 flex">
                <el-button plain size="small" v-popover:popover2>用户名</el-button>
                <el-popover ref="popover2" placement="bottom" trigger="click">
                    <div class="color-danger text-center logout">
                        退出
                    </div>
                </el-popover>
            </div>
        </div>
        <div class="content flex-1 ">
            <router-view class="bg-white"></router-view>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
}
.header {
  height: 61px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
}
.content {
  flex-wrap: nowrap;
  padding: 10px;
  box-sizing: border-box;
}
.content>div{
    padding: 10px;
}
.content>div>>>h3{
    font-weight: bold;
    margin: 0;
    font-size: 18px;
}
.logo {
  line-height: 61px;
  font-size: 20px;
  margin-right: 30px;
}
.person {
  justify-content: center;
  align-items: center;
}
.logout {
  padding: 5px 0;
  cursor: pointer;
}
.logout:hover {
  background-color: #f2f2f2;
}
.nav {
  width: 230px;
}
</style>
<style>
.el-popover {
  width: 150px;
  padding: 8px;
}
</style>
