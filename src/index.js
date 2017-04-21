import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  Link,
  hashHistory,
  IndexRoute
} from 'react-router';
import QuestionList from './containers/questionList';
import CreateNew from './containers/createNew';
import MaskPop from './components/mask';
import Login from './containers/login';
import Register from './containers/register';
import $ from 'jquery';
let rootElement = document.getElementById('root');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acticeNav: 1,
      showName: "",
      showPop: false,
      login: false,
      _id: ""
    }
    this.changeShowName = this.changeShowName.bind(this);
    this.getLoginState = this.getLoginState.bind(this);
    this.handleLoginState = this.handleLoginState.bind(this);
    this.handleLoginOut = this.handleLoginOut.bind(this);
  }

  componentDidMount() {
    this.getLoginState();
  }

  getLoginState() {
    let self = this;
    $.ajax({
      url: "/login/state",
      type: "POST",
      success: function(result){
        if (result.res_code === 1) {
          self.setState({login: true, _id: result.data._id})
        } else {
          self.setState({login: false, _id: ""})
        }
      }
    })
  }

  switchRouter(index) {
    this.setState({
      acticeNav: index
    })
  }

  handleLoginState(loginState, _id) {
    this.setState({login: loginState, _id: _id})
  }

  handleLoginOut() {
    let self = this;
    $.ajax({
      url: "/login/out",
      type: "POST",
      success: function(result){
        console.log(result)
        if (result.res_code === 1) {
          self.setState({login: false, _id: ""})
        }
      }
    })
  }
  changeShowName(showName) {
    this.setState({
      showName: showName,
      showPop: showName !== ""
    })
  }

  render() {
    return (
      <div>
        <ul className="header">
          <li className={this.state.acticeNav === 1 ? "active" : ""}>
            <Link to="/" onClick={this.switchRouter.bind(this, 1)}>问题列表</Link>
          </li>
          <li className={this.state.acticeNav === 2 ? "active" : ""}>
            <Link to="/create" onClick={this.switchRouter.bind(this, 2)}>新建问题</Link>
          </li>
          <li className={this.state.acticeNav === 3 ? "active" : ""}>
            <Link to="/create" onClick={this.switchRouter.bind(this, 3)}>一键删库</Link>
          </li>
          {this.state.login ?
            <div className="loginArea"><a href = "javascript:void(0)" onClick={this.handleLoginOut}>注销</a></div> :
            <div className="loginArea">
              <a href = "javascript:void(0)" onClick={this.changeShowName.bind(this, "login")}>登录</a>
              <a href = "javascript:void(0)" onClick={this.changeShowName.bind(this, "register")}>注册</a>
            </div>
           }
        </ul>
        <div className="content">
          {this.props.children && React.cloneElement(this.props.children, {userId: this.state._id,})}
        </div>
        <MaskPop shouldShow={this.state.showPop}/>
        <Login
          showName={this.state.showName}
          changeShowName={this.changeShowName}
          handleLoginState={this.handleLoginState}
        />
        <Register showName={this.state.showName} changeShowName={this.changeShowName} />
      </div>
    )
  }
}

ReactDOM.render(<Router history={ hashHistory }>
                  <Route path='/' component={App}>
                    <IndexRoute component={QuestionList}/>
                    <Route path="/create" component={CreateNew}/>
                  </Route>
                </Router>, rootElement)