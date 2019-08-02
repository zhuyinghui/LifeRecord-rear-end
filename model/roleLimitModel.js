// 用户角色关联表
const mongoose = require("mongoose");
const schema={
    roleId:String,
    limitId:String
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('roleLimit',Schema);
module.exports=Model;