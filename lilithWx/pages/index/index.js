//获取年月日
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if(month < 10) {
    month = '0' + month
  }
  return month + '.' + day + '.' + year
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取星期
function getWeekday() {
  var a = new Date()
  var myxingqi = a.getDay()
  var b = new Array()
  b[0] = "Sunday";
  b[1] = "Monday";
  b[2] = "Tuesday";
  b[3] = "Wednesday";
  b[4] = "Thursday";
  b[5] = "Friday";
  b[6] = "Saturday"; 
  return b[myxingqi]
}

//获取一个月的天数
function getDays(year, month) {
  month = parseInt(month, 10);
  let d = new Date(year, month, 0);
  return d.getDate();
}

//获取日期
function getday(n) {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if((day + n) > getDays(year,month)) {
    month = month + 1;
    day = 1;
    return month + '月' + day + '日'
  }
  return (day+n) + '日'
}

//获取当前的小时
function gethour() {
  let date = new Date();
  let hour = date.getHours();
  let str = '';
  if( hour < 18 ) {
    str = '下午好'
  } else if( hour < 13 ) {
    str = '上午好'
  } else if( hour < 5 ){
    str = '晚上好'
  } else {
    str = '晚上好'
  };
  return str;
}

console.log()
Page({
  data: {
  },
  onLoad: function () {
    var time = formatTime(new Date());
    this.setData({
      hello: gethour(),
      t: time,
      week: getWeekday(),
      day3: getday(2),
      day4: getday(3),
      day5: getday(4),
      day6: getday(5),
      day7: getday(6),      
    });
  }

}) 


