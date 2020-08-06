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

fetchComments: function (id) {
  let Comments = new wx.BaaS.TableObject("comments2");
  let query = new wx.BaaS.Query();
  query.compare('bar_id', "=", id);
  Comments.setQuery(query).find().then(res => {
    let comments = res.data.objects;
    this.setData({comments});
  })
},

createComment: function (e){
  let body = e.detail.value.body;
  let bar_id = this.data.bar.id;
  let user_id = this.data.user.id;
  let Comment = new wx.BaaS.TableObject("comments2");
  let MyRecord = Comment.create();
  let data = {body, bar_id, user_id};
  MyRecord.set(data);
  MyRecord.save().then(res => {
    this.fetchComments(bar_id);
  })

},

getUser: function (data) {
  wx.BaaS.auth.getCurrentUser().then(user => {
    this.setData({user});
  })
},

onLoad: function (options) {
  let id = options.id;
  this.fetchBar(id);
  this.setData({
    nbLoading:true,
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
  });

  this.fetchComments(id);
  this.getUser();

}, 
})