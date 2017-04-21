import React from 'react';

export default class UserPop extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      showName: this.props.showName
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showName: nextProps.showName
    })
  }

  renderReinput() {
    return this.state.showName === "register" ?
    <div><div><div>确认密码：</div><input type="password" /></div>
    <div><button>注册</button></div></div>
    : <div><button>登录</button></div>
  }

  render() {
    return (
      <div className="userPop">
          <div>{this.state.showName}</div>
          <div><div>用户名：</div><input type="text" /></div>
          <div><div>密码：</div><input type="password" /></div>
          {this.renderReinput()}
      </div>
    )
  }
}