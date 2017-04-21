var mongoose = require("mongoose");

var QuestionSchema = mongoose.Schema({
  title: String,
  authorId: String,
  mock: {
    type: Number,
    default: 0
  },
  meta: {
    createAt:{//创建时间
      type:Date,
      default:Date.now()
    },
    updateAt:{//最后评论时间
      type:Date,
      default:Date.now()
    }
  }
})

QuestionSchema.pre("save",function(next){
  if (this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  next();
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;