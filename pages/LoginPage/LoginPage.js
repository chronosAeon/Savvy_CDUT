const app = getApp()
Page({
  data: {
    server_login_bg: app.globalData.server_img + 'logo.JPG',
    account: '',
    password: '',
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
    })
  },

  // 登录  
  login: function () {
    if (this.data.account.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        duration: 2000,
        icon: 'none'
      })
    } else if (this.data.account.length < 10) {
      wx.showToast({
        title: '请检查账号是否正确输入',
        duration: 2000,
        icon: 'none'
      })
    }
    else {
      wx.login({
        success: res => {
          wx.request({
            url: app.globalData.web_server+ 'Login',
            method: 'POST',
            data: {
              "code": res.code,
              "account": this.data.account,
              "password": this.data.password,
            },
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            success: res => {
              console.log(res.data)
              if (res.statusCode == 200 && res.data['token']!=undefined) {
                app.globalData.token = res.data['token']
                app.globalData.userAccount = this.data.account
                console.log(this.data.account)
                app.globalData.userPassword = this.data.password
                console.log(this.data.password)
                app.globalData.isfirst_attach_menu = true
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.switchTab({
                  url: '../menu/menu',
                })
              }
              else  {
                wx.showToast({
                  title: '账号密码错误',
                })
              }
            }
          })
          // 这里修改成跳转的页面  
          
        }
      })
    }
  },
  onLoad: function (options) {
    //获取token信息
    // if (wx.getStorageSync('token')) {
    //   // 通过token去服务器里面拿账号密码
    //   wx.request({
    //     url: app.globalData.web_server + 'getUserInfo',
    //     method: 'POST',
    //     data: {
    //       "token": wx.getStorageSync('token')
    //     },
    //     header: { "Content-Type": "application/x-www-form-urlencoded" },
    //     success: res => {
    //       console.log(res)
    //       if (res.data.stu_id && res.data.password) {
    //         //还要返回登录所得到的账号密码
    //         app.globalData.userAccount = res.data.stu_id;
    //         app.globalData.userPassword = res.data.password;
    //         app.globalData.isfirst_attach_menu = true
    //         // wx.redirectTo({
    //         //   url: '../timetable/timetable',
    //         // })
    //         wx.switchTab({
    //           url: '../menu/menu',
    //         })
    //       }
    //       else {
    //         //这里做处理有成功访问，但是token为无效的情况
    //         console.log(res.data.resInfo)
    //       }
    //       fail: res => {
    //         //处理访问失败的函数
    //       }
    //     }
    //   })
    // }
  }
})