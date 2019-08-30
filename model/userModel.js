//用户表
const mongoose = require("mongoose");
const schema={
    userName:String,
    userPassword:String,
    headImage:{
        type:String,
        default:'/eg.jpg'
    },
    loverId:{
        type:String,
        default:'123456'
    }
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('user',Schema);
module.exports=Model;