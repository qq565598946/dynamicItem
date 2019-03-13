exports.install = function (Vue, options) {
  Vue.prototype.tableHeaderColor = function ({ row, column, rowIndex, columnIndex }){   // 修改表格颜色
    if (rowIndex === 0) {
      return 'background-color:#f5f5f5;color: #000;font-weight: 600;'
    }

  },
  Vue.prototype.getNowFormatDate = function() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  };
}
