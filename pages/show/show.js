
Page({

data: {

},

fetchBar: function (id) {
  let Bar = new wx.BaaS.TableObject("bar");
  Bar.get(id).then(res => {
    let bar = res.data;
    this.setData({bar});
  })

},

onLoad: function (options) {
  let id = options.id;
  this.fetchBar(id);
}
  
})