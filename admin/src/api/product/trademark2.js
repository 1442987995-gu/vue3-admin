import request from '../../utils/request'
//处理添加和修改的接口
export const addEdit = (tradeMark) =>{
    if(tradeMark.id){
        return request({url:'admin/product/baseTrademark/update',method:'post',data:tradeMark})
    }else{
        return request({url:'admin/product/baseTrademark/save',method:'post',data:tradeMark})
    }
}