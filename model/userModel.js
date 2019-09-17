//用户表
const mongoose = require("mongoose");

const schema={
    userName:String,
    userPassword:String,
    roleId:{  
        type:String,
        default:'5d6888bea29dcc2658b2b4be',
        ref:'role',
    }
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('user',Schema);
module.exports=Model;