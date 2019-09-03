const router = require('koa-router')();
router.prefix('/api/blogs');
const blogModel=require('../model/blogModel');

//博客查询
router.get('/', async ctx=> {
  console.log('kkk')
  //表的总记录数
  let num=0;
   await blogModel.countDocuments().then(data=>{
     num=data;
   })
  //分页
  const skipNum=(ctx.request.query.page-1)*ctx.request.query.limit*1;
  const limitNum=ctx.request.query.limit*1;
  await blogModel.find({}).skip(skipNum).limit(limitNum).then(data=>{
    ctx.body={
      code:0,
      count:num,
      data:data
    }
  })
})

//博客添加
router.post('/',async ctx=>{
  let doc=new blogModel(ctx.request.body);
  await doc.save().then(()=>{
    ctx.body={
      message:'博客发布成功',
    }
  })
})


//博客删除
router.delete('/',async ctx=>{
 await blogModel.deleteOne({_id:ctx.request.query._id})
 .then(()=>{
    ctx.body={
      message:'日志删除成功'
    }
  })
})


module.exports = router
