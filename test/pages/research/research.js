var app=getApp();
Page({
  data:{
     show1:"",
     show2:"false",
     searchList:[],
     save:{},//正在投票项
    voteId:"",//调查id
    subIds:"",//调查题目id
    itemIds:"",//投票项Id
    subTxtIds:"",//投票的调查题目选文本性项id
     replys:"",//投票的调查题目选文本性项内容
    flag:"0",//状态
    resing:"resing",
    resmore:"resmore"
  },
  onLoad:function(options){
      var self=this;
       app.showModel();
         wx.request({//调查列表
           url:  app.globalData.url+'/vote/list.jspx?https=0&count=20',
           data: {},
           method: 'POST', 
           success: function(res){
               console.log(res.data);
             self.setData({
                 searchList:res.data
             })
             wx.hideToast();
            }
         });
         wx.request({//正在调查
           url:  app.globalData.url+'/vote/get.jspx',
           data: {
               id:2
           },
           method: 'GET', 
           success: function(res){
               
              for(var i=0;i<res.data.subtopics.length;i++){
                if(res.data.subtopics[i].type==3){
                  self.setData({subTxtIds:res.data.subtopics[i].id});//文本类型id
                }
              }
            self.setData({
                save:res.data,
            voteId:res.data.id,
            subIds:res.data.subtopics[0].id});
           }
         })
  },
  showing : function(){
      this.setData({
          show1:"",
          show2:"false",
            resing:"resing",
            resmore:"resmore"
      })
  },
  showMore : function(){
      this.setData({
          show1:"false",
          show2:"",
           resing:"resmore",
            resmore:"resing"
      })
  },
   formSubmit: function(e) {//获取投票项
     var obj=e.detail.value;
     var tmp=[];
    for (var key in obj) {
       if(typeof(obj[key])=="object"){
        for(var i=0;i<obj[key].length;i++){
              tmp.push(obj[key][i]);
            }  
       }else{
          tmp.push(obj[key]);
       }
     }
      this.setData({itemIds:tmp.join(",")}); 
       console.log(this.data.itemIds);
  },

  textChange:function(e){//获取文本
    console.log(e.detail.value);
    this.setData({replys:e.detail.value});
  },
  save: function(){
       var self=this;
        var app = getApp();
        var rand=require('../../utils/random.js');
         var sign=require('../../utils/sign.js');  
        var voteId=this.data.voteId;//调查id
        var subIds=this.data.subIds;//调查题目idid
        var itemIds=this.data.itemIds;//投票id
        var subTxtIds=this.data.subTxtIds//文本id
        var replys=this.data.replys;//文本内容
         var appId=app.globalData.appId;//appid;
        var nonce_str=rand.getRand();//获取随机数
        var sessionKey=wx.getStorageSync('sessionKey');//sessionKey
        var postParams=[];
        postParams[0]=["voteId",voteId];
         postParams[1]=["subIds",subIds];
          postParams[2]=["itemIds",itemIds];
          postParams[3]=["subTxtIds",subTxtIds];
          postParams[4]=["replys",replys];
        postParams[5]=["appId",appId];
        postParams[6]=["nonce_str",nonce_str];
        postParams[7]=["sessionKey",sessionKey];
        var signVal=sign.createSign(postParams,app.globalData.appKey);//签名      
          if(sessionKey==null||sessionKey==""){
       wx.showModal({
         title:"提示",
         content:"投票需要登录，是否登录?",
         success:function(res){
               if (res.confirm) {
                  wx.navigateTo({
                    url:"../login/login"
                  })
           }
           }
         })
    }else{
        if(self.data.flag==1){
              wx.showModal({
         title:"提示",
         content:"您已经投过票了！",
         })
        }
    else{
        wx.request({
        url:  app.globalData.url+'/vote/save.jspx',
           data: {
               voteId:voteId,
               subIds:subIds,
               itemIds:itemIds,
               appId:appId,
               subTxtIds:subTxtIds,
               replys:replys,
               nonce_str:nonce_str,
               sign:signVal,
               sessionKey:sessionKey
           },
           method: 'GET', 
           success: function(res){
             console.log(res.data);
             if(res.data.status=="true"){
                wx.showToast({
                    title:"投票成功！",
                    icon:"success",
                    duration:800
                  });
                  self.setData({flag:1});
             }
             else{
              wx.showToast({
                    title:"投票失败！",
                    duration:400
                  })
             }
           }
         })

    }
        




    }
        

  },
  getSave:function(){
      wx.navigateTo({
        url: '../researchContent/researchContent?id='+this.data.voteId
      })
  }
  


})