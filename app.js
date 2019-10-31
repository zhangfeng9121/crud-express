// 加载express模块
var express = require('express');
// 创建express实例
var app = express();

// 加载bodyParser
var bodyParser = require("body-parser");

// 加载路由
var router = require("./router.js");

// 开放静态目录
app.use('/public/', express.static('./public/'));
app.use('/node_modules/',express.static('./node_modules/'));

// 使用body-parse
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 设置模板引擎渲染的文件格式
app.engine('html', require('express-art-template'));

// 设置渲染文件的位置 第一个参数不能写错 默认是同级views目录
// app.set('views', 目录路径)

var fs =  require('fs');


// 加载路由
app.use(router);

// 监听端口，开启服务
app.listen(3000, function() {
    console.log('Server is running...');
})
