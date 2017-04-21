exports.loginRequire = function (req,res,callback) {
  if (!req.session.login) {
    return callback();
  }
}