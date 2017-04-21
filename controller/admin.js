var User = require("../module/user");
var bcrypt = require("bcrypt");

module.exports = function(app) {
  //注册
  app.post("/register", function(req, res, next) {
    var registerObj = req.body;
    var userEntity = new User({
      userName: registerObj.userName,
      passWord: registerObj.passWord
    })
    userEntity.save(function(err){
      if (err) {
        res.json({
          res_code: 0,
          msg: "注册失败"
        })
      } else {
        res.json({
          res_code: 1,
          msg: "注册成功"
        })
      }
    })
  })
  //登录
  app.post("/login", function(req, res, next) {
    var loginObj = req.body;
    User.findOne({userName: loginObj.userName}, function(err, user) {
      if (err) {
        return res.json({
          res_code: 0,
          msg: "登录失败"
        })
      }
      if (!user) {
        return res.json({
          res_code: 0,
          msg: "用户名不存在"
        })
      }
      bcrypt.compare(loginObj.passWord, user.passWord, function(error, result) {
        if (err) {
          return res.json({
            res_code: 0,
            msg: "登录失败"
          })
        }
        if (!result) {
          return res.json({
            res_code: 0,
            msg: "密码错误"
          })
        }
        req.session.login = user._id;
        res.json({
            res_code: 1,
            msg: "登录成功",
            data:{
              _id: user._id
            }
          })
      })
    })
  })
  //验证登录状态
  app.post("/login/state", function(req, res, next) {
    if (!req.session.login) {
      return res.json({
        res_code: 0,
        msg: "用户未登录"
      })
    }
    res.json({
      res_code: 1,
      msg: "用户已登录",
      data: {
        _id: req.session.login
      }
    })
  })
  //用户注销
  app.post("/login/out", function(req, res, next) {
    if (!req.session.login) {
      return res.json({
        res_code: 1,
        msg: "已注销"
      })
    }
    req.session = null;
    res.json({
      res_code: 1,
      msg: "已注销"
    })
  })
}



