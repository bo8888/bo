//app.js
App({
 
  showModel:function(){
     wx.showToast({
  title: '正在加载....',
  icon: 'loading',
  duration: 5000
})
  },
  globalData:{
    url:"https://demo.jeecms.com/api",
    userInfo:null,
    appId:"4505818634615678",
    appKey:"2sHKEWFCxNofq1EbwusziayFJlIfRJ8o",
    aesKey:"iQigEt6Hg4cjnns7",
    ivKey:"3V3OVwQwxdIaxrx1"
  }
})