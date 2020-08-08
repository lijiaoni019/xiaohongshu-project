// pages/user/user.js
Page({

 
  data: {
    check:1,
  },

  checkCurrentUser: function () {
    let currentUser = wx.getStorageSync('currentUser')
    if (currentUser){
      this.setData({currentUser})
      this.setData({user:true})
    }else {
      this.setData({user:true})

    }


  },

  userLogin: function (data) {
      wx.BaaS.auth.loginWithWechat(data).then(currentUser => {
      currentUser = currentUser.toJSON()
      this.setData({currentUser})
      wx.setStorageSync('currentUser',currentUser)
      }, err => {
       wx.showModal({
         cancelColor: 'cancelColor',
         title: 'Authorization Needed for Access',
         
       })
   })

  },

  userLogout: function () {
    wx.BaaS.auth.logout().then(res => {
      wx.setStorageSync('currentUser', null);
      this.setData({currentUser: null});
    });
  }, 

  fetchPost: function () {
    let id = this.data.currentUser.id
    let Post = new wx.BaaS.TableObject("cupcake");
    let query = new wx.BaaS.Query()
    Post.setQuery(query).orderBy(['-like']).limit(4).find().then(res => {
      console.log(res)
      let bar = res.data.objects
      this.setData({bar})
      console.log(this.data)
    })

  },

  fetchFavorites: function () {
    let Post = new wx.BaaS.TableObject("cupcake");
    let query = new wx.BaaS.Query()
    query.compare('favorite', '=', true)
    Post.setQuery(query).orderBy(['-created_at']).find().then(res => {
      console.log(res)
      let favorites = res.data.objects
      this.setData({favorites})
      console.log(this.data)
    })
  },

  navigateToShowPage:function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../show/show?id=${id}`,
    })

  },

  checkMyPost: function(){
    this.setData({check:1})

  },
  checkMyComments:function() {
    this.setData({check:2})
  },
  checkMyFavorites:function(){
    this.setData({check:3})
  },



  onLoad: function (options) {
    this.checkCurrentUser()
    this.fetchPost()
    this.fetchFavorites()
  },


})