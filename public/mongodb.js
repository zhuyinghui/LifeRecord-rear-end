//数据库连接
const mongoose = require("mongoose");
//MongoDB数据库的数据类型
//String/Number/Date/Buffer/Boolean/Mixed/ObjectId/Array
let Model;
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
    usersModel(){  //用户表
        if(!Model){
            const Schema=mongoose.Schema({
                userName:String,
                userPassword:String
            });
            Model=mongoose.model('user',Schema);
            return Model;
        }else{
            return Model
        }
    }
    othersModel(){
        if(!Model){
            const Schema=mongoose.Schema({
                userName:String,
                userPassword:String
            });
            Model=mongoose.model('other',Schema);
            return Model;
        }else{
            return Model
        }
    }
    
}
let db=new Mongodb();
module.exports = db;