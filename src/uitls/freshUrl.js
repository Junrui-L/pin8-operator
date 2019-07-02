function fnGetQueryString(key) { //正则获取url后面的参数值，如?env=dev&exp=123中可以通过fnGetQueryString('exp')=>得到123
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var result = window.location.search.substr(1).match(reg);
  return result ? decodeURIComponent(result[2]) : false;
}
function funcUrlDel(name) {//删除url指定参数名并返回新的url
  var loca = window.location;
  var baseUrl = loca.origin + loca.pathname;
  console.log(baseUrl)
  var query = loca.search.substr(1);
  if (query.indexOf(name) > -1) {
    var obj = {};
    var arr = query.split("&");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    var url = baseUrl + JSON.stringify(obj).replace(/["{}]/g, "").replace(/:/g, "=").replace(/\,/g, "&");
    return url
  };
};
function refreshUrl() {//强制刷新到不带二次分享参数页面
  var url = "";
  if (fnGetQueryString('from')) {//from为微信二次分享自带参数
    url = funcUrlDel('from');
    if (fnGetQueryString('isappinstalled')) {//isappinstalled为微信二次分享自带参数 //截取去除isappinstalled参数后的地址
      url=url.split('isappinstalled=0')[0];
      console.log(22)
      console.log(url)
      window.location.href = url+'?activityId='+$routeParams.activityId+'&orgClueId='+$routeParams.orgClueId;
    } else {
      // window.location.href = url+'?activityId='+$routeParams.activityId+'&orgClueId='+$routeParams.orgClueId;
    }
  }
};
if (fnGetQueryString('from')||fnGetQueryString('isappinstalled')) {
  refreshUrl();
}
/* function fnGetQueryString(key) { //正则获取url后面的参数值，如?env=dev&exp=123中可以通过fnGetQueryString('exp')=>得到123

   let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");

   let result = window.location.search.substr(1).match(reg);

   return result ? decodeURIComponent(result[2]) : false;

 }

 // 另外一个是
 function funcUrlDel(name) {
   //删除url指定参数名并返回新的url
   let loca = window.location;

   let baseUrl = loca.origin + loca.pathname + "?";

   let query = loca.search.substr(1);

   if (query.indexOf(name) > -1) {

     let obj = {};

     let arr = query.split("&");

     for (let i = 0; i < arr.length; i++) {

       arr[i] = arr[i].split("=");

       obj[arr[i][0]] = arr[i][1];

     }

     delete obj[name];

     let url = baseUrl + JSON.stringify(obj).replace(/["{}]/g, "").replace(/:/g, "=").replace(/,/g, "&");

     return url

   }

 }



 // 最后一个是

 function getlinkSearch(key, reqStr) {
   //这个作用同fnGetQueryString(key)函数差不多，不过它将reqStr参数替代了window.searsh获取的东西,因为上个函数在删除了url的某一参数后会返回一个新的带?参数查询的链接

   let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");

   let result = reqStr.substr(1).match(reg);

   return result ? decodeURIComponent(result[2]) : false;

 }

 // 最关键也是最后一步就是刷新页面回到去除微信二次分享自带参数的初始页面了：

   function refreshUrl() {
   //强制刷新到不带二次分享参数页面


   let url = "",

     reqStr = "";

   if (fnGetQueryString('from')) {//from为微信二次分享自带参数

     url = funcUrlDel('from');



     let reqIndex = url.indexOf('?');



     reqStr = url.substr(reqIndex);//截取去除from参数后的地址

     console.log(url, reqStr);

     if (getlinkSearch('isappinstalled', reqStr)) {//isappinstalled为微信二次分享自带参数

       url = url.substr(0, url.indexOf('&'));//截取去除isappinstalled参数后的地址

       console.log(url);

       window.location.href = url;

     } else {

       window.location.href = url;

     }

   }

 }

 refreshUrl();
*/

