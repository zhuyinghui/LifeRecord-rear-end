const router = require('koa-router')();
router.prefix('/api/users');
const userModel=require('../model/userModel');

//用户登录
router.post('/login',async ctx=>{
  const info=ctx.request.body;
  await userModel.find({userName:info.userName}).then(data=>{
    if(data.length==0){
      ctx.body={
        status:0,
        message:'用户名不存在'
      }
    }else{
      if(data[0].userPassword==info.userPassword){
        ctx.body={
          status:1,
          message:'登录成功',
          sessionId:data[0]._id
        }
      }else{
        ctx.body={
          status:0,
          message:'密码错误'
        }
      }
    }
  })
})


//用户查询
router.get('/', async ctx=> {
  //表的总记录数
  let num=0;
   await userModel.countDocuments().then(data=>{
     num=data;
   })
  //分页
  const skipNum=(ctx.request.query.page-1)*ctx.request.query.limit*1;
  const limitNum=ctx.request.query.limit*1;
  await userModel.find({}).populate('roleId').skip(skipNum).limit(limitNum).then(data=>{
    ctx.body={
      code:0,
      count:num,
      data:data
    }
  })
})

//用户注册
router.post('/',async ctx=>{
  let doc=new userModel(ctx.request.body);
  await doc.save().then(data=>{
    ctx.body={
      message:'注册成功',
      data:data
    }
  })
})

//用户修改密码
router.patch('/',async ctx=>{
  await userModel.updateOne({userName:'11'},{ $set: { userPassword: '111' }}).then(()=>{
    ctx.body={
      message:'密码修改成功'
    }
  })
})

//用户注销
router.delete('/',async ctx=>{
 await userModel.deleteOne({userName:'11'}).then(()=>{
    ctx.body={
      message:'用户注销成功'
    }
  })
})

//修改用户角色
router.post('/changeRole',async ctx=>{
  let info=ctx.request.body;
  await userModel.update({_id:info._id},{$set:{roleId:info.roleId}}).then(()=>{
    ctx.body={
      message:'角色修改成功'
    }
  })
})



module.exports = router
