<template>
  <div class="mainbox">
    <div class="content-box">

      <div class="header-box">
      <el-select v-model="selectesValue" placeholder="请选择" @change="currentSel">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  
        <el-date-picker
    
          :picker-options="pickerOptions2"
          v-model="startDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" class="datestyle">
      
        </el-date-picker>
           <div class="demo-input-suffix">
              <el-select v-model="SelectsDepType" placeholder="请选择二或者三级部门" @change="currenDepType">
                  <el-option
                    v-for="DepItem in DepOption"
                    :key="DepItem.value"
                    :label="DepItem.label"
                    :value="DepItem.value">
                  </el-option>
          </el-select>
        </div> 
        <div class="demo-input-suffix">
          
          <el-input
             
              placeholder="请输入部门名称查询"
              prefix-icon="el-icon-search"
              v-model="searchDepCon.DepNameSearch">
            </el-input>
        </div>
 

        <el-button type="primary" icon="el-icon-search" @click="searchFn">搜索</el-button>
        <el-button type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>

      </div>
    </div>
    <!--tab-->
    <div class="main-content-table"   id="rebateSetTable">

      <el-table
        v-if = "showUserTable"
        :header-cell-style="this.tableHeaderColor"
        v-loading="loading"
        :data="oneLeven"
        style="width: 100%"
        key="oneLeven"
        @sort-change='tableSortChange'
        
      >
        <el-table-column  label="序号"  align="center" type="index" width="100" ></el-table-column>
          <el-table-column  label="姓名"  align="center">
                   <template slot-scope="scope">
            <el-button type="text">{{ scope.row.userName}}</el-button>
          </template>     
          </el-table-column>
              <el-table-column  label="警号"  align="center"  prop="userCode"></el-table-column>
               <el-table-column label="动态数" align="center" :sortable="true" :sort-method="sortByDate" >
                <template slot-scope="scope" >
                  <span class="total">{{scope.row.count}}</span>
                </template>
        </el-table-column>
         <el-table-column   label="白金数" align="center" sortable >
          <template slot-scope="scope">
            <span class="bj">{{scope.row.totalPlatinum}}</span>
            <!--<span type="text" @click="openfj" v-html="getinfo(status['_'+scope.row.address],scope.row.address,true)">罗湖</span>-->
          </template>
        </el-table-column>
        <el-table-column label="精华数" align="center" sortable>
          <template slot-scope="scope">
            <span class="jh">{{scope.row.totalCream}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="点赞数"  align="center" prop='totalThumpUpCount' sortable></el-table-column>
        <el-table-column  label="评论数"  align="center" prop='totalCommentCount' sortable></el-table-column>
        <el-table-column  label="一级部门"  align="center"  prop="deptNameLevel1"> </el-table-column>
        <el-table-column  label="二级部门"  align="center"  prop="deptNameLevel2"> </el-table-column>
        <el-table-column  label="三级部门"  align="center" prop="deptNameLevel3"></el-table-column>
       
        <!--<el-table-column prop="name" label="局长点赞" align="center"  width="180"></el-table-column>-->
        <!--<el-table-column prop="name" label="局长评论" align="center"  width="180"></el-table-column>-->

      </el-table>

         <el-table
          v-if = 'showDepTable'
          :header-cell-style="this.tableHeaderColor"
          v-loading="loading"
          :data="twoLeven"
            key="twoLeven"
          style="width: 100%"

          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column  label="序号"  align="center" type="index" width="100"></el-table-column>
          <el-table-column  label="二级部门"  align="center" >
            <template slot-scope="scope">
              <!--<span ></span>-->
              <el-button type="text" @click="openfj(scope.row.deptIdLevel2,2)" class="suboffice">{{scope.row.deptNameLevel2}}</el-button>
            </template>
          </el-table-column>
          <el-table-column  label="动态数" align="center" sortable >
            <template slot-scope="scope">
              <span class="total">{{scope.row.count}}</span>
            </template>
          </el-table-column>
          <el-table-column   label="白金数" align="center" sortable >
            <template slot-scope="scope">
              <span class="bj">{{scope.row.totalPlatinum}}</span>
              
            </template>
          </el-table-column>
          <el-table-column label="精华数" align="center" sortable>
            <template slot-scope="scope" >
              <span class="jh">{{scope.row.totalCream}}</span>
        
            </template>
          </el-table-column>
          <!--<el-table-column prop="name" label="点赞数" align="center" width="180"></el-table-column>-->
          <!--<el-table-column prop="name" label="评论数" align="center"  width="180"></el-table-column>-->
          <!--<el-table-column prop="name" label="局长点赞" align="center"  width="180"></el-table-column>-->
          <!--<el-table-column prop="name" label="局长评论" align="center"  width="180"></el-table-column>-->

        </el-table>


     <!--三级部门-->
    
        <el-dialog
          width="60%"
          title="三级部门"
          :visible.sync="innerVisible"
          append-to-body>

     <div class="content-box" style="margin-bottom:10px">
          <div class="header-box">

           <div class="demo-input-suffix">
              <el-select v-model="SelectsDepType" placeholder="请选择二或者三级部门" @change="currenDepType">
                  <el-option
                    v-for="DepItem in DepOption"
                    :key="DepItem.value"
                    :label="DepItem.label"
                    :value="DepItem.value">
                  </el-option>
          </el-select>
        </div> 
        <div class="demo-input-suffix">
          
          <el-input
             
              placeholder="请输入部门名称查询"
              prefix-icon="el-icon-search"
              v-model="searchDepCon.DepNameSearch">
            </el-input>
        </div>
 

        <el-button type="primary" icon="el-icon-search" @click="TLsearchFn">搜索</el-button>
        <el-button type="primary" icon="el-icon-download" @click="exportExcel(4)">导出</el-button>
        </div>  
   </div>


          <el-table
          id="threeDepTable"
            :header-cell-style="this.tableHeaderColor"
            v-loading="loading"
            :data="threeLeven"
             key="threeLeven"
            style="width: 100%"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column label="序号"  align="center" type="index" width="100"></el-table-column>
            <el-table-column  label="三级部门"  align="center" >
              <template slot-scope="scope">
                <!--<span ></span>-->
                <el-button type="text">{{scope.row.deptNameLevel3}}</el-button>
              </template>
            </el-table-column>
            <el-table-column  label="动态数" align="center"  sortable>
              <template slot-scope="scope">
                <span class="total">{{scope.row.count}}</span>
              </template>
            </el-table-column>
            <el-table-column   label="白金数" align="center" sortable>
              <template slot-scope="scope">
              <span class="bj">{{scope.row.totalPlatinum}}</span>
                <!--<span type="text" @click="openfj" v-html="getinfo(status['_'+scope.row.address],scope.row.address,true)">罗湖</span>-->
              </template>
            </el-table-column>
            <el-table-column label="精华数" align="center" sortable>
              <template slot-scope="scope">
              <span class="jh">{{scope.row.totalCream}}</span>
                <!--<span type="text" @click="openfj" v-html="getinfo(status['_'+scope.row.address],scope.row.address,true)">罗湖</span>-->
              </template>
            </el-table-column>
        <el-table-column  label="一级部门"  align="center"  prop="deptNameLevel1"> </el-table-column>
        <el-table-column  label="二级部门"  align="center"  prop="deptNameLevel2"> </el-table-column>

       


            <!--<el-table-column prop="name" label="点赞数" align="center" width="180"></el-table-column>-->
            <!--<el-table-column prop="name" label="评论数" align="center"  width="180"></el-table-column>-->
            <!--<el-table-column prop="name" label="局长点赞" align="center"  width="180"></el-table-column>-->
            <!--<el-table-column prop="name" label="局长评论" align="center"  width="180"></el-table-column>-->

          </el-table>

          <div class="pagebox">
            <el-pagination
              v-if="showpage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              background
              layout="prev, pager, next"
              :total="threeLevenTotal">
            </el-pagination>
          </div>

        </el-dialog>



          <div class="pagebox">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              background
              :page-sizes="[10,50,100,200,400]"
              layout="total,sizes,prev, pager, next,jumper"
              v-if = 'showpage'
              :total="total">
        
            </el-pagination>
          </div>


      <!--二级单位Start-->
      <!-- <el-dialog title="" :visible.sync="dialogTableVisible"   width="90%"> -->
      
        <!--<el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>-->
        <!--二级单位End-->
      <!-- </el-dialog> -->

    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { type } from 'os';
export default {
  name: 'mainbox',
  components:{
    FileSaver,
    XLSX
  },
  data() {
    return {
        options: [{
          value: '1',
          label: '用户每日动态'
        }, {
          value: '2',
          label: '用户某时间段动态'
        }, {
          value: '3',
          label: '部门动态'
        }],
        selectesValue: '1', // 类型选择
        DepOption:[   // 选择部门搜索
          {value:'twoLevenDep',label:'二级部门'},
          {value:'threeLevenDep',label:'三级部门'}
          ],
      SelectsDepType:'twoLevenDep',  // 默认选择二级部门  
      searchDepCon:{     // 通过部门名称搜索 
            twoLevenDepName:'',   // 二级部门
            threeLevenDepName:'', // 三级部门
            DepNameSearch:''      // 部门名称内容
        },   
      showDepTableID:null,  // 查看三级部门iD 
      dialogTableVisible: false,
      innerVisible:false,
      currentPage: 1,
      pagesize: 10, 
      total:null,     // 一级页面总数
      showUserTable:false,  
      showDepTable:false,
      showTable:false,
      showData:false,   // 控制日期是否显示
      showpage: false,  // 控制分页是否显示 
      startDate: null, // 日期搜索
      TLevenDepData:null, //三级单位日期搜索
      loading: false,  // 加载浮层
      oneLeven:[], //   用户数据
      twoLeven:[],  // 二级部门数据
      threeLeven:[],  // 三级部门数据
      twoLevenTotal:null, // 二级部门总数
      threeLevenTotal:null, // 三级部门总数
      levenUrl:'',  // 二级部门和三级部门URL区分
      startDateValue:this.getNowFormatDate(new Date()), // 开始时间
      endDateValue:this.getNowFormatDate(new Date()),    // 结束时间 
      flagPage:3,
      defaulfdate:this.getNowFormatDate(new Date()),
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        listQuery:{
            sortby:'',
            order:''

        },
       
    }
  }, mounted: function () {

        this.getlist(1,1,10);
        this.showUserTable = true;
  }
  , methods: {
    tableSortChange(val){
      // console.log("------>",val.column.order)

      // if (val.column.order === 'descending') {

      // } else {
        
      
      // }
    },
    sortByDate(obj1, obj2) {
      let val1 = obj1.deadline
      let val2 = obj2.deadline
      return val1 - val2
    },
    exportExcel (flag) {
  
    let wb;
    if(flag==4){  // 三级单位数据导出
          wb  = XLSX.utils.table_to_book(document.querySelector('#threeDepTable'));  
    }else {
 
        if(this.twoLeven.length < 1 || this.oneLeven.length < 1 ){
               this.$notify({title: '失败', message: '没有数据可以导出', type: 'error'});
                return
        }

   /* generate workbook object from table */
         wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
    }
      /* get binary string as output */
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '动态-统计表.xlsx');
      } catch (e)
      {
        if (typeof console !== 'undefined')
          console.log(e, wbout)
      }
      return wbout
    },
    currentSel(val){        // 类型搜索

          if  (this.selectesValue==1){
                // this.startDateValue =  this.getNowFormatDate(new Date())
                // this.endDateValue =  this.getNowFormatDate(new Date())
                this.getlist(1,1,10)
          
                this.showUserTable = true;
                this.showDepTable = false 
                // this.showData = false

          } else if (this.selectesValue==2){
        
                this.getlist(2,1,10)
                this.showUserTable = true;
                this.showDepTable = false
                // this.showData = true

          }else {

                this.getlist(3,1,10)
                this.showUserTable = false;
                this.showDepTable = true;
                // this.showData = true
          }
    },
    currenDepType(){    // 已选中部门
          // if(this.SelectsDepType =='twoLevenDep'){
                      
          // }   else {

          // }
    },
    getlist(searchFlag,current, size) {
        
        let UrlFlag = '';

        if  ( searchFlag ==1 ){

                UrlFlag = this.COMMON.momentsuiCommUrl + "/v1/moments/ui/getUserDailyBlogTotalList"
                    


        } else if(searchFlag==2) {
          
               UrlFlag = this.COMMON.momentsuiCommUrl + "/v1/moments/ui/getUserBlogTotalList"
               
        }else{
          
              UrlFlag = this.COMMON.momentsuiCommUrl + "/v1/moments/ui/aggregateDeptLevel2Total"
        }

      var _this = this;

      _this.loading = true


      this.$http.post(UrlFlag,

        JSON.stringify({
          "pageNum": current,
          "pageSize":size,
          "startDate":_this.startDateValue,
          "endDate":_this.endDateValue,
          "deptNameLevel2":_this.searchDepCon.twoLevenDepName,
          "deptNameLevel3":_this.searchDepCon.threeLevenDepName,
	        "orderByParam":"{count:-1}",
        }),{

          headers: this.COMMON.headerJson

        }).then(function (response) {

          if (response.data.code == 200) {

                  if(searchFlag==1 || searchFlag ==2){

                      _this.oneLeven = response.data.data.result;
                      
                      _this.total = response.data.data.total;    

                       if (_this.total < 10 ) {

                            _this.showpage = false
                      }
                    

                  } else {
                          _this.twoLeven = response.data.data.result;
                      
                          _this.total = response.data.data.total;  

                  }

  
                    _this.loading = false

                    if (_this.total > 10) {

                            _this.showpage = true
                      }
        }else{

                _this.loading = false

               _this.$notify({title: '失败', message: '开始时间和结束时间参数不能为空', type: 'error'});
        }
      }).catch(function (error) {

        // console.log(_this.oneLeven)

        if(_this.oneLeven == null || _this.oneLeven == undefined){

              _this.$notify({title: '提示', message: '暂无数据', type: 'error'});

        }else{

              _this.$notify({title: '失败', message: '网络错误', type: 'error'});
     
        }
              _this.loading = false
      });
    },
    searchFn(val) { 

           if ( this.startDate ==  null || this.startDate == undefined) {

            this.$notify({title: '提示', message: '请选择日期', type: 'error'});

            return
          }

              this.startDateValue = this.startDate[0]

              this.endDateValue = this.startDate[1]
    
          if  (this.selectesValue==1){

                this.FlagSelectsDep(1);  // 区分选择的二级还是三级部门 
               
                
              
          } else if (this.selectesValue==2){
              
              this.FlagSelectsDep(2);    
              
              
          }else {
                this.FlagSelectsDep(3); 
               
          }
    },
    TLsearchFn(){
          this.FlagSelectsDep(4)
    },
    requestPublic(id,pageNum,pagesize,param){

      var _this = this;

      _this.loading = true
    
      this.levenUrl = this.COMMON.momentsuiCommUrl + "/v1/moments/ui/aggregateDeptLevel3Total" // 三级单位 

      this.$http.post(_this.levenUrl,
        JSON.stringify({
         	"pageNum": pageNum,
          "pageSize":pagesize,
          "startDate":_this.startDateValue,
          "endDate":_this.endDateValue,
          "deptNameLevel2":_this.searchDepCon.twoLevenDepName,
          "deptNameLevel3":_this.searchDepCon.threeLevenDepName,
          "orderByParam":"{count:-1}",
          "deptIdLevel2":id
    
        }), {
          headers: this.COMMON.headerJson
        }).then(function (response) {

        if (response.data.code == 200) {
          
                 _this.threeLeven = response.data.data.result;

                 _this.threeLevenTotal = response.data.data.total;

                 _this.loading = false

                 if(_this.threeLevenTotal < 10) {
                                _this.showpage = false
                     }
          

        }
      }).catch(function (error) {

        _this.$notify({title: '失败', message: '网络错误', type: 'error'});

        _this.loading = false
      });
    },
    openfj(value,flag){  //  查看三级单位

            this.innerVisible = true;
            this.showDepTableID = value
            this.requestPublic(value,this.currentPage,this.pagesize,flag)
      


    },
    handleSizeChange(size) {
      
      this.pagesize = size;
      this.FlagPageFn()

     
    },
    handleCurrentChange(curr) {

      this.currentPage = curr;
      this.FlagPageFn()
    
    }
    ,FlagPageFn(){    // 分页区分

          if(this.selectesValue==1){

              this.getlist(1,this.currentPage, this.pagesize)

          }else if(this.selectesValue==2){

              this.getlist(2,this.currentPage, this.pagesize)

          }else{

              this.getlist(3,this.currentPage, this.pagesize)
          }

    },
    FlagSelectsDep(flag){  // 区分选择的二级还是三级部门  
    /**
        1。如果是人员每日动态统计，还需要添加二级部门和三级部门的查询条件

        2。如果是二级部门动态统计，加上二级部门的查询条件

        3。如果是三级部门动态统计，加上二级部门和三级部门的查询条件

        4。如果是人员某时段的动态统计，还需要添加二级部门和三级部门的查询条件**/

      if(this.SelectsDepType == 'twoLevenDep'){           // 搜索条件二级部门, 如果有输入内容 就进行搜索 
                        if(this.searchDepCon.DepNameSearch.length  > 0 ) {

                                this.searchDepCon.threeLevenDepName = ''

                                this.searchDepCon.twoLevenDepName =  this.searchDepCon.DepNameSearch

                                if(flag==4){  // 搜索三级单位

                                        this.requestPublic(this.showDepTableID,this.currentPage,this.pagesize,flag)
                                }else{
                                    
                                    this.getlist(flag,1,10)
                                }
                               
                        }else {

                               this.searchDepCon.twoLevenDepName = ''

                               if(flag==4){

                                    this.requestPublic(this.showDepTableID,this.currentPage,this.pagesize,flag)

                               }else{

                                      this.getlist(flag,1,10)
                               }
                             
                        }
              } else {                                            // 搜索条件三级部门, 如果有输入内容 就进行搜索 
                  
                     if( this.searchDepCon.DepNameSearch.length  > 0 ){

                          this.searchDepCon.twoLevenDepName = ''

                          this.searchDepCon.threeLevenDepName =  this.searchDepCon.DepNameSearch

                         if(flag==4){

                                    this.requestPublic(this.showDepTableID,this.currentPage,this.pagesize,flag)
                               }else{

                                      this.getlist(flag,1,10)
                               }
                        }else {

                              this.searchDepCon.threeLevenDepName = ''

                               if(flag==4){

                                    this.requestPublic(this.showDepTableID,this.currentPage,this.pagesize,flag)

                               }else{

                                      this.getlist(flag,1,10)
                               }
                        }

              }
  },


  },created:function(){
        
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
  
  }
    .content-box {
      width: 100%;
      display: flex;
      background: #f5f5f5;
     
    }
    .header-box{
        padding: 20px;
    }
    .suboffice{
      cursor: pointer;
    }
    .main-content-table {
      margin: 10px 0px 20px 0px;

    }
  .demo-input-suffix{
    display: inline-block
  }
  .jh{
    color: #ffba00;
  }
  .bj{
    color: #acacac;
  }
  .total{
    color: #ff1d04;
  }
  .pagebox {
    margin-top: 20px;
    text-align: center;
  }

</style>
