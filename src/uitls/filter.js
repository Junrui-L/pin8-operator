import Vue from 'vue'
//时间过滤， fmtDate('yyyy,MM,dd')
Vue.filter('fmtDate', (data, fmt) => {
  let dates;
  if(data && data !== undefined) {
    dates = data.replace(/-/g,'/')
  }else {
    dates = new Date();
  }
  let date = new Date(dates);
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
})

//费用
Vue.filter('fmtMoney', num => {
  if(parseInt(num) > 0) {
    return num + '元'

  } else {
    return num
  }

})

//天数
Vue.filter('fmtDay', num => {
  if(parseInt(num) > 0) {
    return num + '天'

  } else {
    return num
  }

})


//名字，身份证，银行卡，隐藏部分数字变‘*’号 plusXing(前面保留位数，后面保留位数）
Vue.filter('plusXing', (str, frontLen, endLen) => {
  var len = str.length - frontLen - endLen;
  var xing = '';
  for (var i = 0; i < len; i++) {
    xing += '*';
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
});
