// pages/user/user.js
Page({

 
  data: {

  },

  checkCurrentUser: function () {
    let currentUser = wx.getStorageSync('currentUser')
    if (currentUser){
      this.setData({currentUser})
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

  onLoad: function (options) {
    this.checkCurrentUser()

  },


})