/**
 * Created by Administrator on 2017/4/29.
*/

// use case: send short message by DingDongYun
// var myfun=require('./mnfun');
// var strMobile = "18607558188"; //tel的mobile字段的内容
// var strRand = Math.round(Math.random()*1000000);  //url中的random字段的值
// myfun.varificationCode(strMobile,strRand);

// by mnfun.js
//var varificationCode= require('./mnfun/sendSmsDingdongyun');

//exports.varificationCode=varificationCode;



var varificationCode=function(mobile,strRand) {
    var https = require('https');
    var qs = require('querystring');
    //修改为您的apikey. apikey可在官网（https://www.dingdongcloud.com)登录后获取
    var apikey = 'f9202e47c827b8d20e89409dda4bcdcb';

    //验证码内容
    var contentyzm = "【月光葡萄酒】您的验证码是" + strRand + "，请在10分钟内输入。请勿告诉其他人。"
    //语音验证码内容,必须纯数字4-6位
    //var contentyyyzm = "123456"
    //通知内容
    //var contenttz ="【叮咚云】您已成功注册叮咚云，请联系支持人员安排对接测试。"
    //营销内容，短信末尾必须带有“退订回T”
    //var contentyx ="【叮咚云】您已成功注册叮咚云，请联系支持人员安排对接测试。退订回t"

    // 获取user信息url
    var url_get_user = "/v1/sms/userinfo";
    // 发送验证码url
    var url_send_sms_yzm = "/v1/sms/sendyzm";
    // 发送语音验证码url
    //var url_send_sms_yyyzm  = "/v1/sms/sendyyyzm";
    // 发送通知url
    var url_send_sms_tz = "/v1/sms/sendtz";
    // 发送营销url
    var url_send_sms_yx = "/v1/sms/sendyx";

    var sms_host = 'api.dingdongcloud.com';


    //获取用户信息
    //get_user_info(url_get_user,apikey);

    //发送验证码
    send_sms(url_send_sms_yzm, apikey, mobile, contentyzm);

    //发送语音验证码
    //send_sms(url_send_sms_yyyzm,apikey,mobile,contentyyyzm);
    //发送通知
    //send_sms(url_send_sms_tz,apikey,mobile,contenttz);
    //发送营销
    //send_sms(url_send_sms_yx,apikey,mobile,contentyx);


    function get_user_info(uri, apikey) {
        var post_data = {
            'apikey': apikey,
        };//这是需要提交的数据
        var postdata = qs.stringify(post_data);
        post(uri, postdata, sms_host);
    };

    function send_sms(uri, apikey, mobile, content) {
        var post_data = {
            'apikey': apikey,
            'mobile': mobile,
            'content': content,
        };//这是需要提交的数据
        var postdata = qs.stringify(post_data);
        post(uri, postdata, sms_host);
    };
    function post(uri, content, host) {
        var options = {
            hostname: host,
            port: 443,
            path: uri,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Content-Length': content.length
            }
        };
        var req = https.request(options, function (res) {
            //console.log('STATUS: ' + res.statusCode);
            //console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });
        //console.log(content);
        req.write(content);

        req.end();

    };
};
module.exports= varificationCode;