const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
  
});

router.get('/manage/users',async ctx=>{
  await ctx.render('userManage')
})
module.exports = router
