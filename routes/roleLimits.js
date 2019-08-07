const router = require('koa-router')();
router.prefix('/roleLimits');
const roleLimitModel=require('../model/roleLimitModel');

//给角色赋予权限
router.post('/', async ctx=> {
  //角色编号和权限编号
  let doc=new roleLimitModel(ctx.request.body);
  await doc.save().then(data=>{
    ctx.body={
      status:200,
      message:'角色赋予权限成功',
      data:data
    }
  })
})


module.exports = router
