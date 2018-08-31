var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var rentSchema = new Schema({
    carname:String,
    username:String,
    usertime:String,
    daymoney:String,
    paid:String,
    allmoney:String,
    data:String,
    admin:String,
    state:String
});

var rent = mongoose.model('rent', rentSchema);

//查找所有
exports.getall=function (callback) {
    rent.find({},function(err,data){
        callback(data);
    })
}

//新建客户
exports.addrent=function(tj,callback){
    rent.create(tj,function(err,data){
        callback(err,data);
    })
}

//根据条件查找
exports.findcont=function (tj, callback) {
    rent.find(tj,function(err,data){
        callback(data);
    })
}

//更新数据
exports.updatecont=function(tj,set,callback){
    rent.update(tj,set,function(err,data){
        callback(data);
    })
}

//删除数据
exports.deletecont=function(tj,callback){
    rent.remove(tj,function(data){
        callback(data);
    })
}

//获取某一项的属性
exports.getattr=function(tj,pro,callback){
    rent.findOne(tj,function(err,data){
        callback(err,data[pro])
    })
}
