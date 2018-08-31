var formidable = require("formidable");
var crypto = require("crypto");
var url = require("url");
var Car = require("../models/Car.js");
var cara = require("../models/cara.js");
var Sort = require("../models/Sort.js");
var Qi = require("../models/Qi.js");
var Rent = require("../models/Rent.js");
var Admin = require("../models/Admin.js");
var path = require("path");

//显示登录页
exports.showIndex = function(req,res){
    res.sendFile(path.join(__dirname,"../views/index.html"));
}
exports.checklogin = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //得到用户输入的表单数据，用户名和密码：
        var username = fields.username;
        var password = fields.password;
        // console.log(username);
        // console.log(password);
        if (err) {
            //-1表示数据库错误
            res.json({"result": -1});
            return;
        }
        if (!username || !password) {
            // console.log(-4);
            //-4表示没有填写
            res.json({"result": -4});
            return;
        }

        //首先检查这个人是不是存在
        Admin.findByUsername(username, function (err, results) {
            if (err) {
                //-1表示数据库错误
                res.json({"result": -1});
                return;
            }
            if (results.length == 0) {
                //用户名不存在！
                res.json({"result": -2});
                return;
            }
            //直接检查密码是否输入正确！！
            var theadmin = results[0];
            //加密密码
            var sha256 = crypto.createHash("sha256");
            password = sha256.update(password).digest("hex").toString();
            // console.log(password);
            if (theadmin.password == password) {
                //登录成功，下发session
                req.session.username = username;
                req.session.type = "admin";
                req.session.login = true;

                res.json({"result": 1, "type": "admin"});
            } else {
                res.json({"result": -3});
            }
        });
    });
};


//显示客人查询
exports.showRefer = function(req,res){
    res.render("refer");
}
//显示所有的用户
exports.getAllCar = function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 5;
    Car.count({},function(err,count){
        Car.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
}
//增加用户
exports.addCar = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //数据库持久
        Car.addCar(fields,function(err,results){
            res.json({
                "result":results
            })
        })

    });
}
exports.check = function(req,res){
    var sid = req.params.sid;
    Student.checkSid(sid,function (torf) {
        res.json({"result":torf})
    })
}
exports.deleteCar = function(req,res){
    //拿到学号
    var sid = req.params.sid;
    Car.find({"_id" : sid},function(err,results){
        if(err || results.length == 0){
            res.json({"result" : -1});
            return;
        }
        //删除
        results[0].remove(function(err){
            if(err){
                res.json({"results" : -1});
                return;
            }
            res.json({"results" : 1});
        });
    });
}
exports.updateCar = function(req,res){
    var sid = req.params.sid;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //更改学生
        Car.update({"sid":sid},{$set:{"name":fields.name,"phone":fields.phone,"address":fields.address,"shenfenzheng":fields.shenfenzheng,"jiazhao":fields.jiazhao}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.showUpdate = function(req,res){
    var sid = req.params.sid;
    //直接用类名打点调用find，不需要再Student类里面增加一个findStudentBySid的方法。
    Car.find({"sid" : sid},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }else{
            res.json({"result" : results[0]});
        }
    });
}


//显示类别档案
exports.showSort = function (req,res) {
    res.render("sort");
}
exports.getAllSort = function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 5;
    Sort.count({},function(err,count){
        Sort.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
}
exports.addSort = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //数据库持久
        Sort.addSort(fields,function(err,results){
            res.json({
                "result":results
            })
        })

    });
}
exports.deleteSort = function(req,res){
    //拿到学号
    var sid = req.params.sid;
    Sort.find({"_id" : sid},function(err,results){
        if(err || results.length == 0){
            res.json({"result" : -1});
            return;
        }
        //删除
        results[0].remove(function(err){
            if(err){
                res.json({"results" : -1});
                return;
            }
            res.json({"results" : 1});
        });
    });
}


//显示汽车档案
exports.showCar = function (req,res) {
    res.render("car");
}
exports.getAllQi = function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 5;
    Qi.count({},function(err,count){
        Qi.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
}
//增加用户
exports.addQi = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //数据库持久
        Qi.addQi(fields,function(err,results){
            res.json({
                "result":results
            })
        })

    });
}


exports.savecar=function(req,res){
    //新建汽车
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(fields)
        cara.addcar(fields,function(err,data){
            if(err){
                res.json({"result":-1});
                return;
            }
            res.json({"result":1})
        })
    });
}
exports.deleteQi = function(req,res){
    //拿到学号
    var sid = req.params.sid;
    Qi.find({"_id" : sid},function(err,results){
        if(err || results.length == 0){
            res.json({"result" : -1});
            return;
        }
        //删除
        results[0].remove(function(err){
            if(err){
                res.json({"results" : -1});
                return;
            }
            res.json({"results" : 1});
        });
    });
}
exports.updateQi = function(req,res){
    var sid = req.params.sid;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //更改学生
        Qi.update({"sid":sid},{$set:{"name":fields.name,"lei":fields.lei,"price":fields.price,"jiliang":fields.jiliang}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.showUpdate = function(req,res){
    var sid = req.params.sid;
    //直接用类名打点调用find，不需要再Student类里面增加一个findStudentBySid的方法。
    Qi.find({"sid" : sid},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }else{
            res.json({"result" : results[0]});
        }
    });
}


exports.showTong = function (req,res) {
    res.render("statistics");
}



// 租赁页
exports.showrent=function(req,res){

        // 显示租赁页
        Sort.findcont({},function(classarr){
            Rent.findcont({},function(data){
                Car.findcont({},function(name){
                    var namearr=[];
                    for(var i=0;i<name.length;i++){

                        namearr.push(name[i].user)
                    }
                    res.render("rent",{"result":classarr,"data":data,"username":namearr});
                })

            })
        })
}
exports.classcar=function(req,res){
    //点击类别出现对应的汽车
    var cont=req.params.cont;
    Qi.findcont({"lei":cont},function(data){
        res.json({"result":data})
    })
}
exports.gouxuan=function(req,res){
    //点击勾选的时候
    var id=req.params.id;
    // console.log(id);
    Qi.findcont({"_id":id},function(data){
        res.json({"result":data})
    })
}
exports.queren=function(req,res){
    // 确认租出
    var id=req.params.id;
    // console.log(id);
    cara.findcont({"_id":id},function(data){
        var name=data[0].carname;
        // console.log(name);
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            var str = '';
            var myTime = new Date();
            // number
            var iYear = myTime.getFullYear();
            var iMonth = myTime.getMonth()+1;
            var iDate = myTime.getDate();
            var iWeek = myTime.getDay();
            str = iYear+ '-' +iMonth+'-'+iDate;
            Rent.addrent({"carname":name,"username":fields.username,"usertime":fields.usertime,"daymoney":fields.daymoney,"paid":fields.paid,"allmoney":fields.allmoney,"data":str,"admin":req.session.yonghuming,"state":0},function(err,data){
                // res.json({"result":1})
            })
            cara.updatecont({"_id":id},{$set:{state:true}},function(data){
                res.json({"result":1})
            })
        })
    })
}
