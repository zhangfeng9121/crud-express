/**
 * 封装路由插件
 */

var express = require('express');

var router = express.Router();

var stu = require('./student.js');

var data = {
    fruits: [
        "strisd",
        "avddff",
        "hfdfda",
        "jrtyud"
    ],
}

// 首页渲染
router.get('/student', function(req, res) {
    stu.queryAll(function(err, dataStu) {
        if(err) {
            return  res.status(500).send('Server is error!!!')
        }
        data.students = dataStu;
        res.render('index.html', data);
    });
});


// 添加页面
router.get('/student/add', function(req, res) {
    res.render('add.html');
});


// 添加提交
router.post('/student/add', function(req, res) {
    stu.addOne(req.body, function(err) {
        if(err) {
            return  res.status(500).send('Server is error!!!');
        }
        res.redirect('/student');
    });
});

// 编辑页面
router.get('/student/edit', function(req, res) {
    var id = req.query.id;
    stu.findOne(id, function(err, data) {
        if(err) {
            return  res.status(500).send('Server is error!!!');
        }

        res.render('edit.html', {
            stu: data
        });
    });
});

// 编辑提交
router.post('/student/edit', function(req, res) {
    var stuEdit = req.body;
    stu.editOne(stuEdit, function(err) {
        if(err) {
            return  res.status(500).send('Server is error!!!');
        }

        res.redirect('/student');
    });
});

// 删除
router.get('/student/del', function(req, res) {
    var id = req.query.id;

    stu.del(id, function(err, data) {
        if(err) {
            return  res.status(500).send('Server is error!!!');
        }

        res.redirect('/student');
    });
});


module.exports = router;