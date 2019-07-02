export const OPENAPIHOST = '';
export const HASCONSOLE = typeof console !== undefined;
export const ISBROWSER = typeof window !== 'undefined' && typeof window === 'object';
export const UA = ISBROWSER && window.navigator.userAgent.toLowerCase();

export const uaType = () => {
   // console.log(UA)
  if(/micromessenger/.test(UA)){
   // console.log('这是微信浏览器')
    return 1
  } else if(/dingtalk/.test(UA)) {
   // console.log('这是钉钉浏览器')
    return 2
  } else {
    // console.log('咋整呢,你不是咋钉钉中打开')
    return 3
  }
}
