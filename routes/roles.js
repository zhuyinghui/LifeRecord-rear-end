const router = require('koa-router')();
router.prefix('/roles');
const roleModel=require('../model/roleModel');

//角色查询
router.get('/', async ctx=> {
  await roleModel.find({}).then(data=>{
    ctx.body={
      status:200,
      data:data
    }
  })
})

//角色添加
router.post('/',async ctx=>{
  let doc=new roleModel(ctx.request.body);
  await doc.save().then(data=>{
   ctx.body={
      status:200,
      message:'角色添加成功',
      data:data
    }
  })
})


//角色删除
router.delete('/',async ctx=>{
 await roleModel.deleteOne({roleName:'会员555'})
 .then(data=>{
    ctx.body={
      status:200,
      message:'角色删除成功',
      data:data
    }
  })
})

module.exports = router
