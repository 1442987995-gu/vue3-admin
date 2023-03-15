<template>
    <div class="layout-container-demo" style="height:100vh">
      <el-container style="height:100vh">
        <el-aside width="200px" ><SideBar></SideBar></el-aside>
        <el-container>
          <el-header style="padding:0px;"><TopNav></TopNav></el-header>
          <el-main style="padding:0px;">
            <Main></Main>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import Main from './FrameWork/Main.vue'
  import SideBar from './FrameWork/SideBar.vue'
  import TopNav from './FrameWork/TopNav.vue'
  import {ref} from 'vue'
  export default {
      
      setup(){
          
      },
      components:{
        Main,
        SideBar,
        TopNav
      }
  }
  </script>
  
  <style>
  
  </style>