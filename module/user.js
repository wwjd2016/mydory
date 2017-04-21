var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
var UserSchema = mongoose.Schema({
  userName: String,
  passWord: String,
  headImage: String,
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

UserSchema.pre("save",function(next){
  var self = this;
  if (this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now();
    bcrypt.genSalt(SALT_WORK_FACTOR,function (err,salt) {//密码加盐
      if (err) {
        return next(err);
      }
      bcrypt.hash(self.passWord,salt,function (err,hash) {//hash值,用bcrypt-nodejs第三个参数必须传入
          if (err) return next(err);
          self.passWord = hash;
          next();
      });
    });
  } else {
      this.meta.updateAt = Date.now();
      next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;