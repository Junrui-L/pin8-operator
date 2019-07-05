/**
 * Created by soft on 2018/11/21.
 * 作者：Lvjr
 * 项目请求统一处理
 * 请求方式支持 get , post
 *
 */

// import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import store from '@/store'

// axios默认配置请求的api基础地址
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV === 'production') {
  // uat测试服
  // axios.defaults.baseURL = 'http://pinbauat.cnlaunch.com/'

  // pinba正式服
  axios.defaults.baseURL = 'http://pinba.szyrwl.com/'

}
// if (userStore.get('userInfo')) {
//   axios.defaults.headers['spell-access-token'] = userStore.get('userInfo').token
// }else{
//   axios.defaults.headers['spell-access-token'] = ''
// }

axios.interceptors.request.use(config => {  //配置发送请求的信息
  if (store.state.app.userInfo) {
    config.headers['spell-access-token'] = `${store.state.app.userInfo.token}`
  }
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

//response拦截
// axios.interceptors.response.use(response => { //配置请求回来的信息
//   store.commit(types.HIDE_LOADING)
//   return response;
// }, error => {
//   if(error.response) {
//       switch (error.response.status) {
//           case 403:
//               //403清除token信息并跳转到登录页面
//               store.commit(types.LOGOUT);
//               router.replace({
//                   path: '/start',
//                   query: { redirect: router.currentRoute.fullPath}
//               })
//       }
//   }
//   return Promise.reject(error.response.data);
// });

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.defaults.timeout = 10000 // 超时设置10s
export default (() => {
  return {
    get(url, data) {
      return new Promise((resolve, reject) => {
        axios.get(url, {
          params: data,
          headers: { 'crossDomain': true, 'withCredentials': true },
        })
          .then(function (response) {
            if (response.data.code === 1101 || response.data.code === -1001) {
              // console.log('未登录或登录超时')
              // router.push({ path: '/login' })
              // location.href= response.data.redirect;
            } else if (response.data.code === 200) {
              // console.log('接口200正常返回')
              resolve(response.data.data)
            } else {
              resolve(response.data)
              // console.log('接口返回状态码：' + response.data.code)
            }
          })
          .catch(function (error) {
            reject(error)
          })
      })
    },
    post(url, data) {
      // TODO 根据data的类型封装不同的post请求格式
      return new Promise((resolve, reject) => {
        axios.post(url,
          data
          // {
          //   data: (data != null && typeof data === 'object' && Array.isArray(data) === false) ? JSON.stringify(data) : data, // 对象要序列化
          //   sign: "",
          //   token: ""
          // }
          , {
            headers: { 'Content-Type': 'application/json', 'crossDomain': true, 'withCredentials': true }
          })
          .then(function (response) {
            // console.log(response.data)

            if (response.data.code === 1101 || response.data.code === -1001) {
              // console.log('未登录或登录超时')
              router.push({ path: '/login' })
              // location.href= response.data.redirect;
            } else if (response.data.code === 200) {
              // console.log('接口200正常返回')
              resolve(response.data.data)
            } else {
              // console.log(response.data)
              resolve(response.data)
              // console.log('接口返回状态码：' + response.data.code)
            }
          })
          .catch(function (error) {
            reject(error)
          })
      })
    }
  }
})()
