
var app=getApp();
Page({
  data:{
      columnData:{
        "url":"../changePassword/changePassword?userName="+wx.getStorageSync('userName'),
        "iconPath":"../../icons/suo.png",
        "columnName":"修改密码"
      },
      userName:"请登录",
      flag:"show",
      userImg:"",
      thirdAccount:""
  }, 
  userLogin:function(){
     var session=wx.getStorageSync('sessionKey');//回话标示
       var user=wx.getStorageSync('userName');
      if(session==""){
        wx.navigateTo({url:"../login/login"});
      }else{
          wx.navigateTo({url:"../userInfo/userInfo?userName="+user});
      }
     
  },
  downLogin:function(){
          wx.showModal({
            title:"退出",
            content:"是否退出？",
            success:function(res){
              if(res.confirm){
                 wx.clearStorageSync('sessionKey');
                 wx.clearStorageSync('userName');
                  wx.clearStorageSync('userImg');
                  wx.switchTab({
                   url: '/pages/news/news'
                   } 
                   )
              }
            }
          })
  },
  onLoad:function(){
      this.setData({userImg:wx.getStorageSync('userImg'),
                     thirdAccount:wx.getStorageSync('thirdAccount')});
  },
  onShow:function(){
     console.log(123);
     var session=wx.getStorageSync('sessionKey');//回话标示
    var user=wx.getStorageSync('userName');
    if(session!=""){
       this.setData({userName:user,flag:""});
       this.setData({userImg:wx.getStorageSync('userImg'),         thirdAccount:wx.getStorageSync('thirdAccount')});
    }
    else{
      this.setData({userName:"请登录",flag:"show",userImg:""});
    }
    
       

  },

})
