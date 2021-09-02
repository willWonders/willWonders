// var localJs = document.createElement('script')
// localJs.setAttribute(
// 	'src',
// 	'https://szhn-onecode-bucket.oss-cn-shenzhen.aliyuncs.com/js/onecodeN-v1.2.0.js'
// )
// document.head.appendChild(localJs)
require('./OnecodeJSBridge.js')
;(function (window) {
	function msbs() {}
	var u = navigator.userAgent.toLowerCase()
	msbs.prototype.qrCodeScan = function (data, callback) {
		OnecodeJSBridge.call('openScan', {}, function (result) {
			//result数据格式: // { success: true, content: '上传成功'} //为ture时，content为扫码内容，为false时，content为""
			console.log(result)
			let backResult = {
				code: 0,
				msg: '',
				qrcode: result.content
			}
			callback(backResult)
		})
	}
	msbs.prototype.getLocation = function (data, callback) {
		OnecodeJSBridge.call('getAppLocation', {}, function (result) {
			console.log(result)
			var backResult
			if (result.success == 'true' || result.success == true) {
				backResult = {
					code: 0,
					msg: '',
					longitude: result.lng,
					latitude: result.lat
				}
			} else {
				backResult = {
					code: '1102',
					msg: result['messgae']
				}
			}
			callback(backResult)
		})
	}
	var msbs = new msbs()
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = msbs
	} else {
		window.msbs = msbs
	}
})(window)
