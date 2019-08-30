const router = require('koa-router')();
router.prefix('/api/limits');
const limitModel=require('../model/limitModel');

//权限查询
router.get('/', async ctx=> {
  //表的总记录数
  let num=0;
   await limitModel.countDocuments().then(data=>{
     num=data;
   })
  //分页
  const skipNum=(ctx.request.query.page-1)*ctx.request.query.limit*1;
  const limitNum=ctx.request.query.limit*1;
  await limitModel.find({}).skip(skipNum).limit(limitNum).then(data=>{
    ctx.body={
      code:0,
      count:num,
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
