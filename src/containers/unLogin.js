import React from 'react';
import $ from 'jquery';
import UserPop from '../components/userPop';
export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      login: false,
      shouldShow: false
    }
    this.handleLoginPop = this.handleLoginPop.bind(this);
    this.handleRegisterPop = this.handleRegisterPop.bind(this);
  }

  renderUnLogin() {
    return (
      <div className="loginArea">
        <a onClick={this.handleLoginPop}>登录</a>
        <a onClick={this.handleRegisterPop}>注册</a>
      </div>
    )
  }
  handleLoginPop() {
    this.setState({
      shouldShow: true,
      login: true
    })
  }

  handleRegisterPop() {
    this.setState({
      shouldShow: true,
      login: false
    })
  }

  render() {
    return (
      <div className="loginArea">
        <a onClick={this.handleLoginPop}>登录</a>
        <a onClick={this.handleRegisterPop}>注册</a>
      </div>
    )
  }
}