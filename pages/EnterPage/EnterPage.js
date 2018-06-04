// pages/EnterPage/EnterPage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: ''

  },
  getAccount: function (e) {
    this.data.account = e.detail.value
  },
  getPassword: function (e) {
    this.data.password = e.detail.value
  },
  navigate_main_page: function () {
    console.log('account:' + this.data.account)
    //这个地方如果没账户或者密码就没必要请求服务器了，待完成
    if (!this.data.account) {
      this.data.account = '1'
    }
    if (!this.data.password) {
      this.data.password = '1'
    }
    console.log('password:' + this.data.password)
    wx.request({
      url: app.globalData.web_server + 'checkUser/' + this.data.account + '/' + this.data.password + '?token=' + wx.getStorageSync('token'),
      success: res => {
        console.log(res)
        if (res.statusCode == 200) {
          app.globalData.userAccount = this.data.account
          // wx.setStorageSync('account', this.data.account)
          console.log(this.data.account)
          app.globalData.userPassword = this.data.password
          // wx.setStorageSync('password', this.data.password)
          console.log(this.data.password)
          // wx.switchTab({
          //   url: '../MainPage/MainPage',
          //   // url:'../menu/menu'
          // })
          wx.switchTab({
            url: '../menu/menu',
          })
        }
        else if (res.statusCode == 4000) {
          //弹出账号错误
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取token信息
    if (wx.getStorageSync('token')) {
      // 通过token去服务器里面拿账号密码
      wx.request({
        url: app.globalData.web_server+'getUserInfo',
        method: 'POST',
        data: {
          "token": wx.getStorageSync('token')
        },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: res => {
          console.log(res)
          if (res.data.stu_id && res.data.password) {
            //还要返回登录所得到的账号密码
            app.globalData.userAccount = res.data.stu_id;
            app.globalData.userPassword = res.data.password;
            wx.switchTab({
              url: '../menu/menu',
            })
          }
          else {
            //这里做处理有成功访问，但是token为无效的情况
            console.log(res.data.resInfo)
          }
          fail: res => {
            //处理访问失败的函数
          }
        }
      })
    }
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