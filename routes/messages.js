const router = require('koa-router')();
router.prefix('/api/messages');
const messageModel=require('../model/messageModel');


//留言查询
router.get('/', async ctx=> {
  //表的总记录数
  let num=0;
   await messageModel.countDocuments().then(data=>{
     num=data;
   })
  //分页
  const skipNum=(ctx.request.query.page-1)*ctx.request.query.limit*1;
  const limitNum=ctx.request.query.limit*1;
  await messageModel.find({}).skip(skipNum).limit(limitNum).then(data=>{
    ctx.body={
      code:0,
      count:num,
      data:data
    }
  })
})

//留言添加
router.post('/',async ctx=>{
  let doc=new messageModel(ctx.request.body);
  await doc.save().then(()=>{
   ctx.body={
      message:'留言添加成功',
    }
  })
})


//留言删除
router.delete('/',async ctx=>{
 await messageModel.deleteOne({_id:ctx.request.query._id})
 .then(()=>{
    ctx.body={
      message:'留言删除成功',
    }
  })
})

module.exports = router
