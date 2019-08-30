const router = require('koa-router')()

//路由页
router.get('/', async ctx=>{
  await ctx.render('index', {
    alink: '/home'
  })
});
//渲染页面
const fs =  require('fs');
fs.readdirSync('./views').forEach(page=> {
  let apage=page.replace('.ejs','')
  console.log(apage)
  router.get('/'+apage,async ctx=>{
    await ctx.render(apage)
  })
});
module.exports = router
