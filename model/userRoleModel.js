// 用户角色关联表
const mongoose = require("mongoose");
const schema={
    userId:String,
    roleId:String
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('userRole',Schema);
module.exports=Model;