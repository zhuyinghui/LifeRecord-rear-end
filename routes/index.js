const router = require('koa-router')()
const db = require('../public/mongodb');
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});
router.get('/users',async (ctx,next)=>{
  const model=db.usersModel()
  model.find({},(err,data)=>{
    if(!err){
      console.log(data)
      ctx.body={
        status:'333'
      }
    }
  })
  const data=new model({
    userName:'zzz',
    userPassword:'222'
  }) 
  data.save(err=>{
    if(err){
      console.log(err);
    }else{
      console.log('tianjiachengg')
    }
  })
});
router.get('/others',async (ctx,next)=>{
  const model=db.othersModel()
  const data=new model({
    userName:'zzz',
    userPassword:'222'
  })
  data.save(err=>{
    if(err){
      console.log(err);
    }else{
      console.log('otherssucess')
    }
  })
});


router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
