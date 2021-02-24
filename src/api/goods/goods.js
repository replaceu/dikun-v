import request from '@/utils/request'


export default{
  //1.商品列表（商品列表条件分页查询）
   getGoodsListPage(current,limit,goodsQuery) {
    return request({
      //url: '/table/list',
      url:`/servicestock/goods/goodsPageConditionList/${current}/${limit}`,
      method: 'post',
      //goodsQuery条件对象，后端使用RequestBody获取数据
      data:goodsQuery
    })
  }
}