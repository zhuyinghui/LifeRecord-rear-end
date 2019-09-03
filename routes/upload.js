const router = require('koa-router')();
router.prefix('/api/upload');


const multer = require('koa-multer');//加载koa-multer模块
//文件上传
//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });
//路由
router.post('/', upload.array('mypic'), async ctx => {
  let imgarr=[];
  for(let item of ctx.req.files){
    imgarr.push('/uploads/'+item.filename)
  }
  ctx.body = {
    errno:0,
    data: imgarr//返回文件名
  }
})

module.exports = router;