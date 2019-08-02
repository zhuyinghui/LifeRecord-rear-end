const router = require('koa-router')();
router.prefix('/userRoles');
const userRoleModel=require('../model/userRoleModel');

//给用户赋予角色
router.post('/', async ctx=> {
  //用户编号和角色编号
  let doc=new userRoleModel(ctx.request.body);
  await doc.save().then(data=>{
    ctx.body={
      status:200,
      message:'用户赋予角色成功',
      data:data
    }
  })
})


module.exports = router
