//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
const a_day_max_class = 12
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    // current_week: 10,
    is_show: false,
    scroll_hight: '1070',
    wlist: [
      // { "xqj": 4, "skjc": 6, "skcd": 2, "kcmc": "1" },
      // { "xqj": 3, "skjc": 6, "skcd": 2, "kcmc": "1" },
      // { "xqj": 2, "skjc": 6, "skcd": 2, "kcmc": "1" },
      // { "xqj": 1, "skjc": 6, "skcd": 2, "kcmc": "1" },
      // { "xqj": 5, "skjc": 6, "skcd": 2, "kcmc": "1" },
    ],

  },
  show_hiden_week: function () {
    if (this.data.is_show) {
      //显示状态再触发
      if (this.data.select_week_index!=null) {
        var select_week = this.data.select_week_index + 1
        // console.log(select_week)
        wx.setNavigationBarTitle({
          title: '第' + select_week + '周',
        })
        var view_current = new Array();
        view_current.push(select_week - 1)
        this.setData({
          wlist: [],
          week_select_current: view_current

        })
        for (var i = 0; i < 7; i++) {
          this.refinded_day_data(this.data.time_table[select_week - 1][i], i + 1)
        }
      }
      this.setData({
        is_show: false,
        scroll_hight: '1170'
      })
    }
    else {
      this.setData({
        is_show: true,
        scroll_hight: '1070'
      })
    }
  },
  check_version() {
    const updateManager = wx.getUpdateManager()

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })
  },
  onLoad: function () {
    this.check_version()
    var plateform = 'ios'
    try {
      var res = wx.getSystemInfoSync()
      console.log(res.model)
      console.log(res.pixelRatio)
      console.log(res.windowWidth)
      console.log(res.windowHeight)
      // console.log(res.language)
      // console.log(res.version)
      console.log(res.platform)
      // console.log(res.platform)
      plateform = res.platform
    } catch (e) {
      // Do something when catch error
      plateform = 'android'
    }
    if (plateform == 'ios' || plateform == 'devtools') {
      // console.log('ios万岁')
      this.setData({
        uppertrigger: -125,
        lowertrigger: -125
      })
    }
    else {
      this.setData({
        uppertrigger: 10,
        lowertrigger: -5
      })
    }
    var start_year = app.globalData.userAccount.substring(0, 4)
    var now_year = parseInt(util.formatTime(new Date()).substring(0, 4))
    var month = parseInt(util.formatTime(new Date()).substring(5, 7))
    var day = parseInt(util.formatTime(new Date()).substring(8, 10))
    this.setData({
      current_month: month,
      current_day: day
    })
    // console.log(day)
    var semester = ''
    if (month > 2) {
      // 大于3月代表课表你的课表ok
      semester = now_year - 1 + '02'
      if (month > 8) {
        semester = now_year + '01'
      }
    }
    else {
      semester = now_year - 1 + '01'
    }
    this.setData({
      semester: semester
    })
    var default_year = parseInt(util.formatTime(new Date()).substring(0, 4)) - 1
    wx.request({
      // url: app.globalData.web_server + 'curriculum/' + app.globalData.userAccount + '/' + app.globalData.userPassword + '/' + '2015' + '01',
      url: app.globalData.web_server + 'curriculum',
      method: 'POST',
      data: {
        "stu_number": app.globalData.userAccount,
        "password": app.globalData.userPassword,
        "semester":this.data.semester 
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        var time_table = JSON.parse(JSON.parse(res.data)['class_timetable'])
        var total_week = JSON.parse(JSON.parse(res.data)['class_classTime_array']).length
        var week_array = new Array()
        for (var g = 1; g <= total_week; g++) {
          week_array.push(g)
        }
        this.setData({
          time_table: time_table,
          total_week_array: week_array
        })
        var current_week = this.which_week(JSON.parse(JSON.parse(res.data)['class_classTime_array'])) + 1
        // var current_week = this.which_week(JSON.parse(res.data['class_classTime_array'])) + 1
        var view_current = new Array();
        view_current.push(current_week - 1)
        this.setData({
          week_select_current: view_current
        })
        wx.setNavigationBarTitle({
          title: '第' + current_week + '周',
        })
        var current_day = this.which_day(JSON.parse(JSON.parse(res.data)['class_classTime_array']), current_week)
        var class_detail_array = JSON.parse(JSON.parse(res.data)['class_array_detail'])
        var detail_titles = this.refined_all_title(class_detail_array)

        //
        var class_refined_detail_array = new Array()
        for (var k = 0; k < class_detail_array.length; k++) {
          var refined_array = new Array()
          var nick_name_array = new Array()
          for (var j = 0; j < detail_titles[k].length; j++) {
            var nick_name = class_detail_array[k].match(/\((.*)\)/)[1] + detail_titles[k][j];
            nick_name_array.push(nick_name)

          }
          // console.log(nick_name_array)
          var full_name = class_detail_array[k].match(/\)(.*)\(/)[1];

          refined_array.push(nick_name_array, full_name)
          class_refined_detail_array.push(refined_array)

        }
        // console.log(class_refined_detail_array)
        this.setData({
          current_week: current_week,
          current_xinqi: current_day,
          class_refined_detail_array: class_refined_detail_array,
          wlist: []
        })
        for (var i = 0; i < 7; i++) {
          this.refinded_day_data(time_table[current_week-1][i], i + 1)
        }
        // console.log(current_week)
        // console.log(this.data.wlist)
      }
    })
  },
  onShow: function () {
    wx.onAccelerometerChange(function (e) {
      if (e.x > 0.6 && e.y > 0.6) {
        wx.showToast({
          title: 'We成理',
          icon: 'success',
          duration: 2000
        })
        wx.switchTab({
          url: '../menu/menu',
        })
      }
    })

  },
  weekSelect: function () {
    this.show_hiden_week()
    wx.showToast({
      title: '再次上拉选周',
      icon: 'success',
      duration: 2000
    })
  },
  refined_all_title: function (class_detail_array) {
    var all_class_titles = new Array()
    for (var i = 0; i < class_detail_array.length; i++) {
      var full_name_ids = class_detail_array[i].match(/-(...?)\(/g);
      var a_class_title = this.refined_title(full_name_ids)
      all_class_titles.push(a_class_title)
    }
    // console.log(all_class_titles)
    return all_class_titles
  }
  ,
  refined_title: function (title_text_re) {
    var a_class_titles = new Array()
    for (var z = 0; z < title_text_re.length; z++) {

      var letter = title_text_re[z].substring(1, 2);
      var num = title_text_re[z].substring(3, 4);
      var all_title = letter + num;
      a_class_titles.push(all_title)

    }
    // console.log(a_class_titles)
    return a_class_titles

  },
  which_week: function (class_titles) {
    var current_month = this.data.current_month
    var current_day = this.data.current_day
    // console.log(current_day)
    var all_ranges = new Array()
    for (var i = 0; i < class_titles.length; i++) {
      var a_range = new Array()
      var dates = class_titles[i].split('-');
      var start_date = dates[0]
      var end_date = dates[1]
      var start_array = this.get_date_from_text(start_date)
      var end_array = this.get_date_from_text(end_date)
      a_range.push(start_array)
      a_range.push(end_array)
      // console.log(this.get_date_from_text(start_date))
      // console.log(start_date)
      all_ranges.push(a_range)
    }
    // console.log(all_ranges)
    for (var j = 0; j < all_ranges.length; j++) {
      // 这里要区别是同月还是不同月
      if (all_ranges[j][0][0] == all_ranges[j][1][0] && all_ranges[j][0][0] == current_month) {
        // 同月比较
        if (all_ranges[j][0][0] == current_month) {
          //当前月是这个月
          if (current_day >= all_ranges[j][0][1] && current_day <= all_ranges[j][1][1]) {
            //符合同月天数里
            // console.log(j)
            return j
          }
        }
        else {
          //这一组同月被剔除
          continue;
        }
      }
      else {
        //当前月是前月还是后月
        if (current_month >= all_ranges[j][0][0] && current_month <= all_ranges[j][1][0]) {
          //当前月是前月
          if (current_day >= all_ranges[j][0][1] && current_day <= all_ranges[j][1][1]) {
            // console.log(j)
            return j
          }
          else {
            continue
          }
        }
        else {
          //如果月份不在这里就pass
          continue;
        }
      }
    }

    return all_ranges.length - 1
  },
  which_day: function (class_titles, current_week) {
    var current_month = this.data.current_month
    var current_day = this.data.current_day
    // console.log(current_day)
    var all_ranges = new Array()
    for (var i = 0; i < class_titles.length; i++) {
      var a_range = new Array()
      var dates = class_titles[i].split('-');
      var start_date = dates[0]
      var end_date = dates[1]
      var start_array = this.get_date_from_text(start_date)
      var end_array = this.get_date_from_text(end_date)
      a_range.push(start_array)
      a_range.push(end_array)
      // console.log(this.get_date_from_text(start_date))
      // console.log(start_date)
      all_ranges.push(a_range)
    }
    // console.log(all_ranges[current_week - 1])
    if (all_ranges[current_week - 1][0][0] == all_ranges[current_week - 1][1][0]) {
      //同月
      // console.log('同月')
      var day_index = current_day - all_ranges[current_week - 1][0][1]
      return day_index
    }
    else if (current_month == all_ranges[current_week - 1][0][0]) {
      //在前月
      // console.log('前月')
      var day_index = current_day - all_ranges[current_week - 1][0][1] + 1
      return day_index
    }
    else if (current_month == all_ranges[current_week - 1][1][0]) {
      //在后月
      // console.log('后月')
      var day_index = 6 - (all_ranges[current_week - 1][1][1] - current_day)
      // console.log(all_ranges[current_week - 1][1][1] )
      return day_index
    }
  }
  ,
  get_date_from_text: function (date_text) {
    var month_and_date = date_text.split('/')
    var month = parseInt(month_and_date[0])
    var day = parseInt(month_and_date[1])
    return [month, day]
  },
  refinded_day_data: function (day_object, day) {
    var a_day_array = new Array();

    for (var i = 1; i <= a_day_max_class; i++) {

      if (day_object[i] != 'NoClass') {
        var a_class_object = new Object()
        // 如果当前课程不是Noclass就要找下一个课程是不是一样的如果是一样的就会连在一起
        a_class_object['xqj'] = day;
        a_class_object['skjc'] = i;
        a_class_object['skcd'] = 1;
        if (day_object[i] != '教研') {
          var class_name = day_object[i].substring(0, 4)
          var class_room = day_object[i].substring(4, day_object[i].length)
          // console.log(day_object[i])
          // console.log(day_object[i].indexOf('E'))
          //区分6️教和E教
          if (day_object[i].indexOf('E') != -1) {
            class_name = day_object[i].substring(0, day_object[i].indexOf('E'))
            class_room = day_object[i].substring(day_object[i].indexOf('E'), day_object[i].length)
          }
          for (var k = 0; k < this.data.class_refined_detail_array.length; k++) {
            for (var j = 0; j < this.data.class_refined_detail_array[k][0].length; j++) {
              if (this.data.class_refined_detail_array[k][0][j] == class_name) {
                class_name = this.data.class_refined_detail_array[k][1]
                break;
              }
            }
          }

          var reform_text = class_name + '\r\n' + class_room
          a_class_object['kcmc'] = reform_text
        }
        else {
          a_class_object['kcmc'] = day_object[i]
        }

        a_day_array.push(a_class_object)
      }

    }
    var refined = this.check_connect_class(a_day_array)

    var array = new Array()
    array = this.data.wlist.concat(refined)
    // console.log(array)
    this.setData({
      wlist: array
    })
    // console.log(a_day_array)
  },
  check_connect_class: function (a_day_array) {
    for (var i = 1; i < a_day_array.length; i++) {
      if (a_day_array[i - 1].kcmc == a_day_array[i].kcmc) {
        a_day_array[i - 1]['skcd'] += 1;
        a_day_array.splice(i, 1);
        i--;
      }
    }
    return a_day_array
  },
  refresh: function (e) {
    // console.log('ok')
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.web_server + 'curriculum',
      method: 'POST',
      data: {
        "stu_number": app.globalData.userAccount,
        "password": app.globalData.userPassword,
        "semester": this.data.semester,
        "isfresh":true
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        var time_table = JSON.parse(JSON.parse(res.data)['class_timetable'])
        wx: wx.hideLoading();
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '刷新成功',
          icon: 'success'
        })
        this.setData({
          wlist: []
        })
        var view_current = new Array();
        view_current.push(this.data.current_week - 1)
        console.log(view_current)
        this.setData({
          week_select_current: view_current
        })
        wx.setNavigationBarTitle({
          title: '第' + this.data.current_week + '周',
        })
        for (var i = 0; i < 7; i++) {
          this.refinded_day_data(time_table[this.data.current_week-1][i], i + 1)
        }
        // console.log(res)
      }
    })
  },
  bindChange: function (e) {
    const val = e.detail.value[0]
    // console.log(val)
    this.setData({
      select_week_index: val
    })
  }
})
