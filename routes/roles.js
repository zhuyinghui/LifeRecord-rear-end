const router = require('koa-router')();
router.prefix('/api/roles');
const roleModel=require('../model/roleModel');

//角色查询
router.get('/', async ctx=> {
  //表的总记录数
  let num=0;
   await roleModel.countDocuments().then(data=>{
     num=data;
   })
  //分页
  const skipNum=(ctx.request.query.page-1)*ctx.request.query.limit*1;
  const limitNum=ctx.request.query.limit*1;
  await roleModel.find({}).skip(skipNum).limit(limitNum).then(data=>{
    ctx.body={
      code:0,
      count:num,
      data:data
    }
  })
})

//角色添加
router.post('/',async ctx=>{
  let doc=new roleModel(ctx.request.body);
  await doc.save().then(()=>{
   ctx.body={
      message:'角色添加成功',
    }
  })
})

//角色删除
router.delete('/',async ctx=>{
 await roleModel.deleteOne({_id:ctx.request.query._id})
 .then(()=>{
    ctx.body={
      message:'角色删除成功',
    }
  })
})


module.exports = router
