// pages/menu/menu.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array_object: [
      { brif: '课表', src: '/image/icons/class_inform.png', func_index: '0' },
      { brif: '成绩', src: '/image/icons/GPA.png', func_index: '1' },
      { brif: '教室', src: '/image/icons/classroom.png', func_index: '3' },
      { brif: '地图', src: '/image/icons/Location.png', func_index: '2' },
      // { brif: '公告', src: '/image/icons/announcement.png', func_index: '3' },
      // { brif: '招领', src: '/image/icons/lost_found.png', func_index: '4' },
      { brif: '借阅', src: '/image/icons/book_borrow.png', func_index: '5' }],
    // tools: [
    //   { brif: '汽车', src: '/image/icons/bus.png', func_index: '6' },
    //   { brif: '餐饮', src: '/image/icons/food.png', func_index: '7' },
    //   { brif: '住宿', src: '/image/icons/hotel.png', func_index: '8' },
    //   { brif: '火车', src: '/image/icons/train.png', func_index: '9' },
    //   { brif: '旅游', src: '/image/icons/view.png', func_index: '10' },
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.isfirst_attach_menu)
    {
      app.globalData.isfirst_attach_menu = false
      wx.navigateTo({
        url: '../timetable/timetable',
      })
    }
  },
  getTap: function (e) {

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
    // wx.onAccelerometerChange(function (e) {
    //   if (e.x > 0.3 && e.y > 0.3) {
    //     wx.navigateTo({
    //       url: '../timetable/timetable',
    //     })
    //     wx.showToast({
    //       title: '体面课表',
    //       icon: 'success',
    //       duration: 2000
    //     })
        
    //   }
    // })
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