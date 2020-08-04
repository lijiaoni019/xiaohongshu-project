App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)

    let clientID = 'bed84580f211868eadc2'  // 应用名称: 大河' first MiniApp
    wx.BaaS.init(clientID)
    wx.BaaS.auth.loginWithWechat()
  
  }
})