//app.js
App({
  onLaunch: function () {
    //不用打开调试模式了
    // wx.setEnableDebug({
    //   enableDebug: true
    // })

    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        else {
          console.log('start get author')
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res =>{
                  console.log(res.userInfo)
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.web_server+'UserLogin',
          method: 'POST',
          data: {
            "code":res.code
          },
          //必须加这个header，官方没写，否则后台收不到数据
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          success: res => {
            //还要返回登录所得到的账号密码
            console.log(res.data.token)
            wx.setStorageSync('token', res.data.token)
          }
        })
      }
    })
    // console.log('get setting')
    // 获取用户信息
    
    
  },
  globalData: {
    userAccount: '',
    userPassword: '',
    userInfo: null,
    local_web: 'http://Localhost:8080/',
    // web_server:'http://Localhost:8080/',
    web_server: 'https://chronos.fzerolight.cn/',
    local_default_img: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1522755726&di=8930ecc0abb7cfbd04b22e4e2ca95522&src=http://img5.duitang.com/uploads/item/201602/03/20160203233524_irhBT.png',
    local_default_img2: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2984133320,3583824674&fm=27&gp=0.jpg',
    local_default_img3: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3334939457,3549677510&fm=27&gp=0.jpg',
    local_default_img4: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3949741041,3944307437&fm=27&gp=0.jpg',
    local_default_img5: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522766229380&di=27e34465cb2b6aa8af50564d8b2fb557&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0198605851549ba8012060c8379613.jpg%402o.jpg',
    local_default_img6: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1522759479&di=8496cf46bb61112a66d79acb7569961f&src=http://img18.3lian.com/d/file/201705/13/1030f91adeb758afeaca82ce3f0a8270.jpg',
    local_default_img7: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2248129067,3557942125&fm=27&gp=0.jpg',
    local_background_img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1140135774,780829284&fm=27&gp=0.jpg'


  }

})