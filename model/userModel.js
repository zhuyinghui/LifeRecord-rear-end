//用户表
const mongoose = require("mongoose");

const schema={
    userName:String,
    userPassword:String,
    roleId:{  
        type:String,
        default:'5d81eb6004744c1e3cd1f6c3',
        ref:'role',
    }
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('user',Schema);
module.exports=Model;