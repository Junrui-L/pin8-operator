import router from '../router'
import Http from '@/utils/http'
import Urls from '@/utils/urls'
import Vue from 'vue'
import store from '@/store/index'
import WX from 'weixin-js-sdk'
import ToastPlugin from 'vux/src/plugins/toast'
import storesPlugin from 'vux/src/plugins/stores/index.js'
import LoadingPlugin from 'vux/src/plugins/loading/index.js'

Vue.use(storesPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

let wx = WX

wx.navigateTo = ({ url }) => {
  router.push({ path: url })
}
wx.redirectTo = ({ url }) => {
  router.replace({ path: url })
}
wx.navigateBack = () => {
  router.go(-1)
}
wx.showModal = ({ title, content, success }) => {
  Vue.$vux.stores.show({
    title,
    content,
    // 组件除show外的属性
    onConfirm () {
      success && success({ confirm: true, cancel: false })
    },
    onCancel () {
      success && success({ confirm: false, cancel: true })
    }
  })
}
wx.getStorage = (key) => {
  return localStorage.getItem(key)
}
wx.getStorageSync = ({ key }) => {
  return localStorage.getItem(key)
}
wx.setStorage = (key, data) => {
  localStorage.setItem(key, data)
}
wx.setStorageSync = (key, data) => {
  localStorage.setItem(key, data)
}
wx.showLoading = (text) => {
  // 显示
  Vue.$vux.loading.show({
    text
  })
}
wx.hideLoading = () => {
  // 显示
  Vue.$vux.loading.hide()
}
wx.getSystemInfo = () => {
  return {
    windowWidth: document.body.clientWidth
  }
}
wx.start = () => {
  let openid = localStorage.getItem('openid')
  let { url, method } = Urls.getparameters
  const data = {
    openid,
    url: location.href.split('#')[0]
  }
  Http(url, method, data).then(res => {
    let { timestamp, noncestr, signature } = res.data.data
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wxfc17f48d2090b2f3', // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr: noncestr, // 必填，生成签名的随机串
      signature, // 必填，签名
      jsApiList: ['chooseWXPay', 'chooseImage', 'getLocalImgData', 'hideAllNonBaseMenuItem', 'hideMenuItems', 'showMenuItems', 'checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
    })
    wx.ready(function () {
      wx.hideMenuItems({
        menuList: [
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          'menuItem:favorite',
          'menuItem:share:facebook',
          'menuItem:share:QZone',
          'menuItem:editTag',
          'menuItem:delete',
          'menuItem:copyUrl',
          'menuItem:originPage',
          'menuItem:readMode',
          'menuItem:openWithQQBrowser',
          'menuItem:openWithSafari',
          'menuItem:share:email',
          'menuItem:share:brand'
        ]
      })
      // wx.showMenuItems({
      //   menuList: [
      //     'appMessage',
      //     'timeline'
      //   ] // 要显示的菜单项，所有menu项见附录3
      // })
      if (router.app.$route) {
        let path = router.app.$route.path
        if (path === '/dictionaries' || path === '/upload' || path === '/report' || path === '/personal' || path === '/contact' || path === '/detail' || path === '/single' || path === '/emotion' || path === '/makinginform') {
          wx.hideAllNonBaseMenuItem()
        } else {
          wx.showMenuItems({
            menuList: [
              'menuItem:share:appMessage',
              'menuItem:share:timeline'
            ] // 要显示分享给好友朋友圈
          })
        }
      }
      // let pathurl = 'http://h5.faceplus.8geek.com'
      let pathurl = 'https://h5.qqwechat.com'
      // let pathurl = 'http://ai.8geek.com/'
      let linkq = `${pathurl}/?uid=${store.getters.getship.uid}&allocation=${parseInt(10 * Math.random())}`
      let link = `${pathurl}/?uid=${store.getters.getship.uid}&allocation=${parseInt(10 * Math.random())}`
      let routes = router.app.$route
      if (routes && routes.path === '/result') {
        // 结果页分享
        link = `${pathurl}/result?uid=${store.getters.getship.uid}&id=${store.getters.getdetailresult.id}&type=other&name=${store.getters.getship.nickname}&is_luck=2&analysisid=${store.getters.getdetailresult.id}`
        linkq = `${pathurl}/?uid=${store.getters.getship.uid}&is_luck=2&analysisid=${store.getters.getdetailresult.id}`
      } else if (routes && routes.path === '/task') {
        // 每日任务页分享
        link = `${pathurl}/?uid=${store.getters.getship.uid}&is_task=1`
      } else if (routes && routes.path === '/annualTransport') {
        // 流年运势页分享
        link = `${pathurl}/?uid=${store.getters.getship.uid}&analysisid=${store.getters.getdetailresult.id}&unlock=true&is_luck=2`
        linkq = `${pathurl}/?uid=${store.getters.getship.uid}&is_luck=2&analysisid=${store.getters.getdetailresult.id}`
      }
      if (store.getters.getshare.share_common_title) {
        let title = store.getters.getshare.share_common_title
        let desc = '面相研究院'
        let imgUrl = store.getters.getshare.share_common_img
        wx.checkJsApi({
          jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"updateAppMessageShareData":true},"errMsg":"checkJsApi:ok"}
            if (res.checkResult.updateAppMessageShareData === true) {
              newshre(title, desc, link, imgUrl, linkq)
            } else {
              oldershare(title, desc, link, imgUrl, linkq)
            }
          }
        })
      } else {
        let { url, method } = Urls.getappshare
        Http(url, method, data).then(res => {
          let title = res.data.data.share_common_title
          let desc = '面相研究院'
          let imgUrl = res.data.data.share_common_img
          wx.checkJsApi({
            jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"updateAppMessageShareData":true},"errMsg":"checkJsApi:ok"}
              if (res.checkResult.updateAppMessageShareData === true) {
                newshre(title, desc, link, imgUrl, linkq)
              } else {
                oldershare(title, desc, link, imgUrl, linkq)
              }
            }
          })
        })
      }
    })
  })
}
// wx.share = () => {
//   wx.updateAppMessageShareData({
//     title: '面相研究院啊哈哈哈', // 分享标题
//     desc: '呵呵呵', // 分享描述
//     link: 'http://h5.faceplus.8geek.com/dictionaries', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//     imgUrl: 'https://faceplus.qqwechat.com/UI_IMG/TEST1.png', // 分享图标
//   }, function(res) {
//     //这里是回调函数
//     console.log(res)
//   })
// }
function newshre (title, desc, link, imgUrl, linkq) {
  wx.onMenuShareAppMessage({
    title, // 分享标题
    desc, // 分享描述
    link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl, // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
      // 用户点击了分享后执行的回调函数
      // console.log('成功')
    }
  })
  wx.onMenuShareTimeline({
    title, // 分享标题
    link: linkq, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl, // 分享图标
    success: function () {
      // 用户点击了分享后执行的回调函数
    }
  })
}

function oldershare (title, desc, link, imgUrl, linkq) {
  wx.onMenuShareAppMessage({
    title, // 分享标题
    desc, // 分享描述
    link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl, // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
      // 用户点击了分享后执行的回调函数
      // console.log('成功')
    }
  })
  wx.onMenuShareTimeline({
    title, // 分享标题
    link: linkq, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl, // 分享图标
    success: function () {
      // 用户点击了分享后执行的回调函数
    }
  })
  // 需在用户可能点击分享按钮前就先调用
  wx.updateAppMessageShareData({
    title, // 分享标题
    desc, // 分享描述
    link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl // 分享图标
  }, function () {
    // 这里是回调函数
    // console.log(res)
  })
  wx.updateTimelineShareData({
    title, // 分享标题
    link: linkq, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl // 分享图标
  }, function () {
    // 这里是回调函数
  })
}

// const wx = {
//   navigateTo ({ url }) {
//     router.push({ path: url })
//   },
//   redirectTo ({url}) {
//     router.replace({ path: url })
//   },
//   navigateBack () {
//     router.go(-1)
//   },
//   showToast ({title}) {
//     Vue.$vux.toast.show({
//       // 组件除show外的属性
//       text: title
//     })
//   },
//   // 模态框显示
//   showModal ({title, content, success}) {
//     Vue.$vux.confirm.show({
//       title,
//       content,
//       // 组件除show外的属性
//       onConfirm () {
//         success && success({confirm: true, cancel: false})
//       },
//       onCancel () {
//         success && success({confirm: false, cancel: true})
//       }
//     })
//   }
// }
export default wx
