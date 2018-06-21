

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    avatarUrl: false,
    name:false
  },
  //事件处理函数
  get_user_info:function(data){
    var User_info = JSON.parse(data.detail.rawData)
    console.log(app.globalData.token)
    wx.request({
      url: app.globalData.web_server + 'save_avatar_name',
      method: 'POST',
      data: {
        "token": app.globalData.token,
        "avatar_url": User_info.avatarUrl,
        "name": User_info.nickName
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        console.log(res)
        this.setData({
          avatarUrl: User_info.avatarUrl,
          name: User_info.nickName
        })
      }
    })
    
  },
  onLoad: function () {
    wx.request({
      url: app.globalData.web_server + 'get_avatar_name',
      method: 'POST',
      data: {
        "token": app.globalData.token,
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        // console.log(res.data)
        // console.log(res.data.code)
        if (res.data.code == 200)
        {
          this.setData({
            avatarUrl: res.data.avatar_url,
            name: res.data.name
          })
        }
      }
    })
  },
  about_we:function(e){
    wx.navigateTo({
      url: "about_we/about_wePage",
    })
  },
  quit:function(e){
    console.log('quit')
    wx.request({
      url: app.globalData.web_server + 'quit',
      method: 'POST',
      data: {
        "token": app.globalData.token,
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        console.log('ok')
        wx.redirectTo({
          url: '/pages/LoginPage/LoginPage',
        })
        app.globalData.token = null
      }
    })
  }
})
