<script>
// 请求地址和参数
const solution = "xinghuo-apaas-pms-solution/pms/solution/v1";
const appID =  "ed2c076f86834ee0bc3dfa54d0f2daf7";
const appSecretKey =  "D82AAE335BDFB4FDDB80BDDA20B064C6";
const GetaWay_url =  "http://172.29.3.76:9238/szga/";
const accessToken = "6bebce06287e44cc94027e5aaf81db3c"


// 头部参数
const headerJson = {
  'content-type': 'application/json',
  // 'accessToken': accessToken,
  // 'applyID': appID,
  // 'requestType': "app",
  // 'secretKey':appSecretKey,
  // 'userInfo': null
}

let momentsuiCommUrl = 'http://20.97.6.109:3001/momentsuiservice'


// 公共变量
 const  publicVariable ={
   tablevalue: [
       {name: '序号', add: '22'},
       {name: '分局', add: '543'},
       {name: '总数', add: '456'},
       {name: '白金数', add: '122'},
       {name: '精华数', add: '1'},
       {name: '点赞数', add: '2'},
       {name: '评论数', add: '3'},
       {name: '局长点赞', add: '4'},
       {name: '局长评论', add: '4'},
   ],
   tableData: [{
     date: '1496311370052',
     name: '罗湖区',
     address: '234'
   }, {
     date: '1496311370052',
     name: '宝安区',
     address: '1088'
   }, {
     date: '1496311370052',
     name: '龙华区',
     address: '54'
   }, {
     date: '1496311370052',
     name: '南山区',
     address: '67'
   }],
 }



// 暴露对外接口变量
export default {
  momentsuiCommUrl,
  solution,
  appID,
  appSecretKey,
  GetaWay_url,
  accessToken,
  headerJson,
  publicVariable
}
</script>
