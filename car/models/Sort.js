var mongoose = require('mongoose');

var sortSchema = new mongoose.Schema({
    // sid  : Number ,
    name : String
});

sortSchema.statics.addSort = function(json,callback){
    Sort.checkSid(json.sid,function(torf){
        if(torf){
            //没有被占用，就保存
            var s = new Sort(json);
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
sortSchema.statics.checkSid = function(sid,callback){
    this.find({"sid" : sid} , function(err,results){
        callback(results.length == 0);
    });
}


sortSchema.statics.findcont=function (tj, callback) {
    Sort.find(tj,function(err,data){
        callback(data);
    })
}

sortSchema.statics.getall=function (callback) {
    Sort.find({},function(err,data){
        callback(data);
    })
}
//新建客户
sortSchema.statics.addclass=function(tj,callback){
    Sort.create(tj,function(err,data){
        callback(err,data);
    })
}
//更新数据
sortSchema.statics.updatecont=function(tj,set,callback){
    Sort.update(tj,set,function(err,data){
        callback(data);
    })
}
//删除数据
sortSchema.statics.deletecont=function(tj,callback){
    Sort.remove(tj,function(data){
        callback(data);
    })
}

sortSchema.statics.getattr=function(tj,pro,callback){
    Sort.findOne(tj,function(err,data){
        callback(err,data[pro])
    })
}

//类
var Sort = mongoose.model("Sort",sortSchema);

//暴露
module.exports = Sort;
