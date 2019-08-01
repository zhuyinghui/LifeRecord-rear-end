const router = require('koa-router')();
router.prefix('/users');
const userModel=require('../model/userModel');

//用户查询
router.get('/', async ctx=> {
  console.log(1)


  let data=await userModel.find({},err=>{
    if(err){
      console.log(err)
    }
  })
console.log(data)
 
  console.log(3)
})

//用户增加
router.post('/',async (ctx,next)=>{
  let data=new userModel({
    userName:'11',
    userPassword:'zzzz'
  });
  console.log(1)
  // let d=await new Promise((resolve,reject)=>{
  //   data.save(err=>{
  //     if(!err){
  //       resolve('添加成功')
  //     }else{
  //       reject(err+'添加失败')
  //     }
  //   })
  // })
  data.save().then((err)=>{
    if(!err){
      console.log(2)
    }else{
      console.log(err)
    }
  })
  
  // console.log(d)
  console.log(3)
})

//用户删除
router.delete('/',async ctx=>{

})

module.exports = router
