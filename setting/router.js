// 此页面配置不同点击事件的func_index和页面对应的值
//page_kind 有redirect,navigate,switch
var router = {
  "0": {
    url:'/pages/timetable/timetable',
    page_kind:'navigate'
  },
  "1":{
    url:'/pages/GPAPage/GPAPage',
    page_kind:'navigate'
  },
  "2":{
    url:'/pages/MetroCardPage/MetroCardPage',
    page_kind:'navigate'
  },
 "3": {
   url: '/pages/AnnouncementPage/AnnouncementPage',
    page_kind: 'navigate'
  },
 "4": {
   url: '/pages/Lost_foundPage/Lost_foundPage',
   page_kind: 'navigate'
 },
 "5": {
   url: '/pages/BookBorrowPage/BookBorrowPage',
   page_kind: 'navigate'
 },
}
module.exports = {
  Router: router
}