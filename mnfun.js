/**
 * Created by Administrator on 2017/4/29.
*/
// use case: send short message by DingDongYun
// var myfun=require('./mnfun');
// var strMobile = "18607558188"; //tel的mobile字段的内容
// var strRand = Math.round(Math.random()*1000000);  //url中的random字段的值
// myfun.varificationCode(strMobile,strRand);

// Send short message to mobile phone by DingDongYun
var varificationCode= require('./mnfun/sendSmsDingdongyun');
exports.varificationCode=varificationCode;


// Send short message to moblie phone by Qcloud.com
var varificationCodeQQ= require('./mnfun/sendSmsQcloud');
exports.varificationCodeQQ=varificationCodeQQ;


// insert Data (format:JSON) to MongoDb file.
var insertDataToDb= require('./mnfun/insertDataToDb');
exports.insertDataToDb=insertDataToDb;

// use case:
// var myfun=require('../public/javascripts/mnfun');
// var fetchData= new myfun.fetchDataFromDb();
var fetchDataFromDb= require('./mnfun/fetchDataFromDb');
exports.fetchDataFromDb=fetchDataFromDb;

// adjust the user client isn't mobile client.
var isMoblieClient=require('./mnfun/isMobileClient');
exports.isMobileClient=isMoblieClient;