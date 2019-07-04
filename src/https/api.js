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
export const login = data => $http.post('/manage-api/api/v1/login',{ 
	"accountNo": data.accountNo,
	"pwd": data.pwd,
	"type": "01",
	"validCode": "0000",
	"verifyCode": data.verifyCode
})