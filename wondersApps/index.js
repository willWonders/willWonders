let NativeBridge=require('./nativeBridge');let msbs=require('./msbs');let wondersWeChat=require('./wondersWeChat');(function(window){function WondersApp(){};var u=navigator.userAgent.toLowerCase();function getQueryVariable(variable){var query=window.location.href.split('?');var vars=query[1]&&query[1].split('&');if(vars&&vars.length){for(var i=0;i<vars.length;i++){var pair=vars[i].split('=');if(pair[0]==variable){return pair[1]}}}return false};function setNativeStorage(data){let key=data.key;if(data.method=='set'){localStorage[key]=data.value}else if(data.method=='delete'){localStorage.removeItem(key)}};WondersApp.prototype.initUrlStorage=function(){let weiXinDATA=JSON.parse(decodeURIComponent(getQueryVariable('weiXinDATA')));let wxData=null;if(weiXinDATA){if(typeof weiXinDATA==='string'){weiXinDATA=JSON.parse(weiXinDATA)}if(weiXinDATA&&weiXinDATA.length){weiXinDATA.forEach((element)=>{wxData={key:element['key'],value:element['value'],method:element['method']?element['method']:'set',};setNativeStorage(wxData)})}}};function sourceIndexOf(){var source=getQueryVariable('source');source=source.toString();return source.indexOf('hnymt')!=-1};WondersApp.prototype.QuickVersion={init:WondersApp.prototype.initUrlStorage(),isWeixin:u.indexOf('micromessenger')!=-1,isHainanAndroid:u.indexOf('android_health_hainan')!=-1,isHainanIOS:u.indexOf('ios_health_hainan')!=-1,isHainan:u.indexOf('ios_health_hainan')!=-1||u.indexOf('android_health_hainan')!=-1,isMSBS:sourceIndexOf()||localStorage.source=='hnymt',};WondersApp.prototype.showMapRoute=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.showMapRoute(data,callback)}else if(this.QuickVersion.isMSBS){msbs.showMapRoute(data,callback)}else if(this.QuickVersion.isWeixin){wondersWeChat.showMapRoute(data,callback)}else{window.location.href='https://uri.amap.com/navigation?from='+data.sLon+','+data.sLat+',当前位置&to='+data.tLon+','+data.tLat+','+data.sName+'&src=mypage'}};WondersApp.prototype.wxPay=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.wxPay(data,callback)}else if(this.QuickVersion.isWeixin){wondersWeChat.wxPay(data,callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.qrCodeScan=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.qrCodeScan(data,callback)}else if(this.QuickVersion.isWeixin){wondersWeChat.wondersWxJsSDKApi('qrCodeScan',data,callback)}else if(this.QuickVersion.isMSBS){msbs.qrCodeScan(data,callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.callPhone=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.callPhone(data,callback)}else{wondersWeChat.callPhone(data,callback)}};WondersApp.prototype.getVersion=function(data){if(this.QuickVersion.isHainan){NativeBridge.getVersion(data)}else if(this.QuickVersion.isMSBS){msbs.getVersion(data)}else{console.log('请在APP端调用')}};WondersApp.prototype.share=function(data){if(this.QuickVersion.isHainan){NativeBridge.share(data)}else if(this.QuickVersion.isMSBS){msbs.share(data)}else{console.log('请在APP端调用')}};WondersApp.prototype.getLocation=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.getLocation(data,callback)}else if(this.QuickVersion.isWeixin){wondersWeChat.wondersWxJsSDKApi('getLocation',data,callback)}else if(this.QuickVersion.isMSBS){msbs.getLocation(data,callback)}else{var url='https://webapi.amap.com/maps?v=1.4.15&key=863ce4441eb85cb737d36126aac8227d&callback=onMapLoad';var jsapi=document.createElement('script');jsapi.charset='utf-8';jsapi.src=url;document.head.appendChild(jsapi);console.log('获取经纬度..');window.onMapLoad=function(){AMap.plugin('AMap.Geolocation',function(){var geolocation=new AMap.Geolocation({enableHighAccuracy:true,timeout:10000,buttonOffset:new AMap.Pixel(10,20),zoomToAccuracy:true,buttonPosition:'RB',});geolocation.getCurrentPosition();AMap.event.addListener(geolocation,'complete',onComplete);AMap.event.addListener(geolocation,'error',onError);function onComplete(data){console.log('data是具体的定位信息',data.position);var backData={code:0,msg:'',longitude:data.position.lng,latitude:data.position.lat,};console.log('backData',backData);callback(backData)}function onError(data){console.log('定位出错',data)}})}}};WondersApp.prototype.chooseImage=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.chooseImage(data,callback)}else if(this.QuickVersion.isWeixin){wondersWeChat.wondersWxJsSDKApi('chooseImage',data,callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.camera=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.camera(data,callback)}else if(this.QuickVersion.isWeixin){wondersWeChat.wondersWxJsSDKApi('camera',data,callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.nativeStorage=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.nativeStorage(data,callback)}else{let key=data.key;var result={code:102,msg:'未定义方法',};if(data.method=='get'){result={code:0,msg:'',[key]:localStorage[key],}}else if(data.method=='set'){localStorage[key]=data.value;result={code:0,msg:'',}}else if(data.method=='delete'){localStorage.removeItem(key);result={code:0,msg:'',}}callback(result)}};WondersApp.prototype.nativeVioce=function(callback){if(this.QuickVersion.isHainan){NativeBridge.nativeVioce(callback)}else if(this.QuickVersion.isMSBS){msbs.nativeVioce(callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.nativeSearchVal=function(data){if(this.QuickVersion.isHainan){NativeBridge.nativeSearchVal(data)}else if(this.QuickVersion.isMSBS){msbs.nativeSearchVal(data)}else{console.log('请在APP端调用')}};WondersApp.prototype.authentication=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.authentication(data,callback)}else if(this.QuickVersion.isMSBS){msbs.authentication(data,callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.authType=function(callback){if(this.QuickVersion.isHainan){NativeBridge.authType(callback)}else if(this.QuickVersion.isMSBS){msbs.authType(callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.rotate=function(data){if(this.QuickVersion.isHainan){NativeBridge.rotate(data)}else if(this.QuickVersion.isMSBS){msbs.rotate(data)}else{console.log('请在APP端调用')}};WondersApp.prototype.download=function(data){if(this.QuickVersion.isHainan){NativeBridge.download(data)}else if(this.QuickVersion.isMSBS){msbs.download(data)}else{console.log('请在APP端调用')}};WondersApp.prototype.cacheSize=function(callback){if(this.QuickVersion.isHainan){NativeBridge.cacheSize(callback)}else if(this.QuickVersion.isMSBS){msbs.cacheSize(callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.clearCache=function(callback){if(this.QuickVersion.isHainan){NativeBridge.clearCache(callback)}else if(this.QuickVersion.isMSBS){msbs.clearCache(callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.newMessage=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.newMessage(data,callback)}else if(this.QuickVersion.isMSBS){msbs.newMessage(data,callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.video=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.video(data,callback)}else if(this.QuickVersion.isMSBS){msbs.video(data,callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.refreshToken=function(data,callback){if(this.QuickVersion.isHainan){NativeBridge.refreshToken(data,callback)}else if(this.QuickVersion.isMSBS){msbs.refreshToken(data,callback)}else{console.log('请在APP端调用')}};WondersApp.prototype.changeRole=function(){if(this.QuickVersion.isHainan){NativeBridge.changeRole()}else if(this.QuickVersion.isMSBS){msbs.changeRole()}else{console.log('请在APP端调用')}};WondersApp.prototype.logout=function(){if(this.QuickVersion.isHainan){NativeBridge.logout()}else if(this.QuickVersion.isMSBS){msbs.logout()}else{console.log('请在APP端调用')}};WondersApp.prototype.tabConfig=function(data){if(this.QuickVersion.isHainan){NativeBridge.tabConfig(data)}else if(this.QuickVersion.isMSBS){msbs.tabConfig(data)}else{console.log('请在APP端调用')}};WondersApp.prototype.setHeader=function(data){if(this.QuickVersion.isHainan){NativeBridge.setHeader(data)}else if(this.QuickVersion.isMSBS){window.OnecodeJSBridge.call('appNavBar',{show:false,},function(result){console.log(result)},)}else{console.log('请在APP端调用')}};WondersApp.prototype.onVisible=function(callback){if(this.QuickVersion.isHainan){NativeBridge.onVisible(callback)}};WondersApp.prototype.onInvisible=function(callback){if(this.QuickVersion.isHainan){NativeBridge.onInvisible(callback)}};WondersApp.prototype.onDestory=function(callback){if(this.QuickVersion.isHainan){NativeBridge.onDestory(callback)}};WondersApp.prototype.toNative=function(router,nativeData,refreshUrl,animate,hasNavigation,float,){if(this.QuickVersion.isHainan){NativeBridge.toNative(router,nativeData,refreshUrl,animate,hasNavigation,float,)}};WondersApp.prototype.toBack=function(url,nativeData,refreshUrl,hasNavigation,float,){if(this.QuickVersion.isHainan){NativeBridge.toBack(url,nativeData,refreshUrl,hasNavigation,float)}else{if(url){window.location.href=url}else{window.history.back(-1)}}};WondersApp.prototype.toPage=function(url,nativeData,hasNavigation,float,){if(this.QuickVersion.isHainan){NativeBridge.toPage(url,nativeData,hasNavigation,float)}else{window.location.href=url}};var wondersApp=new WondersApp();if(typeof module!=='undefined'&&typeof module.exports!=='undefined'){module.exports=wondersApp}else{window.WondersApp=wondersApp}})(window);