/**
 * Created by Administrator on 2017/4/29.
 */
// use case:

// var myfun=require('../public/javascripts/mnfun');
// var fetchData= new myfun.fetchDataFromDb();

//  require by mnfun.js
// var fetchDataFromDb= require('./mnfun/fetchDataFromDb');
// exports.fetchDataFromDb=fetchDataFromDb;

var fetchDataFromDb=function(){
    var MongoClient = require('mongodb').MongoClient;
    var DB_CONN_STR = 'mongodb://localhost:27017/mobileweb'; // # 数据库为 mobileweb

    var selectData = function(db,mycollection,whereStr,callback) {
        //连接到Collection
        var collection = db.collection(mycollection);
        //查询数据
        collection.find(whereStr).toArray(function(err, result) {
            if(err)
            {
                console.log('取数据出错：'+ err);
                return;
            }
            callback(result);
        });
    };
    // 取出数据库中符合条件的最后一条Document,取出的格式为Jason格式。
    // mycollection:数据库collection名
    // whereStr为查询条件
    // fetchData:需要取回的Document,此为函数回调。
    this.fetchLastOne= function(mycollection,whereStr,fetchData){

        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("取最后一个数据连接成功！");
            selectData(db,mycollection,whereStr,function(result) {
                var i=result.length;
                var mydata=result[i-1];         // 取出最后一个存取的数据，不带中括号
                fetchData(mydata);
                db.close();
            });
        });
    };
    // 取出数据库中符合条件的所有Document,取出的格式为数据，数据里每一个数据为Jason格式。
    // mycollection:数据库collection名
    // whereStr为查询条件
    // fetchData:需要取回的Document,此为函数回调。
    this.fetchAllDoc= function(mycollection,whereStr,fetchData){

        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("取所有数据连接成功！");
            selectData(db,mycollection,whereStr, function(result) {
                var mydata=result;
                fetchData(mydata);
                db.close();
            });
        });
    };
};
module.exports = fetchDataFromDb;