//角色表
const mongoose = require("mongoose");
const schema={
    limitName:String,
    limitRemark:String
}
const Schema=mongoose.Schema(schema);
const Model=mongoose.model('limit',Schema);
module.exports=Model;