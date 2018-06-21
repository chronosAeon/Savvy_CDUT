const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buildingarray: ['教学一楼', '教学二楼', '教学三楼', '教学四楼', '教学五楼', '六教A座', '六教B座', '六教C座', '教学七楼', '教学八楼', '教学九楼', '东区一教', '东区二教', '艺术大楼'],
    index:0,
    date:'',
    roomList:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date;
    var year = date.getFullYear()
    var now = year + '-' + (date.getMonth()+1) + '-' + date.getDate()
    this.setData({
      date: now
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
    
  },
  searchEmptyClassroom:function(){
    var that = this;
   var buildingArray =  ['first_building', 'second_building', 'third_building', 'forth_building', 'fifth_building', 'sixA_building', 'sixB_building', 'sixC_building', 'seventh_building', 'eighth_building', 'ninth_building', 'E1_building', 'E2_building', 'Art_building']
   wx.showLoading({
     title: '加载中',
   })
    wx: wx.request({
      url: 'https://chronos.fzerolight.cn/getEmptyClassInfo',
      data: {
        account: app.globalData.userAccount,
        password: app.globalData.userPassword,
        date: this.data.date,
        building: buildingArray[this.data.index],
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res){
        var data = res.data
        console.log(data)
        // console.log(data[0][2].substring(0,3))
        //处理表头
        for (var j = 2; j < data[0].length-1; j++){
          data[0][j] = data[0][j].substring(0, 3)
        }
        data[0][6] = data[0][6].substring(0, 4)
        //处理教室表
        for(var i = 1;i < data.length ; i++){
          for(var j = 2;j < data[i].length; j++){
            if("正常教学" == data[i][j]){
              data[i][j] = "教学"
            }else if("空闲中" == data[i][j]){
              data[i][j] = "空闲"
            }else{
              data[i][j] = "外借"
            }
          }
        }
        wx: wx.hideLoading();
        that.setData({
          roomlist : data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  selectbuilding:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  selectDate:function(e){
    this.setData({
      date: e.detail.value
    })
  }
})