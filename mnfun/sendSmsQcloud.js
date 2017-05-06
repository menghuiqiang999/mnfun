/**
 * Created by Administrator on 2017/4/29.
*/

// --Send message to Qcloud.coom by mobile number.
// use case    example:
//
// var myfun=require('./mnfun');
// var strMobile = "18607558188"; //tel的mobile字段的内容
// var strRand = Math.round(Math.random()*1000000);  //url中的random字段的值
// myfun.varificationCodeQQ(strMobile,strRand);

// require by mnfun.js
// var varificationCodeQQ= require('./mnfun/sendSmsQcloud');
// exports.varificationCodeQQ=varificationCodeQQ;


var sendSms=function(strMobile,strRand){
    var strAppKey = "e09656801cec01b019fc6b1455977fb3"; //sdkappid对应的appkey，需要业务方高度保密
    var strTime = Math.round((Date.now()/1000)); //unix时间戳
    var sigContent = 'appkey='+ strAppKey +'&random='+ strRand +'&time='+strTime+'&mobile='+strMobile; //加密的明文；
    myEncryptSha256(sigContent,function(sig){
        var data={     //format from the request of Qcloud.com
            "tel": { //如需使用国际电话号码通用格式，如："+8613788888888" ，请使用sendisms接口见下注
                "nationcode": "86", //国家码
                "mobile": strMobile //手机号码
            },
            "type": 0, //0:普通短信;1:营销短信（强调：要按需填值，不然会影响到业务的正常使用）
            "msg": "尊敬的用户：您的校验码："+strRand+"，工作人员不会索取，请勿泄漏。  ", //utf8编码
            "sig": sig, //app凭证，具体计算方式见下注
            "time": strTime, //unix时间戳，请求发起时间，如果和系统时间相差超过10分钟则会返回失败
            "extend": "", //通道扩展码，可选字段，默认没有开通(需要填空)。
            //在短信回复场景中，腾讯server会原样返回，开发者可依此区分是哪种类型的回复
            "ext": "" //用户的session内容，腾讯server回包中会原样返回，可选字段，不需要就填空。
        };
        var msgRequest=JSON.stringify(data);
        //console.log(data);
        //console.log(msgRequest);
        var smsHost="yun.tim.qq.com";
        var sdkAppid="1400029811";                // skdAppid is the id that I apply from Qcloud.com
        var uri="/v5/tlssmssvr/sendsms";        // this uri from the Qcloud.com
        var smsUri=uri+"?sdkappid="+sdkAppid+"&random="+ strRand;    //format is according the request of Qcloud.com
        post(smsUri,msgRequest,smsHost);
    });
};
function myEncryptSha256(str,result){
    var crypto = require('crypto');
    var sha256 = crypto.createHash('sha256');//定义加密方式:sha256不可逆,此处的sha256可以换成任意hash加密的方法名称；
    sha256.update(str);
    var content= sha256.digest('hex');  //加密后的值
    //console.log("加密的结果："+content);
    result(content);
};
function post(uri,content,host){       //this function is the post content to Qcloud.com by the request of Qcloud.com
    var https = require('https');
    var options = {
        hostname: host,
        port: 443,
        path: uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    var req = https.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });
    //console.log(content);
    req.write(content);
    req.end();
};

module.exports= sendSms;
