const express = require('express');
const session = require('express-session');
var cors = require('cors');
const app = express();
const path = require('path');
app.use(cors());

// 세션 미들웨어 설정
app.use(session({
    secret: 'your-secret-key', // 세션을 암호화하기 위한 시크릿 키
    resave: false, // 세션을 항상 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
    cookie: {
        maxAge: 3600000 // 세션의 유효 시간 (밀리초 단위)
    }
}));

//ejs 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '.'));   //'.'같은 경로 다른 폴더의 경우 /ejs

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    database: 'test'
});
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

app.get('/', function (req, res) {
    res.send('Hello World');
});
app.get('/userLogin', function (req, res) {
    res.render('userLogin', {});
});
app.get('/boardList', function (req, res) {
    console.log(req.session.userId);
    res.render('boardList', {});
});
app.get('/boardAdd', function (req, res) {
    res.render('boardAdd', { sessionid: req.session.userId });
});

app.get('/userLogin.dox', function (req, res) {
    let map = req.query;
    console.log(map);
    if (!map.userId || !map.userPwd) {
        return res.status(400).send({ error: "Missing required parameters: userId, userPwd" });
    }
    connection.query(`SELECT * FROM TBL_USER WHERE USERID = ? AND PWD = ?`, [map.userId, map.userPwd], function (error, results, fields) {
        if (error || results.length === 0) {
            // 유저가 존재하지 않는 경우
            res.send({ result: "fail" });
        } else {
            req.session.userId = map.userId; // 세션에 사용자 아이디 저장
            // 유저가 존재하는 경우  
            res.send({ result: "success" });
        }
    });
})

app.get('/idCheck.dox', function (req, res) {
    let map = req.query;
    console.log(map);
    connection.query(`SELECT * FROM TBL_USER WHERE USERID = ?`, [map.userId], function (error, results, fields) {
        if (error) throw error
        if(results.length === 0) {
            // 유저가 존재하지 않는 경우
            res.send({ result: "success" });
        } else {
            // 유저가 존재하는 경우  
            res.send({ result: "fail" });
        }
    });
})

app.get('/boardList.dox', function (req, res) {
    connection.query(`SELECT boardNo, title, userId, DATE_FORMAT(cdataTime, '%Y-%m-%d %p %h:%i') AS cdataTime FROM TBL_BOARD`, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});
app.get('/boardView/:boardNo', function (req, res) {
    let map = req.params;
    map["sessionId"] = req.session.userId;
    console.log(map);
    res.render("boardView", { map: map });
});
app.get('/boardView.dox', function (req, res) {
    let boardNo = req.query.boardNo;
    console.log(boardNo);
    connection.query(`SELECT boardNo, title, contents, userId, DATE_FORMAT(cdataTime, '%Y-%m-%d %p %h:%i') AS cdataTime FROM TBL_BOARD WHERE BOARDNO = ${boardNo}`, function (error, results, fields) {
        if (error) throw error;
        // console.log(results);
        res.send(results[0]);
    });
});
app.get('/boardAdd.dox', function (req, res) {
    let map = req.query;
    console.log(map);
    // 로그인되지 않은 사용자인지 확인
    if (!req.session.userId) {
        return res.status(401).send({ error: "Unauthorized: User not logged in" });
    }
    connection.query("INSERT INTO TBL_BOARD(boardNo, title, contents, userId, cdatatime) VALUES(NULL, ?, ?, ?, NOW())", [map.title, map.contents, map.userId], function (error, results, fields) {
        if (error) {
            res.send({ result: "fail" });
        } else {
            res.send({ result: "success" });
        }
        // console.log(results);

    });
});
app.get('/boardEdit/:boardNo', function (req, res) {
    let map = req.params;
    console.log(map);
    res.render("boardEdit", { map: map });
});
app.get('/boardEdit.dox', function (req, res) {
    let map = req.query;
    console.log(map);
    // 로그인되지 않은 사용자인지 확인
    if (!req.session.userId) {
        return res.status(401).send({ error: "Unauthorized: User not logged in" });
    }
    connection.query("UPDATE  TBL_BOARD SET TITLE = ?, CONTENTS = ? WHERE BOARDNO = ?", [map.title, map.contents, map.boardNo], function (error, results, fields) {
        if (error) {
            res.send({ result: "fail" });
        } else {
            res.send({ result: "success" });
        }
        // console.log(results);

    });
});
app.get('/boardDelete.dox', function (req, res) {
    let boardNo = req.query.boardNo;
    let userId = req.session.userId;
    console.log(boardNo);
    //connection.query('SELECT USERID FROM BOARDNO = ${boardNo}',function (error, results, fields))
    connection.query(`DELETE FROM TBL_BOARD WHERE BOARDNO = ${boardNo}`, function (error, results, fields) {
        if (error) {
            res.send({ result: "fail" });
        } else {
            res.send({ result: "success" });
        }
        // console.log(results);

    });
});

app.listen(4000);
