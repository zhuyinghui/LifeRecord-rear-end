//留言表
const mongoose = require("mongoose");

const schema={
    name:String,
    phone:String,
    email:String,
    compony:String,
    content:String 
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('message',Schema);
module.exports=Model;