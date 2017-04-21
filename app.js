var Express = require('express');
var app = Express();
var path = require('path');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
//mongoose 服务
mongoose.connect('mongodb://localhost/dory');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
  console.log("数据库连接成功")
});
// 静态文件目录
var staticDir = path.join(__dirname, 'public');
app.use(Express.static(staticDir));

//session
app.use(cookieParser());
app.use(cookieSession({
  secret: "dory",
  cookie: {
    maxAge: 14*24 * 60 * 60 * 1000 // 24 hours
  }
}));

//添加bodyParse中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//router
require('./controller/index.js')(app);
require('./controller/admin.js')(app);

//view
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

//error middleware
app.use(function(err,req,res,next){
  res.status(err.status || 500);
  res.send({ error: err.message });
})

//4o4 middleware
app.use(function(req, res){
  res.status(404);
  res.send({ error: "sorry, can't find that" });
});

//port
app.listen(3000,function(){
  console.log('server running at port 3000.')
});
