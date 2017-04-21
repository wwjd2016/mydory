import React from 'react';

export default class MaskPop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shouldShow: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shouldShow: nextProps.shouldShow
    })
  }

  render() {
    return (
      <div className="maskPop" style={this.state.shouldShow ? {} : {display: "none"}}></div>
    )
  }
}