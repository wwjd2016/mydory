import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';

export default class NavLink extends React.Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  render() {
    return (
      <Link to={this.props.url} activeClassName="active">{this.props.title}</Link>
    )
  }
}