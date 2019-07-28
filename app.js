 const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

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
 const db = require('./public/mongodb');
 db.connect();

module.exports = app;
