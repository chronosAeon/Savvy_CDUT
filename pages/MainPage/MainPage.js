var week = require('/week_class.js');
var util = require('../../utils/util.js')
const app = getApp();
// var account = wx.getStorageSync('account')
// var password = wx.getStorageSync('password')

// pages/MainPage/MainPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_data: '',
    class_data_fromWeb: '',
    back_groundImg: app.globalData.local_background_img,
    term_index: 0,
    term_array: '',
    week_index: 0,
    week_array: ''
  },
  bindTermChange: function (e) {
    this.setData({
      term_index: e.detail.value
    })
    console.log(this.data.term_array[this.data.term_index])
    wx.request({
      url: app.globalData.web_server + 'curriculum/' + app.globalData.userAccount + '/' + app.globalData.userPassword + '/' + this.data.term_array[this.data.term_index],
      success: res => {

        console.log(res)
        if (res.data.length > 0) {
          var week_array_index = new Array()
          for (var index = 0; index < res.data.length; index++) {
            week_array_index.push('第' + (index + 1).toString() + '周')
          }
          if (parseInt(util.formatTime(new Date).split('/')[1]) > 10) {
            var lenght = parseInt(util.formatTime(new Date).split('/')[0]) - 2015
          }

          console.log(util.formatTime(new Date).split('/'))


          this.setData({
            class_data_fromWeb: res,
            week_array: week_array_index
          })




          console.log(this.data.week_array)
          this.Load_webData(res, this.data.week_index)
        }
        else {
          //这里面写没有这个课表的逻辑
        }
      }
    })
  },
  fresh: function () {
    this.setData({
      class_data: week.week_data
    })
    var self = this
    // var up = "class_data.items[3].classContent_text"
    wx.request({
      url: app.globalData.web_server + 'curriculum/' + app.globalData.userAccount + '/' + app.globalData.userPassword + '/' + this.data.term_array[this.data.term_index]+'?isfresh=true',
      success: res => {

        console.log(res)
        var week_array_index = new Array()
        for (var index = 0; index < res.data.length; index++) {
          week_array_index.push('第' + (index + 1).toString() + '周')
        }
        res.data.length
        self.setData({
          class_data_fromWeb: res,
          week_array: week_array_index
        })
        console.log(this.data.week_array)
        self.Load_webData(res, this.data.week_index, self)
      }
    })
  },
  bindWeekChange: function (e) {
    this.setData({
      week_index: e.detail.value
    })
    this.Load_webData(this.data.class_data_fromWeb, this.data.week_index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var default_term = '01';
    // var default_year = parseInt(util.formatTime(new Date()).substring(0, 4)) - 1
    // this.setData({
    //   default_term: default_term,
    //   default_year: default_year
    // })
    // console.log(parseInt(util.formatTime(new Date()).substring(0, 4))-1)
    // if(parseInt(util.formatTime(new Date()).substring(5, 7))>4)
    // {
    //   default_term='02'
    // }
    // 初始化模板数据
    this.setData({
      class_data: week.week_data
    })
    wx.request({
      url: app.globalData.web_server + 'curriculum/' + app.globalData.userAccount + '/' + app.globalData.userPassword + '/' + '2015' + '01',
      success: res => {

        console.log(res)
        if (res.data.length > 0) {
          var week_array_index = new Array()
          for (var index = 0; index < res.data.length; index++) {
            week_array_index.push('第' + (index + 1).toString() + '周')
          }
          if (parseInt(util.formatTime(new Date).split('/')[1]) > 10) {
            var lenght = parseInt(util.formatTime(new Date).split('/')[0]) - 2015
          }

          console.log(util.formatTime(new Date).split('/'))



          this.setData({
            class_data_fromWeb: res,
            week_array: week_array_index
          })




          console.log(this.data.week_array)
          this.Load_webData(res, this.data.week_index)
        }
        else {
          //这里面写没有这个课表的逻辑
        }
      }
    })
    wx.request({
      url: app.globalData.web_server + 'semesters/' + app.globalData.userAccount + '/' + app.globalData.userPassword + '/' + app.globalData.userAccount.substring(0,4)+'01',
      success: res => {
        this.setData({
          term_array: res.data
        })
      }

    })
  },
  // 渲染界面
  Load_webData: function (Web_Data, week_index) {
    for (var day_index = 0; day_index < 7; day_index++) {
      for (var class_index = 0; class_index < this.data.class_data[0].length; class_index++) {
        var text = 'class_data[' + day_index + '][' + class_index + '].classContent_text'
        if (Web_Data.data[week_index][day_index][(class_index + 1).toString()] == 'NoClass') {
          this.setData({
            [text]: '没课耶(＾－＾)V'
          })
        } else {
          this.setData({
            [text]: Web_Data.data[week_index][day_index][(class_index + 1).toString()]
          })
        }
      }
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