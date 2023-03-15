import axios from 'axios'

const requests = axios.create({
    baseURL:'/api',
    timeout:5000
})
//请求拦截器：在发请求之前，它可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
  //config:配置对象，对象里有一个重要属性：header请求头
  //进度条开始
  // if(store.state.detail.uuid_token){
  //     //给请求头添加字段，地和后台商量好
  //     config.headers.userTempId = store.state.detail.uuid_token
  // }
  // if(store.state.user.token){
  //     //给请求头添加字段，地和后台商量好
  //     config.headers.token= store.state.user.token
  // }
  // nProgress.start();
  return config
});
//响应拦截器
requests.interceptors.response.use((res)=>{
  //成功的回调，服务器返回数据后，它可以检测到，可以做一些事情
  //进度条结束
  // nProgress.done()
  return res.data
},(err)=>{
  //失败的回调
  return Promise.reject(new Error('faile'));
})
  
export default requests
  
  