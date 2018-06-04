const app = getApp()
Page({
  data: {
    account: '',
    password: '',
    // left: 'none',
    // width:'none',
    // account_border: 'none',
    // account_radius: 'none',
    // password_border: 'solid 5rpx skyblue',
    // password_radius: '20rpx'
  },

  // 获取输入账号  
  AccountInput: function (e) {
    this.setData({
      account: e.detail.value,
      // left: '20rpx',
      // width: '60%',
      // account_border: 'solid 5rpx skyblue',
      // account_radius: '20rpx'
    })
  },

  // 获取输入密码  
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value,
      // left: '20rpx',
      // width: '60%',
      // account_border: 'solid 5rpx skyblue',
      // account_radius: '20rpx'
    })
  },

  // 登录  
  login: function () {
      if (this.data.account.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
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
              app.globalData.isfirst_attach_menu = true
              wx.switchTab({
                url: '../menu/menu',
              })
              // wx.redirectTo({
              //   url: '../timetable/timetable',
              // })
            }
            else if (res.statusCode == 4000) {
              //弹出账号错误
            }
          }
        })
      // 这里修改成跳转的页面  
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
    }
  },
  
   onLoad: function (options) {
    //获取token信息
    if (wx.getStorageSync('token')) {
      // 通过token去服务器里面拿账号密码
      wx.request({
        url: app.globalData.web_server + 'getUserInfo',
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
            app.globalData.isfirst_attach_menu = true
            // wx.redirectTo({
            //   url: '../timetable/timetable',
            // })
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
  }
})  