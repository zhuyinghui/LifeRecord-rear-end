const router = require('koa-router')()
const db = require('../public/mongodb');
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});
router.get('/addOne',async (ctx,next)=>{
  db.addOne()
      .then(val=>{
        console.log(val)
      },err=>{
        console.log(err)
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
