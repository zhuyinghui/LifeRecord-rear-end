//数据库连接
const mongoose = require("mongoose");
//MongoDB数据库的数据类型
//String/Number/Date/Buffer/Boolean/Mixed/ObjectId/Array
let Model;
class Mongodb {
    // constructor(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }
    connect(){
        mongoose.connect("mongodb://127.0.0.1:27017/LifeRecord",{ useNewUrlParser: true })
            .then(
                ()=>{
                    console.log('数据库连接成功');
                    this.createTable();
                },
                err=>{
                    console.log('数据库连接失败',err);
                }
            )
    }
    createTable(){
        //参数1，文档的字段及数据类型，对象
        let schema={
            userName:String,
            userPassword:String
        };
        //参数2，数据库表名的单数形式，字符串
        let tableName='user';
        //参数3，要添加的数据，对象
        const Schema=mongoose.Schema(schema);
        Model=mongoose.model(tableName,Schema);
        console.log('表格创建完成')
    }
    addOne(){
        //传入参数
        //参数1，文档的字段及数据类型，对象
        // let schema={
        //     userName:String,
        //     userPassword:String
        // };
        //参数2，数据库表名的单数形式，字符串
        // let tableName='user';
        //参数3，要添加的数据，对象
        // let data={
        //     userName:'张三',
        //     userPassword:123456
        // };
        let data={
            userName:'李四',
            userPassword:123456
        };
        const doc=new Model(data);
        const promise=new Promise((resolve,reject)=>{
            console.log('promise')
            console.log(doc)
            doc.save(err=>{
                if(err){
                    reject(err);
                }else{
                    resolve('数据添加成功')
                }
            });
        });
        return promise;
    }
}
let db=new Mongodb();
module.exports = db;