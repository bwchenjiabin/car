var express = require("express");
var app = express();
var session = require("express-session");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/car');
var main = require("./controllers/main.js");

app.set("view engine","ejs");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.get("/",main.showIndex);//登录
app.post("/checklogin",main.checklogin);

app.get("/refers",main.showRefer);//客人查询
app.get("/refer",main.getAllCar);
app.post("/refer",main.addCar);
app.post('/refer/:sid',main.updateCar);
app.get('/refer/:sid',main.showUpdate);
app.delete('/refer/:sid',main.deleteCar);

app.get("/sorts",main.showSort);//类别档案
app.get("/sort",main.getAllSort);
app.post("/sort",main.addSort);
app.delete("/sort/:sid",main.deleteSort);

app.get("/cars",main.showCar);//汽车档案
app.get("/car",main.getAllQi);
app.post("/car",main.addQi);
app.post("/savecar",main.savecar);//汽车保存
app.post('/car/:sid',main.updateQi);
app.get('/car/:sid',main.showUpdate);
app.delete('/car/:sid',main.deleteQi);

app.get("/statistics",main.showTong);//统计分析

app.get("/rent",main.showrent);//租赁
app.post("/classcar/:cont",main.classcar);//租赁页点击时改变
app.post("/gouxuan/:id",main.gouxuan);//点击勾选的时候
app.post("/queren/:id",main.queren);//确认选择

app.use(express.static("public"));

app.listen(3000);