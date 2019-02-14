<template>
  <div class="mainbox">
    <div class="content-box">

      <div class="header-box">
        <el-date-picker
          v-model="startDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" class="datestyle">
        </el-date-picker>

        <el-button type="primary" icon="el-icon-search" @click="searchFn">搜索</el-button>
        <el-button type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>

      </div>
    </div>
    <!--tab-->
    <div class="main-content-table" id="rebateSetTable">

      <el-table
        :header-cell-style="this.tableHeaderColor"
        v-loading="loading"
        :data="this.COMMON.publicVariable.tableData"
        style="width: 100%"

        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="name" label="序号"  align="center" type="index" width="100" ></el-table-column>
        <el-table-column prop="date" label="分局"  align="center" >
          <template slot-scope="scope">
            <el-button type="text" @click="openfj(scope.row.name,1)" class="suboffice">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="总数" align="center">
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
        <el-table-column prop="name" label="精华数" align="center">
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

      <!--二级单位Start-->
      <el-dialog title="" :visible.sync="dialogTableVisible"  width="90%">
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
              <el-button type="text" @click="openfj(scope.row.name,2)" class="suboffice">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="address"  label="总数" align="center" >
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
        <!--<el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>-->
        <!--二级单位End-->

        <!--三级页面-->
        <el-dialog
          width="60%"
          title="三级单位"
          :visible.sync="innerVisible"
          append-to-body>
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
                <el-button type="text" @click="openfj(scope.row.name)" class="suboffice">{{scope.row.name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="address"  label="总数" align="center" >
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
            <el-table-column prop="name" label="精华数" align="center">
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

          <div class="pagebox">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              background
              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>

        </el-dialog>


      </el-dialog>

    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'mainbox',
  components:{
    FileSaver,
    XLSX
  },
  data() {
    return {
      dialogTableVisible: false,
      innerVisible:false,
      pagesize: 12,
      pagesizes: null,
      currentPage: 1,
      total: '',
      showpage: true,
      listarr: [],
      endDate: '',
      startDate: '',
      loading: false,
      value11: [],
      value12: [],
      oneLeven:[], // 一级页面
      twoLeven:[],  // 二级页面
      threeLeven:[],  // 三级页面
    }
  }, mounted: function () {
    // this.getlist();

  }, methods: {
    exportExcel () {
      /* generate workbook object from table */
      let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
      /* get binary string as output */
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '动态-单位统计表.xlsx');
      } catch (e)
      {
        if (typeof console !== 'undefined')
          console.log(e, wbout)
      }
      return wbout
    },
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
          _this.COMMON.publicVariable.tableData = response.data.data.records;
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
    requestPublic(param){
    
      var _this = this;
      // _this.loading = true
      this.$http.post(this.COMMON.GetaWay_url + this.COMMON.solution + "/projectinfo/list",
        JSON.stringify({
          "accessToken": this.accessToken,
          "query": {
            "projectName_LIKE": ""
          },
        }), {
          headers: this.COMMON.headerJson
        }).then(function (response) {
        if (response.data.code == 200) {
          _this.loading = false
          // this.openFullScreen()
          if(param==1){
                  _this.oneLeven = []
          }else{
                  _this.twoLeven = []
          }
          _this.COMMON.publicVariable.tableData = response.data.data.records;
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
    openfj(value,flag){
      //  debugger   
       if(flag==1){
            this.dialogTableVisible = true;
            this.requestPublic(flag)
       }else{
            this.innerVisible = true
            this.requestPublic(flag)
       }
      // console.log($event.currentTarget.classList[1])
    
    },
    handleSizeChange(size) {
      this.pagesize = size;
      console.log(size)
      this.getlist(this.currentPage, this.pagesize)
    },
    handleCurrentChange(curr) {
      this.currentPage = curr;
      console.log(curr)
      this.getlist(this.currentPage, this.pagesize)
    },
    tableHeaderColor1({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#f5f5f5;color: #000;font-weight: 600;'
      }
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
  body {
    background: #8cc5ff;
  }
  .mainbox {
    overflow: hidden;
    margin-top: -53px;
    .content-box {
      width: 100%;
      display: flex;
      background: #f5f5f5;
      padding: 20px;
      .header-box {
        /*margin-left: 30px;*/
      }
    }
    .suboffice{
      cursor: pointer;
    }
    .main-content-table {
      margin: 10px 0px 20px 0px;
      .jh{
          color: #ffba00;
      }
      .bj{
        color: #acacac;
      }
      .total{
        color: #ff1d04;
      }
    }

  }

  .pagebox {
    margin-top: 20px;
    text-align: center;
  }

</style>
