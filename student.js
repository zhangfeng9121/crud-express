/**
 * 封装数据对象
 */
var fs = require('fs');

/**
 * 查询所有用户信息
 * @param  {callback} callback 回调函数
 * @return {data}            用户信息
 */
exports.queryAll = function(callback) {
    fs.readFile('./db.json', 'utf8', function(err, data) {
        if (err) {
            return callback(err);
        }
        return callback(null, JSON.parse(data).students);
    });
}

/**
 * 添加一个用户
 * @param {[type]}   stu      [description]
 * @param {Function} callback [description]
 */
exports.addOne = function(stu, callback) {
    fs.readFile('./db.json', 'utf8', function(err, data) {
        if (err) {
            return callback(err);
        }
        var stuObj = JSON.parse(data);
        // stu.id = parseInt(students[students.length - 1].id) + 1;
        stu.id = stuObj.students[stuObj.students.length - 1].id + 1;
        stuObj.students.push(stu);

        fs.writeFile('./db.json', JSON.stringify(stuObj), function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    });
}

/**
 * 根据Id查询一个用户
 */
exports.findOne = function(id, callback) {
    fs.readFile('./db.json', 'utf8', function(err, data) {
        if (err) {
            return callback(err);
        }
        var stus = JSON.parse(data).students;
        var stuById = stus.find(function(item) {
            return parseInt(id) === parseInt(item.id);
        });

        return callback(null, stuById);
    });
}


/**
 * 编辑一个用户
 * @param  {[type]}   stu      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.editOne = function(stu, callback) {
    fs.readFile('./db.json', 'utf8', function(err, data) {

        if (err) {
            return callback(err);
        }

        var stuObj = JSON.parse(data);

        var stuEdit = stuObj.students.find(function(item) {
            console.log(item);
            console.log('----------------------');
            console.log(stu);
            return parseInt(item.id) === parseInt(stu.id);
        });

        for(var key in stu) {
            stuEdit[key] = stu[key];
        }

        fs.writeFile('./db.json', JSON.stringify(stuObj), function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });

    });
};

/**
 * 删除用户
 */
exports.del = function(id, callback) {
    fs.readFile('./db.json', 'utf8', function(err, data) {
        if (err) {
            return callback(err);
        }
        var stus = JSON.parse(data);
        var index = stus.students.findIndex(function(item) {
            return parseInt(id) === parseInt(item.id);
        });

        stus.students.splice(index, 1);
        fs.writeFile('./db.json', JSON.stringify(stus), function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    });
}