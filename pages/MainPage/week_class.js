var week_data = new Array();
const app = getApp()
var day_data =  [{
    classId: '1',
    classImg: app.globalData.local_default_img,
    classContent_text: ''
  }, {
    classId: '1',
    classImg: app.globalData.local_default_img2,
    classContent_text: ''
  }, {
    classId: '1',
    classImg: app.globalData.local_default_img3,
    classContent_text: ''
  }, {
    classId: '1',
    classImg: app.globalData.local_default_img4,
    classContent_text: ''
  }, {
    classId: '1',
    classImg: app.globalData.local_default_img5,
    classContent_text: ''
  }, {
    classId: '1',
    classImg: app.globalData.local_default_img5,
    classContent_text: ''
  }, {
    classId: '1',
    classImg: app.globalData.local_default_img4,
    classContent_text: ''
  }, {
    classId: '1',
    classImg: app.globalData.local_default_img3,
    classContent_text: ''
  }, {
    classId: '1',
    classImg: app.globalData.local_default_img2,
    classContent_text: ''
  }, {
    classId: '1',
    classImg: app.globalData.local_default_img,
    classContent_text: ''
  }, {
    classId: '1',
    classImg: app.globalData.local_default_img6,
    classContent_text: ''
  }, {
    classId: '1',
    classImg: app.globalData.local_default_img7,
    classContent_text: ''
  }]
for (var day = 0; day < 7; day++) {
    week_data.push(day_data)
}
module.exports = {
  week_data: week_data
}