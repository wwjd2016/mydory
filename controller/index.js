var Question = require("../module/question");
var QuestionControl = require("./question");
var Common = require("./common");
module.exports = function(app){
  app.get('/',function(req,res,next){
    res.render('index', {})
  })
  //获取所有问题列表
  app.get('/questions', function(req, res, next) {
    QuestionControl.getAllQuestions(function(err, questions){
      if (err) {
        return res.json({
          res_code: 0,
          data:{
            questions: []
          }
        })
      }
      res.json({
        res_code: 1,
        data: {
          questions: questions
        }
      })
    })
  })
  app.post("/quertion/create", function(req, res, next) {
    if (!req.session.login) {
      return res.json({
        res_code: 0,
        msg: "请先登录"
      })
    }
    var quertionObj = req.body;
    var QuestionEntity = new Question({
      title: quertionObj.question,
      authorId: quertionObj.userId,
    })
    QuestionEntity.save(function(err, question){
      if (err) {
        return res.json({
          res_code: 0,
          msg: "发布失败"
        })
      }
      res.json({
        res_code: 1,
        msg: "发布问题成功"
      })
    })
  })
}
