// bookSearch.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: [],
    name: "",
    author: "",
    language: "",
    pages: "",
    publicity: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var detail_url = options.detail_url;
    var that = this
    wx.showLoading({
      title: '正在为您跑遍图书馆',
    })
    wx: wx.request({
      url: app.globalData.web_server+'BookDetail',
      method: 'POST',
      data: {
        "bookdetail_url": detail_url
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode != 500) {
          var book = res.data
          console.log(res)
          that.setData({
            book: res.data
          })
          //将书名与作者分开
          var i = book.author.indexOf("/")
          var name = book.author.substring(0, i)
          var author = book.author.substring(i + 2, book.author.length)
          // console.log(name)
          // console.log(author)
          //规格化页数
          var j = book.pages.indexOf("页")
          var pages = book.pages.substring(0, j + 1)
          // console.log(pages)
          //格式化语言
          var k = book.language.indexOf("chi")
          var n = book.language.indexOf("eng")
          // console.log(k)
          // console.log(n)
          var language;
          if (k != -1 && n != -1) {
            language = "汉语 英语"
          } else if (k != -1 && n == -1) {
            language = "汉语"
          } else if (k == -1 && n != -1) {
            language = "英语"
          } else {
            language = ""
          }
          that.setData({
            name: name,
            author: author,
            language: language,
            pages: pages
          })
        }
        else{
          wx.showToast({
            title: '书籍信息缺失混乱，没找到。',
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
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