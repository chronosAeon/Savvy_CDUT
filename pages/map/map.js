// pages/map/ma p.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDUT_lati: 30.6748018738967,
    CDUT_longi: 104.13991928100586,
    markers: [],
    circles: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 获取用户位置权限
            }
          })
        }
      }
    })

  },
  markerTap: function (event) {
    // console.log(event)
    
    var markerId = event.markerId
    for(var i=0;i<this.data.markers.length;i++)
    {
      if(this.data.markers[i].id == event.markerId){
        console.log(this.data.markers[i].id)
        var data = 'markers['+i+']'+'.label.content'
        this.setData({
          [data]: this.data.markers[i].submit_user
        })
      }
    }
  },
  //发布位置
  mapTap: function (event) {
    console.log(event)
    wx.chooseLocation({
      success: res => {
        // console.log(res)
        this.setData({
          marker_latitude: res.latitude,
          marker_longitude: res.longitude
        })
        var marker_length = this.data.markers.length
        this.data.markers.push({
          id: marker_length,
          latitude: res.latitude,
          longitude: res.longitude,
          width: 50,
          height: 50
        })
        this.setData({
          markers: this.data.markers
        })
        var circles_length = this.data.circles.length
        this.data.circles.push({
          id: circles_length,
          latitude: res.latitude,
          longitude: res.longitude,
          radius: 50
        })
        // this.setData({
        //   circles: this.data.circles
        // })
        //上传一个新的点数据，地图上有marker，有marker简介列表
        wx.request({
          url: app.globalData.web_server + 'addMapInfo',
          method:'POST',
          data:{
            'marker_latitude': res.latitude,
            'marker_longitude': res.longitude,
            'submit_user':app.globalData.token,
            'description':'nodescription',
          },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          success:res=>{
            // console.log(res)
            wx.request({
              url: app.globalData.web_server + 'getMapInfo',
              method: 'POST',
              header: { "Content-Type": "application/x-www-form-urlencoded" },
              success: res => {
                // console.log(res)
              }
            })
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        var latitude = res.latitude
        var longitude = res.longitude
        var latitude = res.latitude
        var longitude = res.longitude
        this.setData({
          current_lati: latitude,
          current_longi: longitude
        })
        //从服务器接口调用接口获取marker点
        
      }
      
    })
    wx.request({
      url: app.globalData.web_server + 'getMapInfo',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        var refined_data = this.refined_data(res.data.result)
        var marker_array = new Array()
        for (var i = 0; i < refined_data.length; i++) {
          var marker = this.marker_data(this.data.markers.length + i, refined_data[i].marker_latitude, refined_data[i].marker_longittude, refined_data[i].submit_user, refined_data[i].description, refined_data[i].iconPath)
          marker_array.push(marker)
        }
        this.setData({
          markers:marker_array
        })
        console.log(this.data.markers)
      }
    })
   
  },
  refined_data: function (crude_data) {
    var refined_array = new Array()
    for (var i=0;i<crude_data.length;i++)
    {
      var refined = JSON.parse(crude_data[i])
      refined.iconPath = '/image/icons/icon-location.png'
      refined_array.push(refined)
    }
    return refined_array
  },
  marker_data:function(id,res_latitude,res_longitude,res_submit_user,res_description,iconpath)
  {
    var marker = {
      id:id,
      latitude: res_latitude,
      longitude: res_longitude,
      submit_user: res_submit_user,
      description: res_description,
      width: 30,
      height: 30,
      iconPath:iconpath
    }
    // console.log(marker)
    return marker
  }
})