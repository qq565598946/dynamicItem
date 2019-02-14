
exports.install = function (Vue, options) {
  Vue.prototype.tableHeaderColor = function ({ row, column, rowIndex, columnIndex }){   // 修改表格颜色
    if (rowIndex === 0) {
      return 'background-color:#f5f5f5;color: #000;font-weight: 600;'
    }

  };
};

// import  tabledata from '../table'
// import Vue from 'Vue'
// const Table = {
//       install :function () {
//         Vue.component('TabDate',tabledata)
//       }
// }
// export  default Table
