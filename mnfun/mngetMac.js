/**
 * Created by Administrator on 2017/4/29.
 */
var mygetmac=require('getmac'); // 获取mac地址

// 获取机器ｍａｃ地址
mygetmac.getMac(function(err,macAddress){
    if (err) throw err;

    var mac=macAddress;  // 获取mac地址

    console.log(mac);

});