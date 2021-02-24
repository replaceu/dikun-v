<template>
  <div class="app-container">

        <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="goodsQuery.name" placeholder="商品名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="goodsQuery.sumBegin" placeholder="起始数量"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="goodsQuery.sumEnd" placeholder="终止数量"/>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="goodsQuery.begin" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00"/>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="goodsQuery.end" type="datetime" placeholder="选择截止时间" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00"/>
      </el-form-item>
      <el-button type="primary"  @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

      <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column prop="id" label="序号"  width="50"  align="center"/>
      <el-table-column prop="name" label="商品名称" width="100" align="center"/>
      <el-table-column prop="imgAddress" label="图片地址" width="200" height="300" align="center" >
      <!---->
        <template slot-scope="scope">
        <!--to do-->
          <img :src="scope.row.imgAddress" width="100" height="100"/>
        </template>
      </el-table-column>
      <el-table-column prop="sum" label="库存数量" width="200" align="center"/>
      <el-table-column prop="details" label="库存明细"  align="center"/>
      <el-table-column prop="gmtCreate" label="创建时间" width="200" align="center"/>
      <el-table-column prop="gmtModified" label="创建时间" width="200" align="center"/>
    </el-table>
      <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>

//引入调用goods.js文件
import goods from '@/api/goods/goods'
export default {
  //写核心代码位置

  data(){
    return{
      //src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      list:null,
      page:1,//当前页
      limit:10,//每页记录数
      total:0,//总记录数
      goodsQuery:{},//条件封装对象 
    }
  },
  created(){
    //页面渲染之前执行，一般调用methods定义的方法
    this.getList()
  },
  methods:{
    getList(page=1) {
      this.page = page
      goods.getGoodsListPage(this.page,this.limit,this.goodsQuery)
          .then(response =>{//请求成功
             //response接口返回的数据
             console.log(response)
             this.list = response.data.rows
             this.total = response.data.total
             console.log(this.list)
             console.log(this.total)
             });
        },
    resetData() {
      this.goodsQuery = {}
      this.getList()
}
  }
}
</script>>