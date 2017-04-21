import React from 'react';
import $ from 'jquery';
import Pop from '../components/pop';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.handleCancle = this.handleCancle.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister() {
    let userName = this.refs.userName.value;
    let passWord = this.refs.passWord.value;
    let self = this;
    $.ajax({
      url: "/register",
      type: "POST",
      data: {
        userName: userName,
        passWord: passWord
      },
      success: function(result){
        if (result.res_code === 1) {
          alert("注册成功!请登录...");
          self.props.changeShowName("login");
        } else {
          alert("注册失败!");
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
          shouldShow={this.props.showName === "register"}
          popTitle={this.props.showName==="register"?"注册":""}
          popSure={this.props.showName==="register"?"注册":""}
          handleSure={this.handleRegister}
          handleCancle={this.handleCancle}
        >
          <div>
            <div className="formIterm"><label>用户名：</label><input ref="userName" type="text"/></div>
            <div className="formIterm"><label>密码：</label><input ref="passWord" type="password"/></div>
            {/*<div className="formIterm"><label>确认密码：</label><input ref="rePassWord" type="password"/></div>*/}
          </div>
        </Pop>
    )
  }
}