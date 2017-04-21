import React from 'react';

// <Pop
//   showName={String}
//   popTitle={[String]}
//   popSure={[String]}
//   shouldShow={boolean}
//   handleSure={[function()[]}
//   handleCancle={[function()]}
// >

export default class Pop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popTitle: this.props.popTitle,
      shouldShow: this.props.shouldShow,
      popSure: this.props.popSure
    }
    this.handleSure = this.handleSure.bind(this);
    this.handleCancle = this.handleCancle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      popTitle: nextProps.popTitle,
      shouldShow: nextProps.shouldShow,
      popSure: nextProps.popSure
    })
  }

  handleSure() {
    if (this.props.handleSure && typeof(this.props.handleSure) === "function") {
      this.props.handleSure();
    }
    this.setState({
      shouldShow: false
    })
  }

  handleCancle() {
    if (this.props.handleCancle && typeof(this.props.handleCancle) === "function") {
      this.props.handleCancle();
    }
    this.setState({
      shouldShow: false
    })
  }

  render() {
    return (
      <div
        className="popWrap"
        style={this.state.shouldShow ? {} : {display: "none"}}
      >
        <div className="popTitle">
          {this.state.popTitle || "提示"}
          <a href = "javascript:void(0)" onClick={this.handleCancle} className="closeBtn">关闭</a>
        </div>
        <div className="popContent">
        {this.props.children}
        </div>
        <div className="popFooter">
          <a href = "javascript:void(0)"className="popSure" onClick={this.handleSure}>{this.state.popSure || "确定"}</a>
          <a href = "javascript:void(0)"className="popCancle" onClick={this.handleCancle}>取消</a>
        </div>
      </div>
    )
  }
}