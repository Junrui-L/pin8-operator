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

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers['Content-Type'] = 'application/json'
// axios.defaults.headers['spell-access-token'] = ' '
axios.defaults.timeout = 10000 // 超时设置10s
export default (() => {
  return {
    get(url, data) {
      return new Promise((resolve, reject) => {
        axios.get(url, {
          params: data,
          withCredentials: true
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
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
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
