import request from '../../utils/request'

//获取信息的接口
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })
//处理添加和修改的接口

//处理删除接口
export const reqDeleteTradeMark = (id) =>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})