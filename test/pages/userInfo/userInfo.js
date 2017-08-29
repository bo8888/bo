// pages/userInfo/userInfo.js
var app=getApp();//获取appid
var rand=require('../../utils/random.js');//获取随机数
var sign=require('../../utils/sign.js');//获取签名

Page({
  data:{
    userInfo:{}
  },
  onLoad:function(options){
    var app=getApp();//获取appid
var rand=require('../../utils/random.js');//获取随机数
var sign=require('../../utils/sign.js');//获取签名
     var https=0;
      var username=options.userName;//用户名
      var appId=app.globalData.appId;//appid;
      var nonce_str=rand.getRand();//获取随机数
       var postParams=[];//签名数组
        postParams[0]=["username",username];
        postParams[1]=["appId",appId];
        postParams[2]=["nonce_str",nonce_str];
        postParams[3]=["https",https];
        var signVal=sign.createSign(postParams,app.globalData.appKey);//签名
      var getUser_url= app.globalData.url+"/user/get.jspx?username="+username+"&appId="+appId+"&nonce_str="+nonce_str+"&sign="+signVal+"&https=0";
       //获取信息
       var self=this;
       wx.request({
         url: getUser_url,
         data: {},
         method: 'POST', 
         success: function(res){
           console.log("info:请求");
           self.setData({userInfo:res.data});
         }
       })

  }
})