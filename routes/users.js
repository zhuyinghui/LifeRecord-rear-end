const router = require('koa-router')();
router.prefix('/api/users');
const userModel=require('../model/userModel');
const md5=require('md5');

//用户登录
router.post('/login',async ctx=>{
  let info=ctx.request.body;
  info.userPassword=md5(info.userPassword);
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
          message:'登录成功'
        }
        //将用户编号存为session
        ctx.session.login=data[0]._id;
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

//添加用户
router.post('/',async ctx=>{
  let info=ctx.request.body;
  info.userPassword=md5(info.userPassword);
  await userModel.find({userName:info.userName}).then(async data=>{
    if(data.length==0){
      let doc=new userModel(info);
      await doc.save().then(()=>{
        ctx.body={
          message:'用户添加成功',
        }
      })
    }else{
        ctx.body={
          message:'用户已存在'
        }
    }
  })
  
})

//删除用户
router.delete('/',async ctx=>{
  const userId=ctx.request.query._id;
 await userModel.deleteOne({_id:userId}).then(()=>{
    ctx.body={
      message:'用户删除成功'
    }
  })
})

//修改用户角色
router.post('/changeRole',async ctx=>{
  let info=ctx.request.body;
  await userModel.updateOne({_id:info._id},{$set:{roleId:info.roleId}}).then(()=>{
    ctx.body={
      message:'角色修改成功'
    }
  })
})

module.exports = router;
