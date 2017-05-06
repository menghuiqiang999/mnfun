/**
 * Created by Administrator on 2017/4/29.
 */
// use case:
// var myfun=require('../public/javascripts/mnfun');
// var mycollection="pagedata";
// myfun.insertDataToDb(mycollection,pagedata);
// require by mnfun.js
// var insertDataToDb= require('./mnfun/insertDataToDb');
// exports.insertDataToDb=insertDataToDb;

// 通用插入数据库函数，需要提供：
// mycollection： collection名
// data:需要插入的数据
function insertDataToDb(mycollection,data){
    var MongoClient = require('mongodb').MongoClient;
    // the Db is fixed
    var DB_CONN_STR = 'mongodb://localhost:27017/mobileweb'; // # 数据库为 mobileweb

    var insertData = function(db,mycollection,callback) {
        //连接到表 site
        var collection = db.collection(mycollection);
        //插入数据

        collection.insert(data, function(err, result) {
            if(err)
            {
                console.log('插入数据出错：'+ err);
                return;
            }
            callback(result);
        });
    };

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("插入数据库连接成功！");
        insertData(db,mycollection,function(result) {
            // console.log(result);
            db.close();
        });
    });

};
module.exports =insertDataToDb;
