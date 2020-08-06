// pages/post/post.js
Page({

  /**
   * Page initial data
   */
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
         success (res) {
          if (res.confirm) {
          } else if (res.cancel) {
            wx.navigateBack({
            })
          }}
       })
   })

  },

  userLogout: function () {
    wx.BaaS.auth.logout().then(res => {
      wx.setStorageSync('currentUser', null);
      this.setData({currentUser: null});
    });
  }, 


 
  onLoad: function () {
    this.checkCurrentUser()

  },

})