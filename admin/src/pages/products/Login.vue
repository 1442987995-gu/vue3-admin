<template>
    <h1>我是登录页</h1>
    <input type="text" v-model="model.username">
    <input type="text" v-model="model.password" >
    <button @click="ss">登录</button>
</template>
<script setup>
    import {reactive,getCurrentInstance} from 'vue'
    
    const { proxy } = getCurrentInstance()
    const model = reactive({
        username:'',
        password:''
    })
    async function  ss(){
        let {username,password} = model
       let result = await proxy.$API.attr.reqLogin(username,password)
        console.log(result);

    }
    
</script>
<style>
input{
    border: 1px solid black;
}
</style>