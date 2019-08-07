//角色表
const mongoose = require("mongoose");
const schema={
    roleName:String
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('role',Schema);
module.exports=Model;