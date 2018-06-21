var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textView: true,
    bookName: "",
    bookList: [],
    a: 'https://images.unsplash.com/photo-1509641498745-13c26fd1ed89?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f03d75cd34ea77721f3deb7861948afd&auto=format&fit=crop&w=500&q=60'
    //app.globalData.web_server+'static/login_bg.jpg'
    // http://img3.imgtn.bdimg.com/it/u=123787209,768253272&fm=27&gp=0.jpg
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  inputBookName: function (e) {
    this.setData({
      bookName: e.detail.value,
    })
  },
  searchBook: function (e) {
    //加载动画
    wx.showLoading({
      title: '加载中',
    })
    //设置界面可见
    this.setData({
      textView: false
    })
    var that = this;
    var booklist = [];
    //请求数据
    wx: wx.request({
      url: app.globalData.web_server+'BookList',
      method: 'POST',
      data: {
        "book_name": this.data.bookName
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data != 'noParam'&&res.statusCode!=500) {
          console.log(res);
          //json反序列化
          for (var i = 0; i < res.data.length; i++) {
            booklist.push(JSON.parse(res.data[i]))
          }
          //去掉出版信息
          for (var i = 0; i < booklist.length; i++) {
            booklist[i].public_info = booklist[i].public_info.substring(5, booklist[i].public_info.length);
          }
          //数据绑定
          wx: wx.hideLoading();
          that.setData({
            bookList: booklist
          })
        }
        else{
          wx: wx.hideLoading();
          wx.showToast({
            title: '未找到数据',
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        wx: wx.hideLoading();
        wx.showToast({
          title: '未找到数据',
          icon: 'fail'
        })
      },
      complete: function (res) { },
    })

  },
  navigateto: function (event) {
    var detail_url = event.target.dataset.detail_url;
    wx: wx.navigateTo({
      url: '../BookDetail/BookDetail?detail_url=' + detail_url,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})