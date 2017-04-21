var Question = require("../module/question");

//返回全部的问题

exports.getAllQuestions = function (callback) {
  Question.find({})
          .sort({mock: 1})
          .exec(function(err, questions){
            if (err) {console.log(err)}
            return callback(err, questions)
          })
}
//通过id查找问题
