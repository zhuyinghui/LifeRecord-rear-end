const router = require('koa-router')();
router.prefix('/users');
const userModel=require('../model/userModel');

//用户查询
router.get('/', async ctx=> {
  await userModel.find({}).then(data=>{
    ctx.body={
      status:200,
      data:data
    }
  })
})

//用户注册
router.post('/',async ctx=>{
  let doc=new userModel(ctx.request.body);
  await doc.save().then(data=>{
    ctx.body={
      status:200,
      message:'注册成功',
      data:data
    }
  })
})

//用户修改密码
router.patch('/',async ctx=>{
  await userModel.updateOne({userName:'11'},{ $set: { userPassword: '111' }}).then(()=>{
    ctx.body={
      status:200,
      message:'密码修改成功'
    }
  })
})

//用户注销
router.delete('/',async ctx=>{
 await userModel.deleteOne({userName:'11'}).then(()=>{
    ctx.body={
      status:200,
      message:'用户注销成功'
    }
  })
})

//禁用用户
//...

module.exports = router
