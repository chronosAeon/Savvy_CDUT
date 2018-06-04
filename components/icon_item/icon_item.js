// components/list_components/list_components.js
var Router = require('../../setting/router.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    brif: String,
    icon_src: String,
    func_index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    icon_click: function (e) {
      console.log(e)
      e.currentTarget.dataset.func_index = this.properties.func_index
      // 获取之后会跳转到规定页面，然后通过不同的func_index渲染不同的页面
      switch (Router.Router[this.properties.func_index].page_kind) {
        case 'switch':
          wx.switchTab({
            url: Router.Router[this.properties.func_index].url,
          })
          break;
        case 'navigate':
          wx.navigateTo({
            url: Router.Router[this.properties.func_index].url,
          })
          break;
        case 'redirect':
          wx.redirectTo({
            url: Router.Router[this.properties.func_index].url,
          })
          break;
      }
      // wx.switchTab({
      //   url: Router.Router[0],
      // })
    }
  }
})
