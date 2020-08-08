Page({

data: {
  nbFrontColor: '#000000',
  nbBackgroundColor: '#ffffff',

},

fetchCupcake: function (id) {
  let Cupcake = new wx.BaaS.TableObject("cupcake");
  Cupcake.get(id).then(res => {
    let cupcake = res.data;
    this.setData({cupcake});
    this.setData({nbLoading:false});
  })

},

getUser: function (data) {
  wx.BaaS.auth.getCurrentUser().then(user => {
    this.setData({user});
  })
},

onLoad: function (options) {
  let id = options.id;
  this.fetchCupcake(id);
  this.setData({
    nbLoading:true,
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
  });

  this.getUser();

}, 
})