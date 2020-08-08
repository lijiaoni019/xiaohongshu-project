Page({

data: {
  nbFrontColor: '#000000',
  nbBackgroundColor: '#ffffff',

},

fetchCupcake: function (id) {
  let Cupcake = new wx.BaaS.TableObject("cupcake");
  Cupcake.get(id).then(res => {
    let cupcake = res.data;
    let currentLike = res.data.like;
    let favorite = res.data.favorite
    this.setData({cupcake});
    this.setData({favorite});
    console.log(favorite)
    this.setData({currentLike})
    this.setData({nbLoading:false});


  })

},

countLike: function(){
  let id = this.data.cupcake.id
  console.log(id)
  let favorite = this.data.favorite
  let currentLike = this.data.currentLike
  if(favorite){
    currentLike = currentLike - 1;
    favorite = false
    this.setData({currentLike})
    this.setData({favorite})
    console.log(this.data.favorite)
    let Cupcake = new wx.BaaS.TableObject("cupcake")
    console.log(Cupcake)
    let cupcake = Cupcake.getWithoutData(id)
    console.log(cupcake)
    cupcake.set('like', currentLike)
    cupcake.set('favorite', favorite)
    cupcake.update().then(res => {
      console.log(res)
    })
  }else{
    currentLike = currentLike + 1;
    favorite = true
    this.setData({currentLike})
    this.setData({favorite})
    let Cupcake = new wx.BaaS.TableObject("cupcake")
    let cupcake = Cupcake.getWithoutData(id)
    console.log(cupcake)
    cupcake.set('like', currentLike)
    cupcake.set('favorite', favorite)
    cupcake.update().then(res => {
      console.log(res)
    })

  }

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