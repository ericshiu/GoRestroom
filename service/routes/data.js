/**
 * @Date:   2018-03-02T22:19:40+08:00
 * @Last modified time: 2018-03-04T18:56:40+08:00
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';
//data/read?type=it
//data/read?type=it.json


//資料讀取
router.get('/read', function(req, res, next) {
    var type = req.param('type') || '';
    fs.readFile(PATH + type + '.json', function(err, data) {
        if (err) {
            console.log('讀取數據異常msg : ' +
                err);
            return res.send({
                status: 0,
                info: '讀取文件異常'
            });
        }
        var COUNT = 50;
        var obj = [];
        try {
            obj = JSON.parse(data.toString());
        } catch (e) {
            console.log(e);
        }
        if (obj.length > COUNT) {
            //返回前50筆資料
            obj = obj.slice(0, COUNT);
        }
        return res.send({
            status: 1,
            data: obj
        });
    });
});
//資料存
router.get('/write', function(req, res, next) {
    if (!req.session.user) {
        return res.send({
            status: 0,
            info: '請登入'
        });
    }
    var type = req.param('type') || '';
    //關鍵字
    var url = req.param('url') || '';
    var title = req.param('title') || '';
    var img = req.param('img') || '';
    //判斷是否為空
    if (!type || !url || !title || !img) {
        return res.send({
            status: 0,
            info: '內容不可為空'
        });
    }
    var filePath = PATH + type + '.json';
    //拿到訊息
    fs.readFile(filePath, function(err, data) {
        if (err) {
            console.log('讀取數據異常msg : ' +
                err);
            return res.send({
                status: 0,
                info: '讀取文件異常'
            });
        }
        var arr = JSON.parse(data.toString());
        var obj = {
            id: guidGenerate(),
            img: img,
            url: url,
            title: title,
            time: new Date()
        };
        arr.splice(0, 0, obj);
        //寫入訊息
        var newData = JSON.stringify(arr);
        fs.writeFile(filePath, newData, function(err, data) {
            console.log('寫入數據異常msg : ' +
                err);
            return res.send({
                status: 0,
                info: '寫入失敗'
            });
        });
        return res.send({
            status: 1,
            info: obj
        });
    });
});
//閱讀
router.post('/write_config', function(req, res, next) {
    if (!req.session.user) {
        return res.send({
            status: 0,
            info: '請登入'
        });
    }
    var filePath = PATH + 'config.json';
    //TODO 參數較驗
    var data = req.body.data;
    console.log('data : '+data);
    //TODO try catch
    var obj = JSON.parse(data);
    var newData = JSON.stringify(obj);
    //寫入
    fs.writeFile(filePath, newData, function(err, data) {
        console.log('寫入數據異常msg : ' +
            err);
        return res.send({
            status: 0,
            info: '寫入失敗'
        });
    });
    return res.send({
        status: 1,
        info: obj
    });
});

//登入
router.post('/login', function(req, res, next) {
    //用戶名,密碼
    var username = req.body.username;
    var password = req.body.password;
    //TODO 參數繳驗
    //XSS處理
    //半段空直
    if (!username || !password) {
        return res.send({
            status: 0,
            info: '內容不可為空'
        });
    }
    if (username === 'admin' && password === '123456') {
        req.session.user = {
            username: username
        };
        return res.send({
            status: 1
        });
    }
    return res.send({
        status: 0,
        info: 登入失敗
    });
});
//創建guid
function guidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}









module.exports = router;
