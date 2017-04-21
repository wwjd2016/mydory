import React from 'react';
import $ from 'jquery';
import Pop from '../components/pop';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleCancle = this.handleCancle.bind(this);
  }

  handleLogin() {
    let userName = this.refs.userName.value;
    let passWord = this.refs.passWord.value;
    let self = this;
    $.ajax({
      url: "/login",
      type: "POST",
      data: {
        userName: userName,
        passWord: passWord
      },
      success: function(result){
        if (result.res_code === 1) {
          alert("登录成功!");
          self.props.changeShowName("");
          self.props.handleLoginState(true, result.data._id);
        } else {
          alert("登录失败!");
          self.props.handleLoginState(false, "");
        }
      }
    })
  }

  handleCancle() {
    this.props.changeShowName("");
  }

  render() {
    return (
        <Pop
          shouldShow={this.props.showName === "login"}
          popTitle={this.props.showName==="login"?"登录":""}
          popSure={this.props.showName==="login"?"登录":""}
          handleSure={this.handleLogin}
          handleCancle={this.handleCancle}
        >
          <div>
            <div className="formIterm"><label>用户名：</label><input ref="userName" type="text"/></div>
            <div className="formIterm"><label>密码：</label><input ref="passWord" type="passWord"/></div>
          </div>
        </Pop>
    )
  }
}