// pages/Post/poster.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: res => {
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: app.globalData.web_server+'UserCheckRavel',
          method: 'POST',
          data: {
            "code": res.code
          },
          //必须加这个header，官方没写，否则后台收不到数据
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          success: res => {
            //如果直接能够拿到token就可以直接登陆，如果是拿不到就要跳转的绑定界面
            console.log(JSON.parse(res.data))
            var res_dict = JSON.parse(res.data)
            var code = res_dict.code
            if (code == 406) {
              wx.redirectTo({
                url: "../../pages/LoginPage/LoginPage",
              })
            }
            if (code == 200)
            {
              
              wx.request({
                url: app.globalData.web_server+'getUserInfoByToken',
                method: 'POST',
                data: {
                  "token": res_dict.token
                },
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                success: res => {
                  console.log(res)
                  if(res.data.code == 200)
                  {
                    app.globalData.token = res_dict.token
                    console.log(app.globalData.token)
                    app.globalData.userAccount = res.data.account
                    console.log(app.globalData.userAccount)
                    app.globalData.userPassword = res.data.password
                    console.log(app.globalData.userPassword)
                    app.globalData.isfirst_attach_menu = true
                    wx.switchTab({
                      url: '../menu/menu',
                    })
                  }
                  else{
                    wx.redirectTo({
                      url: "../../pages/LoginPage/LoginPage",
                    })
                  }
                }})
                
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})