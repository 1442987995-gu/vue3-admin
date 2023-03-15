<template>
    <div class="main">
        <el-button type="primary" size="large" @click="add">+&nbsp;添加</el-button>
        <el-table border style="margin-top:10px;" :data="tradeMarkList.records">
          <el-table-column label="序号" width="80"  align="center" type="index"></el-table-column>
          <el-table-column label="品牌名称" prop="tmName"></el-table-column>
          <el-table-column label="品牌LOGO" prop="logoUrl">
            <template #default="{row}">        
               <img :src="row.logoUrl" alt="" style="width: 80px; height: 80px" />
            </template>
          </el-table-column>
          <el-table-column label="操作" >
            <template #default="{row}">        
              <el-button type="warning" @click="edit(row)"><el-icon style="margin-right:5px;"><Edit /></el-icon>编辑</el-button>
              <el-popconfirm title="确定删除吗?" @confirm="deletes(row)">
                <template #reference>
                  <el-button type="danger" ><el-icon style="margin-right:5px;"><Delete /></el-icon>删除</el-button>
                </template>
              </el-popconfirm>
            
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
          <el-pagination
            style="margin-top:20px;margin-left:220px;"
            :currentPage="tradeMarkList.page"
            :page-size="3"
            :page-sizes="[3,5,7]"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="tradeMarkList.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
          <el-dialog v-model="outerVisible" :title="tmForm.id?'修改品牌':'添加品牌'" >
            <el-form   :model="tmForm" :rules="rules" ref="ruleForm">
              <el-form-item label="品牌名称" prop="tmName">
                <el-input v-model="tmForm.tmName" size="large" style="width: 400px;margin-left:10px" />
              </el-form-item>
              <el-form-item label="品牌LOGO" prop="logoUrl">
                <el-upload
                   list-type="picture-card"
                    action="/brand-api/admin/product/fileUpload"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  > 
                    <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" style="width:100px;height:100px;" class="avatar" >
                    <el-icon><Plus /></el-icon>
                  </el-upload>
                  <div slot="tip" class="el-upload__tip" style="margin-top:200px;margin-left:-150px;">只能上传jpg/png文件，且不超过500kb</div>
              </el-form-item>
            </el-form>        
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="outerVisible = false">取消</el-button>
                <el-button type="primary" @click="addOrUpdateTradeMark">确定</el-button>
              </div>
            </template>
          </el-dialog>
    </div>
  </template>
  
<script >
     import { getCurrentInstance,onMounted,ref,reactive} from "vue";
    export default{
      setup(){
        let tradeMarkList = reactive({
             limit:3,
             page:1,
             total:0,
             records:[],
        })
        //收集品牌信息
        let tmForm = reactive({
            tmName:'',
            logoUrl:''
        })
        const {ctx} = getCurrentInstance()
        let rules = reactive({
            tmName: [
                  { required: true, message: '请输入品牌名称', trigger: 'blur' },
                  { min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'change' }
                  ],
            logoUrl: [{ required: true, message: '请选择图片'}]
        })
        const { proxy } = getCurrentInstance()
        //控制添加按钮内容的显示与隐藏
        let outerVisible = ref(false)
        //获取输入框数据
        let ruleForm = ref(null)
        //获取数据
        let getData = async() =>{
            let result =  await proxy.$API.trademark.reqTradeMarkList(tradeMarkList.page,tradeMarkList.limit)
            // console.log(result);
            if(result.code==200){
              tradeMarkList.total = result.data.total
              tradeMarkList.records = result.data.records
            }
        }
        //编辑按钮
        function edit(row){
          outerVisible.value = true
          tmForm.tmName = row.tmName
          tmForm.logoUrl = row.logoUrl
          tmForm.id = row.id
        }
        //删除按钮
        let  deletes = async(row)=>{
          
          let result =await proxy.$API.trademark.reqDeleteTradeMark(row.id)
          if(result.code==200){
            getData(tradeMarkList.records.length>1?tradeMarkList.page:--tradeMarkList.page)  
          }        
        }
        function add(){
          outerVisible.value = true
          tmForm.tmName=''
          tmForm.logoUrl=''
        }  
        // tmForm.id?'修改品牌':'添加品牌'
        //当前页面显示数据个数发生改变时触发
        function handleSizeChange(limit){
            tradeMarkList.limit = limit
            getData()
         }
         //当前页发生改变时触发
        function handleCurrentChange(current){
            tradeMarkList.page= current
            getData()
        }
        function handleAvatarSuccess(res, file) {
      //res:上传成功后返回前端数据
      //file:上传成功后服务器返回给前端数据
      // this.imageUrl = URL.createObjectURL(file.raw);
         tmForm.logoUrl =res.data
        }
        function beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
        //提交表单信息
        const addOrUpdateTradeMark=  ( ruleForm => {
               ctx.$refs.ruleForm.validate(  async(valid, fields) => {
              if (valid) {
                outerVisible.value = false
                let result = await proxy.$API.trademark2.addEdit(tmForm)       
                if(result.code==200){
                  getData(tmForm.id?tradeMarkList.page:1);
                }
                console.log('submit!')
              } else {
                console.log('error submit!', fields)
              }
            })
         }
        )
        onMounted( ()=>{
            getData()
        })
        return{
            tradeMarkList,edit,deletes,outerVisible,handleSizeChange,
            handleCurrentChange,tmForm,rules,
            ruleForm,handleAvatarSuccess,beforeAvatarUpload,addOrUpdateTradeMark,add
        }
      }
    }
</script>
  
<style scoped>
.main{
  margin-top:20px;
  margin-left: 20px;
}

</style>