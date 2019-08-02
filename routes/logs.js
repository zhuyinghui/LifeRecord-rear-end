const router = require('koa-router')();
router.prefix('/logs');
const logModel=require('../model/logModel');

//日志查询
router.get('/', async ctx=> {
  await logModel.find({}).then(data=>{
    ctx.body={
      status:200,
      data:data
    }
  })
})

//日志添加
router.post('/',async ctx=>{
  let doc=new logModel(ctx.request.body);
  await doc.save().then(data=>{
    ctx.body={
      status:200,
      message:'日志添加成功',
      data:data
    }
  })
})


//日志删除
router.delete('/',async ctx=>{
 await logModel.deleteOne({"userId":"5555"}).then(()=>{
    ctx.body={
      status:200,
      message:'日志删除成功'
    }
  })
})


module.exports = router
