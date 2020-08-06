Page({

data: {
  nbFrontColor: '#000000',
  nbBackgroundColor: '#ffffff',

},

fetchBar: function (id) {
  let Bar = new wx.BaaS.TableObject("bar");
  Bar.get(id).then(res => {
    let bar = res.data;
    this.setData({bar});
    this.setData({nbLoading:false});
  })

},

onLoad: function (options) {
  let id = options.id;
  this.fetchBar(id);
  this.setData({
    nbLoading:true,
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
  })
}, 
})