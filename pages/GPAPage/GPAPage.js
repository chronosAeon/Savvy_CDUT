// pages/GPAPage/GPA.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    GPA: '',
    class_list: [],
    class_title: { name: "学科", credit: "学分", score: "分数" }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.web_server+'GPA'+'/'+ app.globalData.userAccount + '/' + app.globalData.userPassword,
      // url: 'http://140.143.91.27:8080/GPA/201505090215/510104199705243179',
      success: res => {
        console.log(res.data.GPA)
        var GPA_string = res.data.GPA.toString()
        var GPA = GPA_string.substring(0,4)
        var class_list_data = JSON.parse(res.data.data)
        var class_array = new Array()
        for (var index = 0; index < class_list_data.length; index++) {
          var item = JSON.parse(class_list_data[index])
          class_array.push(item)
        }
        console.log(class_array)
        this.setData({
          GPA: GPA,
          class_list: class_array
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
    // wx.onAccelerometerChange(function (e) {
    //   if (e.x > 0.6 && e.y > 0.6) {
    //     wx.showToast({
    //       title: 'We成理',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //     wx.navigateTo({
    //       url: '../timetable/timetable',
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