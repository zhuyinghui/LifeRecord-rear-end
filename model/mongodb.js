//数据库连接
const mongoose = require("mongoose");
//MongoDB数据库的数据类型
//String/Number/Date/Buffer/Boolean/Mixed/ObjectId/Array
class Mongodb {
    connect(){
        mongoose.connect("mongodb://127.0.0.1:27017/LifeRecord",{ useNewUrlParser: true })
            .then(
                ()=>{
                    console.log('数据库连接成功');
                },
                err=>{
                    console.log('数据库连接失败',err);
                }
            )
    }
}
let db=new Mongodb();
module.exports = db;