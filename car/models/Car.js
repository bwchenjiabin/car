var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
    // sid  : Number ,
    name : String,
    phone  : Number,
    address  : String,
    shenfenzheng : Number,
    jiazhao : Number
});

carSchema.statics.addCar = function(json,callback){
    Car.checkSid(json.sid,function(torf){
        if(torf){
            //没有被占用，就保存
            var s = new Car(json);
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
carSchema.statics.checkSid = function(sid,callback){
    this.find({"sid" : sid} , function(err,results){
        callback(results.length == 0);
    });
}


carSchema.statics.findcont=function (tj, callback) {
    Car.find(tj,function(err,data){
        callback(data);
    })
}




carSchema.statics.getall=function (callback) {
    Car.find({},function(err,data){
        callback(data);
    })
}

carSchema.statics.addclient=function(tj,callback){
    Car.create(tj,function(err,data){
        callback(err,data);
    })
}
carSchema.statics.updatecont=function(tj,set,callback){
    Car.update(tj,set,function(err,data){
        callback(data);
    })
}

carSchema.statics.deletecont=function(tj,callback){
    Car.remove(tj,function(data){
        callback(data);
    })
}

carSchema.statics.getattr=function(tj,pro,callback){
    Car.findOne(tj,function(err,data){
        callback(err,data[pro])
    })
}

//类
var Car = mongoose.model("Car",carSchema);

//暴露
module.exports = Car;
