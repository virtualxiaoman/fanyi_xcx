import md5 from './md5.min.js'

const appid = "20240415002024983"
const key = "uRdXdI061Y2ZlVPLL8jq"
const url = "https://fanyi-api.baidu.com/api/trans/vip/translate"

function translate(
  q, 
  { from = 'auto', to = 'en' } = { from: 'auto', to: 'en' },
)
{
  return new Promise((resolve, reject)=> {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url, 
      data: {
        q, from, to, appid, salt, sign
      },
      success(response) {
        let data = response.data
        console.log("data:", data)
        if (data && data.trans_result) {
          resolve(data)
        } else {
          reject({
            status: 'error',
            message: '翻译失败 (reject) '
          })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: '3000'
          })
        }
      },
      fail(response) {
        reject({
          status: 'error',
          message: '翻译失败(fail)'
        })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: '3000'
        })
      }
    })
  })
}

module.exports = {
  translate: translate
}
