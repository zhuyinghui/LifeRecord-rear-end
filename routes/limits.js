const router = require('koa-router')();
router.prefix('/limits');
const limitModel=require('../model/limitModel');

//权限查询
router.get('/', async ctx=> {
  await limitModel.find({}).then(data=>{
    ctx.body={
      status:200,
      data:data
    }
  })
})

//权限添加
router.post('/',async ctx=>{
  let doc=new limitModel(ctx.request.body);
  await doc.save().then(data=>{
   ctx.body={
      status:200,
      message:'权限添加成功',
      data:data
    }
  })
})


//权限删除
router.delete('/',async ctx=>{
 await limitModel.deleteOne({limitName:'Get/users'})
 .then(data=>{
    ctx.body={
      status:200,
      message:'权限删除成功',
      data:data
    }
  })
})

module.exports = router
