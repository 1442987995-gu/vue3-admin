<template>
    <div>
        <el-card style="margin:20px"><CategorySelect @getCategoryId="getCategoryId"></CategorySelect></el-card>
        <el-card style="margin:20px" v-if="show">
            <el-button type="primary" size="large" @click="add" :disabled="adds">+&nbsp;添加</el-button>
            <el-table border  style="margin-top:20px" :data="AttrList">
              <el-table-column type="index" label="序号" width="80"></el-table-column>
              <el-table-column label="属性名称" prop="attrName" width="150"></el-table-column>
              <el-table-column label="属性值列表">
                <template #default="{row}">        
                  <el-tag type="success" style="margin-left:20px" v-for=" ss in row.attrValueList">{{ss.valueName}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作"  width="250">
                <template #default="{row}">        
              <el-button type="warning" size="small"><el-icon style="margin-right:5px;"><Edit /></el-icon>编辑</el-button>
              <el-popconfirm title="确定删除吗?" @confirm="deletes(row)">
                <template #reference>
                  <el-button type="danger" size="small"><el-icon style="margin-right:5px;"><Delete /></el-icon>删除</el-button>
                </template>
              </el-popconfirm>
            </template>
              </el-table-column>
            </el-table>
        </el-card>
        <el-card style="margin:20px">
            <el-form >
              <el-form-item label="属性名">
                <el-input v-model="attrInfo.attrName" size="large" style="width: 200px;margin-left:10px"  placeholder="请输入属性名称"/>
              </el-form-item>
            </el-form>
            <el-button type="primary" size="large" @click="addAttr" :disabled="adds">+&nbsp;添加属性值</el-button>
            <el-button size="large">取消</el-button>
            <el-table border  style="margin-top:20px;margin-bottom: 20px;"  :data="attrInfo.attrValueList">
              <el-table-column align="center" type="index" label="标签" width="80"></el-table-column>
              <el-table-column label="属性值名称">
                <template #default="{row}">        
                  <el-input v-model="row.valueName" size="mini" placeholder="请输入属性值名称" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="row.flag=false" :ref="$index"></el-input>
                  <span v-else @click="editSpan(row,$index)">{{row.valueName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作"></el-table-column>
            </el-table>
            <el-button type="primary" >保存</el-button>
            <el-button >取消</el-button>
        </el-card>
    </div>
</template>
  
  <script>
  import CategorySelect from '../../components/CategorySelect/index.vue'
  import {ref,getCurrentInstance,reactive} from 'vue'
  export default {
      setup(){
          const { proxy } = getCurrentInstance()
          let category1Id =ref('')
          let category2Id =ref('')
          let category3Id =ref('')
          //
          let attrValue = ref('')
          //控制添加按钮的禁用
          let adds = ref(true)
          //控制添加和编辑的面板
          let show = ref(false)
          //存放平台属性请求成功数据
          const attrInfo = reactive({
              attrName:'',
              attrValueList:[],
              categoryId:0,//三级分类id
              categoryLevel:0//服务器需要区分几级id
          })
          //获取平台属性的请求
          let getData = async ()=>{
              let result = await proxy.$API.attr.reqAttrList(category1Id.value,category2Id.value,category3Id.value)
              console.log(result);
              if(result.code==200){
                AttrList.value = result.data
                console.log(AttrList.value);
              }
          }
          //获取三级分类id
          const getCategoryId = ({categoryId,level})=>{
              if(level==1){
                category1Id.value = categoryId
              }else if(level==2){
                category2Id.value = categoryId
              }else{
                category3Id.value = categoryId  
                getData() 
                adds.value = false   
              }
          }
          //添加属性
          function addAttr(){
              // show.value= false
              attrInfo.attrValueList.push({
                attrId:attrInfo.id,//属性名id
                valueName:'',
                flag:true,
                //flag属性，给每个属性值添加一个标记，用户切换查看模式和编辑模式
              })

          }
          //输入时按钮才能用
          return {
            getCategoryId,category1Id,category2Id,category3Id,AttrList,adds,
            show,addAttr,attrValue,attrInfo
          }
      },
      components:{
        CategorySelect 
      }
  }
  </script>
  
  <style>
  
  </style>