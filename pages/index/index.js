Page({
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

  navigateToShowPage:function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../show/show?id=${id}`,
    })

  },
  
  onLoad: function () {
    this.getDataFromBaasPost()


  },


})