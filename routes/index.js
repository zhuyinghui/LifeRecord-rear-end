const router = require('koa-router')()

//路由页
router.get('/', async ctx=>{
  await ctx.render('index', {
    alink: '/login'
  })
});

//修改用户角色页--获取角色列表
const roleModel=require('../model/roleModel');
router.get('/changeRole',async ctx=>{
    let list=[];
    await roleModel.find({}).then(data=>{
      list=data;
    })
    await ctx.render('changeRole',{
      rolelist:list
    })
})

//修改角色权限页--获取权限列表
const limitModel=require('../model/limitModel');
router.get('/addRole',async ctx=>{
  let list=[];
  await limitModel.find({}).then(data=>{
    list=data;
  })
  await ctx.render('addRole',{
    limitlist:list
  })
})

//渲染其它页面
const fs =  require('fs');
fs.readdirSync('./views').forEach(page=> {
  let apage=page.replace('.ejs','')
  router.get('/'+apage,async ctx=>{
    await ctx.render(apage)
  })
});

module.exports = router
