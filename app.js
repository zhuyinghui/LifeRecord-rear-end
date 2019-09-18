const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const session = require('koa-session')

//错误处理
onerror(app)
//请求体数据解析
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
//json格式优化
app.use(json());
//设置静态资源目录
app.use(require('koa-static')(__dirname + '/public'))
//设置模板引擎
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
//跨域处理
app.use(cors());
//session配置
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koaSession', /* cookie键值 */
  maxAge: 1800000, /* cookie过期时间，单位ms,60s过期 */
  overwrite: true, /* 是否可以重写 */
  httpOnly: true, /* cookie是否只有服务器端可以访问 */
  signed: true, 
  rolling: true, /* 是否在每次请求是强行设置cookie，重置cookie过期时间 */
};
app.use(session(CONFIG, app));

const url = require('url');
app.use(async(ctx,next)=>{
  const path=url.parse(ctx.request.url).pathname;
  const limitpath=ctx.request.method+path;
  if(path!=='/'&&path!=='/login'&&path!=='/api/users/login'&&path!=='/api/blogs/checkDetail'&&path!=='/api/blogs/typeCount'&&limitpath!=='POST/api/messages'){
    //非登录操作做拦截
    if(ctx.session.login){
      //已登录
      //在已登录的状态下拦截所有的/api请求
      if(path.includes('/api')){
        //根据用户Id查询用户对应的角色，在根据角色查到对应的所有权限
        const userModel=require('./model/userModel');
        await userModel.find({_id:ctx.session.login}).populate('roleId').then(async data=>{
          const limitArr=data[0].roleId.limitArr;
          if(limitArr.includes(limitpath)){
            
            //用户有此权限，则通过
            await next();
          }else{
            //用户无此权限
            ctx.body={
              code:0,
              message:'您无权限进行此操作'
            }
          }
        })
      }else{
        //非api请求即页面请求，直接通过
        await next();
      }
    }else{
      //未登录渲染登录页面至客户端
      await ctx.render('login', {
        alink: '/login'
      })
    }
  }else{
    //登录操作就直接通过
    await next();
  }
  // await next();
})

 //注册路由
const fs =  require('fs');
fs.readdirSync('./routes').forEach(route=> {
  let api = require(`./routes/${route}`);
  app.use(api.routes(), api.allowedMethods())
});



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

//连接数据库
 const db = require('./model/mongodb');
 db.connect();


module.exports = app;
