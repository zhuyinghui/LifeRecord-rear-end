//日志表
const mongoose = require("mongoose");
const schema={
    userId:String,
    logContent:String,
    pictrueUrls:Array,
    vedioUrl:String,
    publishTime:Date,
    module:Number,
    comments:Array
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('log',Schema);
module.exports=Model;