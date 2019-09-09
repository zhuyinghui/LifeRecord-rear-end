//博客表
const mongoose = require("mongoose");
const schema={
    userId:{
        type:String,
        ref:'user'
    },
    blogTitle:String,
    blogType:Number,
    blogContent:String,
    publishTime:String
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('blog',Schema);
module.exports=Model;