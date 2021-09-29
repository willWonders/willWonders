let NativeBridge = require('./nativeBridge')
let msbs = require('./msbs')
;(function (window) {
	function WondersApp() {}
	var u = navigator.userAgent.toLowerCase()
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1)
		var vars = query.split('&')
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=')
			if (pair[0] == variable) {
				return pair[1]
			}
		}
		return false
	}

	// 环境判断
	WondersApp.prototype.QuickVersion = {
		isWeixin: u.indexOf('micromessenger') != -1,
		isHainanAndroid: u.indexOf('android_health_hainan') != -1,
		isHainanIOS: u.indexOf('ios_health_hainan') != -1,
		isHainan: u.indexOf('ios_health_hainan') != -1 || u.indexOf('android_health_hainan') != -1,
		isMSBS: getQueryVariable('source') == 'hnymt' || localStorage.source == 'hnymt'
	}
	WondersApp.prototype.wxPay = function (data, callback) {
  		if (this.QuickVersion.isHainan) {
  		 NativeBridge.wxPay(data, callback)
 		 } else {
   		console.log('请在APP端调用')
  		}
 	}
	//二维码
	WondersApp.prototype.qrCodeScan = function (data, callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.qrCodeScan(data, callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.qrCodeScan(data, callback)
		}
	}

	WondersApp.prototype.callPhone = function (data, callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.callPhone(data, callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.callPhone(data, callback)
		}
	}
	WondersApp.prototype.getVersion = function (data) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.getVersion(data)
		} else if (this.QuickVersion.isMSBS) {
			msbs.getVersion(data)
		}
	}
	WondersApp.prototype.share = function (data) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.share(data)
		} else if (this.QuickVersion.isMSBS) {
			msbs.share(data)
		}
	}
	WondersApp.prototype.getLocation = function (data, callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.getLocation(data, callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.getLocation(data, callback)
		}
	}
	WondersApp.prototype.chooseImage = function (data, callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.chooseImage(data, callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.chooseImage(data, callback)
		}
	}
	WondersApp.prototype.camera = function (data, callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.camera(data, callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.camera(data, callback)
		}
	}
	WondersApp.prototype.nativeStorage = function (data, callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.nativeStorage(data, callback)
		} else {
			let key = data.key
			var result = {
				code: 102,
				msg: '未定义方法'
			}
			if (data.method == 'get') {
				result = {
					code: 0,
					msg: '',
					[key]: localStorage[key]
				}
			} else if (data.method == 'set') {
				localStorage[key] = data.value
				result = {
					code: 0,
					msg: ''
				}
			} else if (data.method == 'delete') {
				localStorage.removeItem(key)
				result = {
					code: 0,
					msg: ''
				}
			}
			callback(result)
		}
	}
	WondersApp.prototype.nativeVioce = function (callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.nativeVioce(callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.nativeVioce(callback)
		}
	}
	WondersApp.prototype.nativeSearchVal = function (data) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.nativeSearchVal(data)
		} else if (this.QuickVersion.isMSBS) {
			msbs.nativeSearchVal(data)
		}
	}
	WondersApp.prototype.authentication = function (data, callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.authentication(data, callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.authentication(data, callback)
		}
	}
	WondersApp.prototype.authType = function (callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.authType(callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.authType(callback)
		}
	}
	WondersApp.prototype.rotate = function (data) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.rotate(data)
		} else if (this.QuickVersion.isMSBS) {
			msbs.rotate(rotate)
		}
	}
	WondersApp.prototype.download = function (data) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.download(data)
		} else if (this.QuickVersion.isMSBS) {
			msbs.download(data)
		}
	}

	WondersApp.prototype.cacheSize = function (callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.cacheSize(callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.cacheSize(callback)
		}
	}
	WondersApp.prototype.clearCache = function (callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.clearCache(callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.clearCache(callback)
		}
	}
	WondersApp.prototype.newMessage = function (data, callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.newMessage(data, callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.newMessage(data, callback)
		}
	}
	WondersApp.prototype.video = function (data, callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.video(data, callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.video(data, callback)
		}
	}
	WondersApp.prototype.refreshToken = function (data, callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.refreshToken(data, callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.refreshToken(data, callback)
		}
	}
	WondersApp.prototype.changeRole = function () {
		if (this.QuickVersion.isHainan) {
			NativeBridge.changeRole()
		} else if (this.QuickVersion.isMSBS) {
			msbs.changeRole()
		}
	}
	WondersApp.prototype.logout = function () {
		if (this.QuickVersion.isHainan) {
			NativeBridge.logout()
		} else if (this.QuickVersion.isMSBS) {
			msbs.logout()
		}
	}
	WondersApp.prototype.tabConfig = function (data) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.tabConfig(data)
		} else if (this.QuickVersion.isMSBS) {
			msbs.tabConfig(data)
		}
	}
	//头部设置
	WondersApp.prototype.setHeader = function (data) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.setHeader(data)
		} else if (this.QuickVersion.isMSBS) {
			window.OnecodeJSBridge.call(
				'appNavBar',
				{
					show: false
				},
				function (result) {
					console.log(result)
				}
			)
		}
	}
	WondersApp.prototype.onVisible = function (callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.onVisible(callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.onVisible(callback)
		}
	}
	WondersApp.prototype.onInvisible = function (callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.onInvisible(callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.onInvisible(callback)
		}
	}
	WondersApp.prototype.onDestory = function (callback) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.onDestory(callback)
		} else if (this.QuickVersion.isMSBS) {
			msbs.onDestory(callback)
		}
	}
	WondersApp.prototype.toNative = function (
		router,
		nativeData,
		refreshUrl,
		animate,
		hasNavigation,
		float
	) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.toNative(router, nativeData, refreshUrl, animate, hasNavigation, float)
		} else if (this.QuickVersion.isMSBS) {
		}
	}
	WondersApp.prototype.toBack = function (url, nativeData, refreshUrl, hasNavigation, float) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.toBack(url, nativeData, refreshUrl, hasNavigation, float)
		} else {
			if (url) {
				window.location.href = url
			} else {
				window.history.back(-1)
			}
		}
	}
	WondersApp.prototype.toPage = function (url, nativeData, hasNavigation, float) {
		if (this.QuickVersion.isHainan) {
			NativeBridge.toPage(url, nativeData, hasNavigation, float)
		} else {
			window.location.href = url
		}
	}

	var wondersApp = new WondersApp()
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = wondersApp
	} else {
		window.WondersApp = wondersApp
	}
})(window)
