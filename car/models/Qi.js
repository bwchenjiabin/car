var mongoose = require('mongoose');

var qiSchema = new mongoose.Schema({
    sid  : Number ,
    name : String,
    lei  : String,
    price  : Number,
    jiliang : String,
});

qiSchema.statics.addQi = function(json,callback){
    Qi.checkSid(json.sid,function(torf){
        if(torf){
            //没有被占用，就保存
            var s = new Qi(json);
            s.save(function(err){
                if(err){
                    callback(-2);  //服务器错误
                    return;
                }
                //发回1这个状态
                callback(1);
            });

        }else{
            //学号被占用了，返回-1
            callback(-1);
        }
    });
}

//验证学号是否存在
qiSchema.statics.checkSid = function(sid,callback){
    this.find({"sid" : sid} , function(err,results){
        callback(results.length == 0);
    });
}


qiSchema.statics.findcont=function (tj, callback) {
    Qi.find(tj,function(err,data){
        callback(data);
    })
}
qiSchema.statics.getall=function (callback) {
    Qi.find({},function(err,data){
        callback(data);
    })
}
//新建客户
qiSchema.statics.addcar=function(tj,callback){
    Qi.create(tj,function(err,data){
        callback(err,data);
    })
}
//更新数据
qiSchema.statics.updatecont=function(tj,set,callback){
    Qi.update(tj,set,function(err,data){
        callback(data);
    })
}
//删除数据
qiSchema.statics.deletecont=function(tj,callback){
    Qi.remove(tj,function(data){
        callback(data);
    })
}

qiSchema.statics.getattr=function(tj,pro,callback){
    Qi.findOne(tj,function(err,data){
        callback(err,data[pro])
    })
}


//类
var Qi = mongoose.model("Qi",qiSchema);

//暴露
module.exports = Qi;
