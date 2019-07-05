/**
 * Created by soft on 2018/12/8.
 * 异步获取数据，基于promise操作
 */
import $http from './index'

/**
 *01 获取验证码
 * */
export const getVerifyCode = () => $http.get('/manage-api/api/v1/login/getVerifyCode')

/**
 *02 用户登陆
 * */
export const login = data => $http.post('/manage-api/api/v1/login',JSON.stringify(data))

/**
 * 03 用户退出登陆
 */
export const out = (data) => $http.get('/manage-api/api/v1/login/out')

/**
 * 04 产品数据统计
 */
export const product = () => $http.get('/manage-api/api/v1/statistics/product')

/**
 * 05 收入分析统计
 */
export const income = () => $http.get('/manage-api/api/v1/statistics/income')