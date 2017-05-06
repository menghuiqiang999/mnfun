/**
 * Created by Administrator on 2017/5/1.
 */
// use case:
// var mnfun=require('./public/javascripts/mnfun.js');
//mnfun.isMobileClient(req.headers,function(bIsMobileClient){
/*  if ( bIsMobileClient){

    }else {

    };
});
*/
var isMobileClient= function (userAgent,callback){
    // 本函数，输入 req.headers, 输出客户端是不是手机的一个布尔变量值，Ture 为手机。
    var sUserAgent=JSON.stringify(userAgent);

    var iphoneos=/iphone os/i;
    var midp=/midp/i;
    var uc7=/rv:1.2.3.4/im;
    var uc=/ucweb/i;
    var myandroid=/android/i;
    var ce=/windows ce/i;
    var wm=/windows mobile/i;

    var bIsIphoneOs = iphoneos.test(sUserAgent);
    var bIsMidp = midp.test(sUserAgent);
    var bIsUc7 = uc7.test(sUserAgent);
    var bIsUc = uc.test(sUserAgent);
    var bIsAndroid =myandroid.test(sUserAgent);
    var bIsCE = ce.test(sUserAgent);
    var bIsWM =wm.test(sUserAgent);
    var bIsMobileClient=  (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
    callback(bIsMobileClient);
};

module.exports = isMobileClient;