Page({

  data:{

  },


  getDataFromBaasPost: function () {
    let Bars = new wx.BaaS.TableObject("bar")
    let query = new wx.BaaS.Query()
    Bars.setQuery(query).orderBy('created_at').find().then (res => {
      console.log(res)
      let bars = res.data.objects
      this.setData({bars})
      console.log(this.data)
    })

  },

  checkCurrentUser: function () {
    wx.BaaS.auth.loginWithWechat().then(currentUser => {
    this.setData({currentUser})
  })
},

  countLike: function (e) {
    console.log(e)
    let bar_id = e.currentTarget.dataset.id;
    let currentLike = e.currentTarget.dataset.like;
    let favorite = e.currentTarget.dataset.favorite
    let list = this.data.list
    if(list.includes(bar_id)) {
      favorite = false
      currentLike = currentLike - 1;
      let index = list.indexOf(bar_id)
      list.splice(index,1)
      wx.setStorageSync('list', list)
      // let Bar = this.data.bars.find(Bar => Bar.id == bar_id).update("like",currentLike)
      let Bars = new wx.BaaS.TableObject("bar")
      let bar = Bars.getWithoutData(bar_id)
      bar.set('like', currentLike)
      bar.set('favorite', favorite)
      bar.update().then(res => {
        this.getDataFromBaasPost()
      })}else{
      list.push(bar_id)
      console.log(list)
      wx.setStorageSync('list', list)
      favorite = true
      currentLike = currentLike + 1;
      let Bars = new wx.BaaS.TableObject("bar")
      let bar = Bars.getWithoutData(bar_id)
      bar.set('like', currentLike)
      bar.set('favorite', favorite)
      bar.update().then(res => {
        console.log(res)
        this.getDataFromBaasPost()
      })      
    }
  },



  // showAction: function () {
  //   wx.showActionSheet({
  //     itemList:this.data.itemList,
  //     success (res) {
  //       console.log(res)
  //       let number = res.tapIndex
  //       let name = this.itemList[number]
  //       console.log(name)     
  //     },
  //     fail (res) {
  //       console.log(res.errMsg)
  //     }
  //   })
  // },

  navigateToShowPage:function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../show/show?id=${id}`,
    })

  },

  navigateToPostPage:function (e) {
    let id = this.data.currentUser.id
    wx.navigateTo({
      url: `../post/post?id=${id}`,
    })

  },
  
  onLoad: function () {
    this.getDataFromBaasPost()
    this.checkCurrentUser()
    let list = wx.getStorageSync('list')
    if (list){this.setData({list})}else{
      let list = [];
      this.setData({list})
    }

  },


})