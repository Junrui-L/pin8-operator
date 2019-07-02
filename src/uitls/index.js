/**
 * Created by ljr on 2018/1/3.
 */
/* eslint-disable */
/**
 * 存储localStorage
 * set: 设置
 * get: 获取
 * clear: 清除
 */
export const Ls = (storeName, storestyle) => {
  let storage = window[storestyle]
  if (!window[storestyle]) {
    return false
  }

  let set = function (key, value) {
    // 存储
    let mydata = storage.getItem(storeName)
    if (!mydata) {
      this.init()
      mydata = storage.getItem(storeName)
    }
    mydata = JSON.parse(mydata)
    mydata.data[key] = value
    storage.setItem(storeName, JSON.stringify(mydata))
    return mydata.data
  }

  let get = function (key) {
    // 读取
    let mydata = storage.getItem(storeName)
    if (!mydata) {
      return false
    }
    mydata = JSON.parse(mydata)

    return mydata.data[key]
  }

  let remove = function (key) {
    // 读取
    let mydata = storage.getItem(storeName)
    if (!mydata) {
      return false
    }

    mydata = JSON.parse(mydata)
    delete mydata.data[key]
    storage.setItem(storeName, JSON.stringify(mydata))
    return mydata.data
  }

  let clear = function () {
    // 清除对象
    storage.removeItem(storeName)
  }

  let init = function () {
    storage.setItem(storeName, '{"data":{}}')
  }

  return {
    set: set,
    get: get,
    remove: remove,
    init: init,
    clear: clear
  }
}
/**
 * 深拷贝数组和对象
 * */
export const deepCopy = (obj) => {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key]);   //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

/**
 * 删除数组对象中按key
 * */
export const deleteKey = (arr, key) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i].hash === key) {
      arr.splice(i, 1);
      return true;
    }
  }

  return false;
}


/**
 * JS的四则运算
 * */

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const accAdd = (arg1, arg2) => {
  if (isNaN(arg1)) {
    arg1 = 0;
  }
  if (isNaN(arg2)) {
    arg2 = 0;
  }
  arg1 = Number(arg1);
  arg2 = Number(arg2);
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
}

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const accSub = (arg1, arg2) => {
  if (isNaN(arg1)) {
    arg1 = 0;
  }
  if (isNaN(arg2)) {
    arg2 = 0;
  }
  arg1 = Number(arg1);
  arg2 = Number(arg2);

  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export const accMul = (arg1, arg2) => {
  if (isNaN(arg1)) {
    arg1 = 0;
  }
  if (isNaN(arg2)) {
    arg2 = 0;
  }
  arg1 = Number(arg1);
  arg2 = Number(arg2);

  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  }
  catch (e) {
  }
  try {
    m += s2.split(".")[1].length;
  }
  catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
export const  accDiv = function(arg1, arg2) {
  if (isNaN(arg1)) {
    arg1 = 0;
  }
  if (isNaN(arg2)) {
    arg2 = 0;
  }
  arg1 = Number(arg1);
  arg2 = Number(arg2);

  var t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
  }
  try {
    t2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
  }

  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);

}


/**
 * 获取参数
 * */
export const getQueryString = (name) => {
  var url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var newUrl = window.location.search.substr(1).match(url);
  if (newUrl != null) {
    return unescape(newUrl[2]);
  } else {
    return false;
  }

}

/**
 * 样式处理
 * */
export const hasClass = function (el, className) {
  // 开始或空白字符+类名+空白字符或结束
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  // 测试元素是否有该类名，返回布尔值
  return reg.test(el.className)
}

export const addClass = function (el, className) {
  if (hasClass(el, className)) {
    return
  }
  // 以空白符为切割位置切割生成新数组
  let newClass = el.className.split(' ')
  // 数组中加入新类名
  newClass.push(className)
  // 将数组元素放入一个字符串，以空白符间隔
  el.className = newClass.join(' ')
}

export const getWidth = function (el, name) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el).name
  } else {
    return el.currentStyle.name
  }
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop
  } else if (element.currentStyle) {
    target = element.currentStyle[attr]
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr]
  }
  // 在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target)
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
  let windowHeight = window.screen.height
  let height
  let setTop
  let paddingBottom
  let marginBottom
  let requestFram
  let oldScrollTop

  document.body.addEventListener('scroll', () => {
    loadMore()
  }, false)
  // 运动开始时获取元素 高度 和 offseTop, pading, margin
  element.addEventListener('touchstart', () => {
    height = element.offsetHeight
    setTop = element.offsetTop
    paddingBottom = getStyle(element, 'paddingBottom')
    marginBottom = getStyle(element, 'marginBottom')
  }, {passive: true})

  // 运动过程中保持监听 scrollTop 的值判断是否到达底部
  element.addEventListener('touchmove', () => {
    loadMore()
  }, {passive: true})

  // 运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
  element.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop
    moveEnd()
  }, {passive: true})

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop != oldScrollTop) {
        oldScrollTop = document.body.scrollTop
        loadMore()
        moveEnd()
      } else {
        cancelAnimationFrame(requestFram)
        // 为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
        height = element.offsetHeight
        loadMore()
      }
    })
  }

  const loadMore = () => {
    if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
      callback()
    }
  }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
  let requestFram
  let oldScrollTop

  document.addEventListener('scroll', () => {
    showBackFun()
  }, false)
  document.addEventListener('touchstart', () => {
    showBackFun()
  }, {passive: true})

  document.addEventListener('touchmove', () => {
    showBackFun()
  }, {passive: true})

  document.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop
    moveEnd()
  }, {passive: true})

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop != oldScrollTop) {
        oldScrollTop = document.body.scrollTop
        moveEnd()
      } else {
        cancelAnimationFrame(requestFram)
      }
      showBackFun()
    })
  }

  // 判断是否达到目标点
  const showBackFun = () => {
    if (document.body.scrollTop > 500) {
      callback(true)
    } else {
      callback(false)
    }
  }
}

/**
 * 节流函数
 * **
 * */

export const throttle = function (fn, delay) {
  // 节流函数
  var timer = null
  return function () {
    var context = this

    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args) // context调用fn的方法，指针指向了fn
    }, delay)
  }
}
/**
 * 时间格式化
 * @param  {Object} dateObj 时间对象
 * @param  {String} fmt 格式化字符串
 */
export const dateFormat = (dateObj, fmt) => {
  let date;
  if (isString(dateObj)) {
    date = strToDate(dateObj)
  } else if (isDate(dateObj)) {
    date = dateObj
  } else if(isNumber(dateObj)) {
    date = new Date(dateObj*1000)
  } else {
    return ""
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  var week = {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[date.getDay().toString() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k].toString()) : (("00" + o[k].toString()).substr(("" + o[k].toString()).length)));
    }
  }
  return fmt;
}

/**
 * 时间倒计时
 * */

export const cuntDown = function (endTime) {

  if(isString(endTime)) {
    let cdays, chours,cminutes, cseconds;
    let countDownDate = new Date(endTime).getTime();

    // Countdown loop
    let time = setInterval(() => {


      let now = new Date().getTime(),
        diff = parseInt(countDownDate) - parseInt(now),

        // Time conversion to days, hours, minutes and seconds
        tdays = Math.floor(diff / (1000 * 60 * 60 * 24)),
        thours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        tminutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        tseconds = Math.floor((diff % (1000 * 60)) / 1000);
      // Keep 2 digits

      // Check for time expiration
      if (diff < 0) {
        clearInterval(time);
        // this.countCallback();
        return
      } else {
        cdays = (tdays < 10) ? '0' + tdays : tdays;
        chours = (thours < 10) ? '0' + thours : thours;
        cminutes = (tminutes < 10) ? '0' + tminutes : tminutes;
        cseconds = (tseconds < 10) ? '0' + tseconds : tseconds;
        // console.log(cdays, chours,cminutes,cseconds)
        // console.log()
        let a =  {
          days: cdays,
          hours: chours,
          minutes: cminutes,
          seconds: cseconds
        };
        // console.log(a)
        return a;
      }
    }, 1000);

    // Return data

  } else {
    return 'error'
  }

}

/*是否字符串*/
function isString(obj) {
  return obj === obj + '';
}

function isNumber(val){

  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if(regPos.test(val) || regNeg.test(val)){
    return true;
  }else{
    return false;
  }

}
/*是否时间对象*/
function isDate(obj) {
  return obj instanceof Date
}

/**
 * 字符串转换为时间
 * @param  {String} dateObj 字符串
 */
function strToDate(dateObj) {
  dateObj = dateObj.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/')
  if (dateObj.indexOf(".") > 0) dateObj = dateObj.slice(0, dateObj.indexOf("."))
  return new Date(dateObj)
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {defaut}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
  clearInterval(element.timer)

  // 判断不同参数的情况
  if (duration instanceof Function) {
    callback = duration
    duration = 400
  } else if (duration instanceof String) {
    mode = duration
    duration = 400
  }

  // 判断不同参数的情况
  if (mode instanceof Function) {
    callback = mode
    mode = 'ease-out'
  }

  // 获取dom样式
  const attrStyle = attr => {
    if (attr === 'opacity') {
      return Math.round(getStyle(element, attr, 'float') * 100)
    } else {
      return getStyle(element, attr)
    }
  }
  // 根字体大小，需要从此将 rem 改成 px 进行运算
  const rootSize = parseFloat(document.documentElement.style.fontSize)

  const unit = {}
  const initState = {}

  // 获取目标属性单位和初始样式值
  Object.keys(target).forEach(attr => {
    if (/[^\d^\.]+/gi.test(target[attr])) {
      unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px'
    } else {
      unit[attr] = 'px'
    }
    initState[attr] = attrStyle(attr)
  })

  // 去掉传入的后缀单位
  Object.keys(target).forEach(attr => {
    if (unit[attr] == 'rem') {
      target[attr] = Math.ceil(parseInt(target[attr]) * rootSize)
    } else {
      target[attr] = parseInt(target[attr])
    }
  })

  let flag = true // 假设所有运动到达终点
  const remberSpeed = {}// 记录上一个速度值,在ease-in模式下需要用到
  element.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      let iSpeed = 0 // 步长
      let status = false // 是否仍需运动
      let iCurrent = attrStyle(attr) || 0 // 当前元素属性址
      let speedBase = 0 // 目标点需要减去的基础值，三种运动状态的值都不同
      let intervalTime // 将目标值分为多少步执行，数值越大，步长越小，运动时间越长
      switch (mode) {
        case 'ease-out':
          speedBase = iCurrent
          intervalTime = duration * 5 / 400
          break
        case 'linear':
          speedBase = initState[attr]
          intervalTime = duration * 20 / 400
          break
        case 'ease-in':
          let oldspeed = remberSpeed[attr] || 0
          iSpeed = oldspeed + (target[attr] - initState[attr]) / duration
          remberSpeed[attr] = iSpeed
          break
        default:
          speedBase = iCurrent
          intervalTime = duration * 5 / 400
      }
      if (mode !== 'ease-in') {
        iSpeed = (target[attr] - speedBase) / intervalTime
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
      }
      // 判断是否达步长之内的误差距离，如果到达说明到达目标点
      switch (mode) {
        case 'ease-out':
          status = iCurrent != target[attr]
          break
        case 'linear':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed)
          break
        case 'ease-in':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed)
          break
        default:
          status = iCurrent != target[attr]
      }

      if (status) {
        flag = false
        // opacity 和 scrollTop 需要特殊处理
        if (attr === 'opacity') {
          element.style.allocation = 'alpha(opacity:' + (iCurrent + iSpeed) + ')'
          element.style.opacity = (iCurrent + iSpeed) / 100
        } else if (attr === 'scrollTop') {
          element.scrollTop = iCurrent + iSpeed
        } else {
          element.style[attr] = iCurrent + iSpeed + 'px'
        }
      } else {
        flag = true
      }

      if (flag) {
        clearInterval(element.timer)
        if (callback) {
          callback()
        }
      }
    })
  }, 20)
}

/**
 * 带颜色的日志输出
 * @param {E} 输出红色日志
 * @param {W}  输出红色日志
 * @param {I}   输出红色日志
 * @param {D}   输出黑色正常日志
 */
export const Log = {
  /** 输出红色日志 */
  E() {
    if (arguments.length > 0) {
      let arr = Array.prototype.slice.call(arguments);
      this.__log("Err", 'red', arr);
    }
  },
  /** 输出黄色日志 */
  W() {
    if (arguments.length > 0) {
      let arr = Array.prototype.slice.call(arguments);
      this.__log("Warnw", '#FFA500', arr);
    }
  },
  /** 输出绿色日志 */
  I() {
    if (arguments.length > 0) {
      let arr = Array.prototype.slice.call(arguments);
      this.__log("Info", '#00FF00', arr);
    }
  },
  /** 输出黑色正常日志 */
  D() {
    if (arguments.length > 0) {
      let arr = Array.prototype.slice.call(arguments);
      this.__log("Dark", '#000000', arr);
    }
  },
  /**
   * @param tagStr 没有标签时默认显示的
   * @param color 日志颜色
   * @param arr 日志参数
   */
  __log(tagStr, color, arr) {
    let tag = arr[0];
    if (typeof (tag) == "string" || tag == null || tag == undefined) {
      arr[0] = `%c ${arr[0]}`;
      arr.splice(1, 0, `color:${color}`);
    } else {
      arr.splice(0, 0, `%c ${tagStr} : `);
      arr.splice(1, 0, `color:${color}`);
    }
    console.log.apply(console, arr);
  }
}

