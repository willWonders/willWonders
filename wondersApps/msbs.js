require('./OnecodeJSBridge.js');(function(window){function msbs(){}msbs.prototype.qrCodeScan=function(data,callback){OnecodeJSBridge.call('openScan',{},function(result){console.log(result);let backResult={code:0,msg:'',qrcode:result.content,};callback(backResult)})};msbs.prototype.showMapRoute=function(data,callback){OnecodeJSBridge.call('showMapRoute',data,function(result){console.log(result);callback(result)})};msbs.prototype.getLocation=function(data,callback){OnecodeJSBridge.call('getAppLocation',{},function(result){console.log(result);var backResult;if(result.success=='true'||result.success==true){backResult={code:0,msg:'',longitude:result.lng,latitude:result.lat,}}else{backResult={code:'1102',msg:result['messgae'],}}callback(backResult)})};var msbs1=new msbs();if(typeof module!=='undefined'&&typeof module.exports!=='undefined'){module.exports=msbs1}else{window.msbs=msbs1}})(window);