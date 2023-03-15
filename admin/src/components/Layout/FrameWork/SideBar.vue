<template>
    <el-row class="tac" >
    <el-col :span="24">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#304156"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        style="height:100vh;"
      >
      <!-- @open="handleOpen"
        @close="handleClose" -->
        <el-menu-item index="1">
          <el-icon></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>权限管理</span>
          </template>
            <el-menu-item index="1-1" @click="goLogin">品牌管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Sell /></el-icon>
            <span>商品管理</span>
          </template>
            <!-- <el-menu-item index="1-1" @click="goTradeMark">品牌管理</el-menu-item>
            <el-menu-item index="1-2" @click="goAttrs">平台属性管理</el-menu-item> -->
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>
  
<script >
import {Document, Menu as IconMenu,Location,Setting,} from '@element-plus/icons-vue'
export default{
    setup(){},
    methods:{
      goTradeMark(){

        this.$router.push('/trademark')
      },
      goAttrs(){
        this.$router.push('/attr')
      },
      goLogin(){
        this.$router.push('/login')
      }
    }
}
</script>
  
<style scoped>
</style>