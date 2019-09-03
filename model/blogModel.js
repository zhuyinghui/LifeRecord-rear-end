//博客表
const mongoose = require("mongoose");
const schema={
    userId:String,
    blogTitle:String,
    blogContent:String,
    publishTime:String
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('blog',Schema);
module.exports=Model;