;(function (window) {
  function msbs() {}
  var u = navigator.userAgent.toLowerCase()
  msbs.prototype.qrCodeScan = function (data, callback) {
    OnecodeJSBridge.call('openScan', {}, function (result) {
      //result数据格式: // { success: true, content: '上传成功'} //为ture时，content为扫码内容，为false时，content为""
      console.log(result)
      callback(result)
    })
  }
  var msbs = new msbs()
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = msbs
  } else {
    window.msbs = msbs
  }
})(window)
