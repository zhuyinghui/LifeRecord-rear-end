 const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

const url = require('url');
app.use(async(ctx,next)=>{
  console.log(ctx.request.method+url.parse(ctx.request.url).pathname)
  await next();
})

 //注册路由
const fs =  require('fs');
fs.readdirSync('./routes').forEach(route=> {
  let api = require(`./routes/${route}`);
  app.use(api.routes(), api.allowedMethods())
});

//跨域处理
 const cors = require('koa2-cors');
 app.use(cors());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

//连接数据库
 const db = require('./model/mongodb');
 db.connect();


module.exports = app;
