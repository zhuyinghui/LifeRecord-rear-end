//用户表
const mongoose = require("mongoose");
const schema={
    userName:String,
    userPassword:String,
    headImage:String,
    loverId:String
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('user',Schema);
module.exports=Model;