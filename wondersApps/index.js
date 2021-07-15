;(function (window) {
  function WondersApp() {
    var that = this
    this.indexCount = 1000
    this.callAppMap = {}
    this.onPressBackKey = null
    window.executeJS = function (callAppIndex, stringResult) {
      that.appCall(callAppIndex, stringResult)
    }
  }
  var u = navigator.userAgent.toLowerCase()
  WondersApp.prototype.QuickVersion = {
    // isWeixin: u.indexOf('micromessenger') != -1,
    // isApp: u.indexOf('android_smartidata') != -1,
    // isIOSApp: u.indexOf('ios_smartidata') != -1
    isWeixin: u.indexOf('micromessenger') != -1,
    isApp: u.indexOf('android_health_hainan') != -1,
    isIOSApp: u.indexOf('ios_health_hainan') != -1,
  }
  WondersApp.prototype.getAppIndex = function (name) {
    let thisIndex = this.indexCount++
    let numString = name + thisIndex.toString()
    return numString
  }
  WondersApp.prototype.callApp = function (params) {
    if (this.QuickVersion.isIOSApp) {
      window.webkit.messageHandlers.nativePermission.postMessage(
        JSON.stringify(params),
      )
    } else if (this.QuickVersion.isApp) {
      window.WDAndroid.nativePermission(JSON.stringify(params))
    } else {
      console.log('h5')
    }
  }
  var regNumber = /\d+/
  WondersApp.prototype.appCall = function (callAppIndex, stringResult) {
    if (this.callAppMap[callAppIndex]) {
      this.callAppMap[callAppIndex](stringResult)
       if (
        regNumber.test(callAppIndex) &&
        callAppIndex.indexOf('header') == -1
      ) {
        this.callAppMap[callAppIndex] = null
        delete this.callAppMap[callAppIndex]
      } else {
        // console.log('不移出')
      }
    }
  }
  WondersApp.prototype.qrCodeScan = function (data, callback) {
    var appIndex = this.getAppIndex('qrCodeScan')
    if (callback) {
      this.callAppMap[appIndex] = callback
      // console.log(this.callAppMap);
    }
    let params = { type: 'qrCodeScan', params: data, callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.callPhone = function (data, callback) {
    var appIndex = this.getAppIndex('callPhone')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'phone', params: data, callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.getVersion = function (callback) {
    var appIndex = this.getAppIndex('getVersion')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'version', callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.share = function (data, callback) {
    var appIndex = this.getAppIndex('share')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'share', params: data, callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.getLocation = function (data, callback) {
    var appIndex = this.getAppIndex('getLocation')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'location', params: data, callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.chooseImage = function (data, callback) {
    var appIndex = this.getAppIndex('chooseImage')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = {
      type: 'photoLibrary',
      params: data,
      callBackMethod: appIndex,
    }
    this.callApp(params)
  }
  WondersApp.prototype.camera = function (callback) {
    var appIndex = this.getAppIndex('camera')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'camera', callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.nativeStorage = function (data, callback) {
    var appIndex = this.getAppIndex('nativeStorage')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = {
      type: 'nativeStorage',
      params: data,
      callBackMethod: appIndex,
    }
    this.callApp(params)
  }
  WondersApp.prototype.nativeVioce = function (callback) {
    var appIndex = this.getAppIndex('nativeVioce')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'voice', callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.nativeSearchVal = function (data) {
    let params = { type: 'searchContent', params: data }
    this.callApp(params)
  }
  WondersApp.prototype.authentication = function (data, callback) {
    var appIndex = this.getAppIndex('authentication')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = {
      type: 'authentication',
      params: data,
      callBackMethod: appIndex,
    }
    this.callApp(params)
  }
  WondersApp.prototype.authType = function (callback) {
    var appIndex = this.getAppIndex('authType')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'authType', callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.rotate = function (data) {
    let params = { type: 'rotate', params: data }
    this.callApp(params)
  }
  WondersApp.prototype.login = function (data, callback) {
    var appIndex = this.getAppIndex('login')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'login', params: data, callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.download = function (data) {
    let params = { type: 'download', params: data }
    this.callApp(params)
  }
  WondersApp.prototype.cacheSize = function (callback) {
    var appIndex = this.getAppIndex('cacheSize')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'cacheSize', callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.clearCache = function (callback) {
    var appIndex = this.getAppIndex('clearCache')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'clearCache', callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.newMessage = function (data, callback) {
    var appIndex = this.getAppIndex('newMessage')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'newMessage', params: data, callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.video = function (data, callback) {
    var appIndex = this.getAppIndex('video')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = { type: 'video', params: data, callBackMethod: appIndex }
    this.callApp(params)
  }
  WondersApp.prototype.bluetoothDevice = function (data, callback) {
    var appIndex = this.getAppIndex('bluetoothDevice')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = {
      type: 'bluetoothDevice',
      params: data,
      callBackMethod: appIndex,
    }
    this.callApp(params)
  }
  WondersApp.prototype.refreshToken = function (data, callback) {
    var appIndex = this.getAppIndex('refreshToken')
    if (callback) {
      this.callAppMap[appIndex] = callback
    }
    let params = {
      type: 'refreshToken',
      params: data,
      callBackMethod: appIndex,
    }
    this.callApp(params)
  }
  WondersApp.prototype.tabConfig = function (data) {
    let params = { type: 'tabConfig', params: data }
    this.callApp(params)
  }
  WondersApp.prototype.setHeader = function (data) {
     if (data['right'] && data['right'].length > 0) {
      let rightLenth = data['right'].length
      for (let i = 0, len = rightLenth; i < len; i++) {
        let appIndex = 'header' + JSON.stringify(data['right'][i])
        this.callAppMap[appIndex] = data['right'][i]['callBackMethod']
        data['right'][i]['callBackMethod'] = appIndex
      }
    }
    if (data['left'] && data['left'].length > 0) {
      let leftLenth = data['left'].length
      for (let j = 0, len = leftLenth; j < len; j++) {
        let appIndex = 'header' + JSON.stringify(data['left'][j])
        this.callAppMap[appIndex] = data['left'][j]['callBackMethod']
        data['left'][j]['callBackMethod'] = appIndex
      }
    }
    if (this.QuickVersion.isIOSApp) {
      window.webkit.messageHandlers.setHeader.postMessage(JSON.stringify(data))
    } else if (this.QuickVersion.isApp) {
      window.WDAndroid.setHeader(JSON.stringify(data))
    }
  }
  WondersApp.prototype.tabConfig = function (data) {
    if (this.QuickVersion.isIOSApp) {
      window.webkit.messageHandlers.setHeader.postMessage(JSON.stringify(data))
    } else if (this.QuickVersion.isApp) {
      window.WDAndroid.setHeader(JSON.stringify(data))
    }
  }
  WondersApp.prototype.onVisible = function (onVisible) {
    if (this.QuickVersion.isIOSApp || this.QuickVersion.isApp) {
      this.callAppMap['onVisible'] = onVisible
    }
  }
  WondersApp.prototype.onInvisible = function (onInvisible) {
    if (this.QuickVersion.isIOSApp || this.QuickVersion.isApp) {
      this.callAppMap['onInvisible'] = onInvisible
    }
  }
  WondersApp.prototype.onDestory = function (onDestory) {
    if (this.QuickVersion.isIOSApp || this.QuickVersion.isApp) {
      this.callAppMap['onDestory'] = onDestory
    }
  }
  WondersApp.prototype.toNative = function (
    router,
    nativeData,
    refreshUrl,
    animate,
    hasNavigation,
    float,
  ) {
    var params = {
      type: 'Native',
      toPage: router,
      params: nativeData != undefined ? nativeData : {},
      refreshUrl: refreshUrl != undefined ? refreshUrl : '*',
      animate: animate == undefined ? 'push' : animate,
      hasNavigation: hasNavigation || 'true',
      float: float || 'false',
    }
    if (this.QuickVersion.isIOSApp) {
      window.webkit.messageHandlers.forward.postMessage(JSON.stringify(params))
    } else if (this.QuickVersion.isApp) {
      window.WDAndroid.forward(JSON.stringify(params))
    }
  }
  WondersApp.prototype.toBack = function (
    url,
    nativeData,
    refreshUrl,
    hasNavigation,
    float,
  ) {
    let params = {
      type: 'H5',
      toPage: url || '',
      params: nativeData != undefined ? nativeData : {},
      refreshUrl: refreshUrl != undefined ? refreshUrl : '*',
      hasNavigation: hasNavigation || 'true',
      float: float || 'false',
      animate: 'pop',
    }
    if (this.QuickVersion.isIOSApp) {
      window.webkit.messageHandlers.forward.postMessage(JSON.stringify(params))
    } else if (this.QuickVersion.isApp) {
      window.WDAndroid.forward(JSON.stringify(params))
    }
  }
  WondersApp.prototype.toPage = function (
    url,
    nativeData,
    refreshUrl,
    hasNavigation,
    float,
  ) {
    console.log('进入原生跳转')
    let params = {
      type: 'H5',
      toPage: url,
      params: nativeData != undefined ? nativeData : {},
      refreshUrl: refreshUrl != undefined ? refreshUrl : '*',
      hasNavigation: hasNavigation || 'true',
      float: float || 'false',
      animate: 'push',
    }
    if (this.QuickVersion.isIOSApp) {
      console.log('isIOSApp')
      window.webkit.messageHandlers.forward.postMessage(JSON.stringify(params))
    } else if (this.QuickVersion.isApp) {
      console.log('isApp')
      window.WDAndroid.forward(JSON.stringify(params))
    } else {
      console.log('H5')
    }
  }
  var wondersApp = new WondersApp()
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = wondersApp
  } else {
    window.WondersApp = wondersApp
  }
})(window)
