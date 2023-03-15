<template>
    <div>
        <el-form :inline="true" class="demo-form-inline" :model="cForm">
          <el-form-item label="一级分类">
              <el-select  placeholder="请选择" v-model="cForm.category1Id" @change="handler1">
                <el-option :label="c1.name" :value="c1.id" v-for="c1 in list1" :key="c1.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="二级分类" >
              <el-select  placeholder="请选择"  v-model="cForm.category2Id" @change="handler2">
                <el-option :label="c2.name" :value="c2.id" v-for="c2 in list2" :key="c2.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="三级分类">
              <el-select  placeholder="请选择" v-model="cForm.category3Id" @change="handler3">
                <el-option :label="c3.name" :value="c3.id" v-for="c3 in list3" :key="c3.id"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
    </div>
</template>
  
  <script>
  import {onMounted,getCurrentInstance,ref,reactive} from 'vue'
  export default {    
      setup(){
         let list1 = ref(null)
         let list2 = ref(null)
         let list3 = ref(null)
         let cForm = reactive({
             category1Id:'',
             category2Id:'',
             category3Id:'',
         })
         const { proxy } = getCurrentInstance()
         const getData = async ()=>{
             let result = await proxy.$API.attr.reqCategory1List()
             if(result.code==200){
                 list1.value = result.data
             }
         }
         const handler1 = async() =>{
             list2.value = []
             list3.value = []
             cForm.category2Id = ''
             cForm.category3Id = ''
             proxy.$emit('getCategoryId',{categoryId:cForm.category1Id,level:1})
             let result = await proxy.$API.attr.reqCategory2List(cForm.category1Id)
             if(result.code==200){
                 list2.value = result.data
             }
         }
         const handler2 = async() =>{
             list3.value = []
             cForm.category3Id = ''
             proxy.$emit('getCategoryId',{categoryId:cForm.category2Id,level:2})
             let result = await proxy.$API.attr.reqCategory3List(cForm.category2Id)
             if(result.code==200){
                 list3.value = result.data
             }
         }
         const handler3 = async () =>{
             proxy.$emit('getCategoryId',{categoryId:cForm.category3Id,level:3})
         }
         onMounted(()=>{
             getData()
         })
         return{
          getData,list1,list2,list3,cForm,handler1,handler2,handler3
         }
      }
  }
  </script>
  
  <style>
  
  </style>