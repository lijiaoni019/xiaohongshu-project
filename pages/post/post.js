// pages/post/post.js
Page({

  /**
   * Page initial data
   */
  data: {
    imageArr:[],
    imagePath:[]
  },

  uploadImage: function () {

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res)
        let MyFile = new wx.BaaS.File()
        let fileParams = {filePath: res.tempFilePaths[0]}
        console.log(fileParams)
        let metaData = {categoryName: 'SDK'}
    
        MyFile.upload(fileParams, metaData).then(res => {
          let imageArr = this.data.imageArr
          if(imageArr.length < 5){
          let data = res.data  // res.data 为 Object 类型
          imageArr.push(data)
          this.setData({imageArr})
          console.log(this.data)} else {
            wx.showModal({
              cancelColor: 'cancelColor',
              title: 'The Maximum number of \n image is 5',
              success (res) {
               if (res.confirm) {
               } else if (res.cancel) {
                 wx.navigateBack({
                 })
               }}
            })
          }
        })
      }
    })

  },

  onRate: function(event) {
    console.log(event)
    let number = event.detail.value 
    let rate = parseInt(number) + 1
    this.setData({rate})
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

  submitreview: function (e) {
   console.log(e)
   let user_id = this.data.currentUser.id
   let name = e.detail.value.barName
   let title =  e.detail.value.title
   let text =  e.detail.value.text
   let image = this.data.imageArr[0].file
   let like = this.data.rate
   let favorite = false
   let data = {name, title, text, image, like, favorite, user_id}
   console.log (data)
   wx.showModal({
    cancelColor: 'cancelColor',
    title: 'POST CONFIRM',
    success (res) {
     if (res.confirm) {
      let submit = []
      for(var x in data){submit.push(data[x])}
      console.log(submit)
      if (submit.includes("")||submit.includes(undefined)){
      wx.showModal({
        cancelColor: 'cancelColor',
        title: 'Information Can\'t be Blank',
      })
      }else{
        let Bar = new wx.BaaS.TableObject("bar")
        let MyRecord = Bar.create()
        MyRecord.set(data)
        MyRecord.save().then(res => {
          console.log(res)
          wx.reLaunch({
            url: '../index/index',
            success: function(e){ 
             wx.showToast({
               title: 'POST SUBMITTED',
               contenticon: 'success'
             })}
          })
        } )
      }
  
     }}
   })
  

  },


  onLoad: function () {
    this.checkCurrentUser()

  },

})