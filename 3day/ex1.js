const express = require('express');
var cors = require('cors');
const app = express();
const path = require('path');
app.use(cors());
//ejs 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'.'));   //'.'같은 경로 다른 폴더의 경우 /ejs

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

});
app.get('/profile/:id', function (req, res) {
    let map = req.params; // 클라이언트로부터 받은 파라미터를 req.params를 통해 가져옴
    console.log(map); // 파라미터 출력 (예: { id: '123' })
    connection.query(`SELECT * FROM TBL_USER WHERE USERID = '${map.id}'`, function (error, results, fields) {
        if (error) throw error;
        //   const name = results[0].USERNAME;
        if(results.length === 0){
            res.render('profile', { jsonData: {} });
        }else{
            res.render('profile', { jsonData: results[0] });
        }
        console.log(results[0]);
    });
    // res.render('profile', { jsonData: map }); // profile.ejs 템플릿을 렌더링하고 클라이언트로 파라미터를 전달
});

//select
app.get('/UserSearch', function (req, res) {
    var map = req.query;
    console.log(map);
    // MySQL 쿼리 실행
    connection.query(`SELECT * FROM TBL_USER WHERE USERID = '${map.id}'`, function (error, results, fields) {
        if (error) throw error;
        //   const name = results[0].USERNAME;
        console.log(results[0]);
        res.send(results);
    });
});

//insert
app.get('/insert', function (req, res) {
    var map = req.query;
    console.log(map);

    // 아이디 중복 체크를 위한 쿼리 실행
    connection.query("SELECT * FROM TBL_USER WHERE USERID = ?", [map.id], function (error, results, fields) {
        if (error) {
            console.error('에러!');
            res.send({ msg: '에러 발생!' });
            return;
        }
        console.log(results);
        if (results.length === 0) {
            connection.query("INSERT INTO TBL_USER (USERID, USERNAME, ADDR) VALUES (?, ?, ?)", [map.id, map.name, map.addr], function (error, results, fields) {
                if (error) {
                    console.error('Error inserting user into database: ' + error.stack);
                    res.send({msg : "에러!"});
                    return;
                }
                res.send({ msg: "저장되었습니다!" });
            });
        } else {
            res.send({ msg: "이미 있는 회원입니다." });
        }
    });
});

app.listen(3000);

// // 애플리케이션 종료 시 MySQL 연결 종료
// app.on('close', function () {
//     connection.end();
// });