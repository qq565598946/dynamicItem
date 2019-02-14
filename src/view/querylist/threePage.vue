
<template>
  <div class="mainbox">
    <!--tab-->
    <div class="main-content-table">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="BreadBox">
        <el-breadcrumb-item :to="{ path: '/' } ">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/subofficeCon'}">{{twoPage}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/threePage'}">{{areaNameChild}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table
        :header-cell-style="this.tableHeaderColor"
        v-loading="loading"
        :data="this.COMMON.publicVariable.tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="name" label="序号"  align="center" type="index" width="100"></el-table-column>
        <el-table-column prop="date" label="分局"  align="center" >
          <template slot-scope="scope">
            <!--<span ></span>-->
            <el-button type="text">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column   label="总数" align="center">
          <template slot-scope="scope">
            <span class="total">{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column   label="白金数" align="center" >
          <template slot-scope="scope">
            <span class="bj">11</span>
            <!--<span type="text" @click="openfj" v-html="getinfo(status['_'+scope.row.address],scope.row.address,true)">罗湖</span>-->
          </template>
        </el-table-column>
        <el-table-column prop="name" label="精华数" align="center"  >
          <template slot-scope="scope">
            <span class="jh">11</span>
            <!--<span type="text" @click="openfj" v-html="getinfo(status['_'+scope.row.address],scope.row.address,true)">罗湖</span>-->
          </template>
        </el-table-column>
        <!--<el-table-column prop="name" label="点赞数" align="center" width="180"></el-table-column>-->
        <!--<el-table-column prop="name" label="评论数" align="center"  width="180"></el-table-column>-->
        <!--<el-table-column prop="name" label="局长点赞" align="center"  width="180"></el-table-column>-->
        <!--<el-table-column prop="name" label="局长评论" align="center"  width="180"></el-table-column>-->

      </el-table>

    </div>
    <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="currentPage"-->
      <!--background-->
      <!--layout="prev, pager, next"-->
      <!--:total="1000">-->
    <!--</el-pagination>-->
  </div>
</template>

<script>
export default {
  name: 'subofficeCon',
  data() {
    return {
      pagesize: 12,
      pagesizes: null,
      currentPage: 1,
      total: '',
      showpage: true,
      listarr: [],
      endDate: '',
      startDate: '',
      loading: false,
      twoPage:'',
      areaNameChild:'',// 面包屑分区名称
      status:{      // 审核状态信息
        _1:{title:'待审核',color:'rgb(255,215,0)'},
        _2:{title:'已审核',color:'rgb(50,205,50)'},
        _3:{title:'驳回',color:'rgb(220,220,220)'},
        _4:{title:'下线',color:'rgb(255,0,0)'},
        _5:{title:'删除',color:'rgb(0,0,0)'}
      },
      value11: [],
      value12: [],
    }
  }, mounted: function () {
    this.twoPage = sessionStorage.getItem('twoPage');

    this.areaNameChild =  this.$route.query.name ; // 面包屑名称
    this.getlist();
  }, methods: {
    getlist(current, size) {

      var _this = this;
      // _this.loading = true
      this.$http.post(this.COMMON.GetaWay_url + this.COMMON.solution + "/projectinfo/list",
        JSON.stringify({
          "accessToken": this.accessToken,
          "query": {
            "projectName_LIKE": ""
          },
          "page": {
            "current": current,
            "size": size
          }
        }), {
          headers: this.COMMON.headerJson
        }).then(function (response) {
        if (response.data.code == 200) {
          // this.openFullScreen()
          _this.listarr = response.data.data.records;
          _this.total = response.data.data.total;
          _this.storeNum = response.data.data.total;

          if (_this.listarr.length >= 10) {
            _this.showpage = true
          }
        }
      }).catch(function (error) {
        _this.$notify({title: '失败', message: '网络错误', type: 'error'});
        _this.loading = false
      });
    },
    searchFn(val) {
      if (this.startDate.length < 1) {
        this.$notify({title: '提示', message: '请选择日期', type: 'error'});
        return
      }
      console.log(this.startDate)
      console.log("value1---", this.value11)
      console.log("value2---", this.value12)
      console.log(this.startDate)
      this.loading = true
    },
    exportWord() {

    },
    getinfo(item,key,isalert){
      if(item){
        if(isalert){
          return `<span style="color:${item.color}" key="${key}">${item.title}</span>`
        }
        return `<span style="color:${item.color}" key="${key}">${item.title}</span>`
      }else{
        return ''
      }
    },
    openfj(value){
      // this.$router.push({
      //   path:'/subofficeCon',
      //   query:{
      //     id:'1',
      //     flag:'threePage',
      //     name:value
      //   }
      // })


      // this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', '分局', {
      //   dangerouslyUseHTMLString: true
      // });
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getlist(this.currentPage, this.pagesize)
    },
    handleCurrentChange(curr) {
      this.currentPage = curr;
      this.getlist(this.currentPage, this.pagesize)
    },
  }
}
</script>
<style scoped lang="less" type="text/less">
  body {
    background: #8cc5ff;
  }
  .mainbox{
    margin-top: -53px;
    overflow: hidden;
    .content-box {
      width: 100%;
      display: flex;
      .header-box {
        /*margin-left: 50px;*/
      }
    }
    .main-content-table {
      margin: 10px 0px 20px 0px;
    }
    .BreadBox{
      width: 100%;
      display: flex;
      background: #f5f5f5;
      padding: 20px;
      margin-bottom: 10px;
    }
    .jh{
      color: #0085ff;
    }
    .bj{
      color: #ffbe35;
    }
    .total{
      color: #ff1d04;
    }
  }
</style>
